const pool = require("../config/db");

exports.createBooking = async (req, res) => {
  try {
    const { check_in, check_out, listing_id } = req.body;

    if (!req.user) {
      return res.status(401).json({ error: "Not authorized" });
    }

    const userid = req.user.userId;

    if (!check_in || !check_out || !listing_id) {
      return res.status(400).json({ error: "Відсутні обов'язкові поля" });
    }

    const listingid = parseInt(listing_id);
    if (isNaN(listingid)) {
      return res.status(400).json({ error: "Некоректний listing_id" });
    }

    const listingResult = await pool.query(
      `SELECT weekday_price, weekend_price FROM listing WHERE id = $1`,
      [listingid]
    );

    if (!listingResult.rows.length) {
      return res.status(404).json({ error: "Оголошення не знайдено" });
    }

    const weekdayPrice = parseFloat(listingResult.rows[0].weekday_price);
    const weekendPrice = parseFloat(listingResult.rows[0].weekend_price);

    const checkInDate = new Date(check_in);
    const checkOutDate = new Date(check_out);

    if (checkInDate >= checkOutDate) {
      return res.status(400).json({
        error: "Check-out must be later than check-in.",
      });
    }

    const overlap = await pool.query(
      `
      select * from booking
      where listingid = $1
      and status = 'confirmed'
      and (
        ($2 between check_in and check_out)
        or ($3 between check_in and check_out)
        or (check_in <= $2 and check_out >= $3)
      )
    `,
      [listingid, checkInDate, checkOutDate]
    );

    if (overlap.rows.length) {
      return res.status(400).json({
        error: "The accommodation is already booked for these dates.",
      });
    }

    let total_price = 0;
    const current = new Date(checkInDate);

    while (current < checkOutDate) {
      const day = current.getDay();
      total_price += (day === 0 || day === 6) ? weekendPrice : weekdayPrice;
      current.setDate(current.getDate() + 1);
    }

    const insert = await pool.query(
      `
      INSERT INTO booking (check_in, check_out, total_price, listingid, userid, status)
      VALUES ($1, $2, $3, $4, $5, 'pending')
      RETURNING *;
      `,
      [checkInDate, checkOutDate, total_price, listingid, userid]
    );

    res.status(201).json(insert.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.deleteBooking = async (req, res) => {
  try {
    const userid = req.user.userId;
    const id = parseInt(req.params.id);

    const check = await pool.query(
      `SELECT * FROM booking WHERE id = $1 AND userid = $2`,
      [id, userid]
    );

    if (!check.rows.length) {
      return res.status(404).json({ error: "Бронювання не знайдено" });
    }

    await pool.query(`DELETE FROM booking WHERE id = $1`, [id]);

    res.json({ message: "Бронювання видалено" });

  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getMyBookings = async (req, res) => {
  try {
    const userid = req.user.userId;

    const result = await pool.query(
      `
      SELECT 
        b.id,
        b.check_in,
        b.check_out,
        b.total_price,
        b.status,

        json_build_object(
          'id', l.id,
          'title', l.title,
          'city_name', l.city_name,
          'guests', l.guests,
          'bedrooms', l.bedrooms,
          'beds', l.beds,
          'bathrooms', l.bathrooms,
          'images', COALESCE(
            ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
            '{}'
          )
        ) as listing

      FROM booking b
      LEFT JOIN listing l ON b.listingid = l.id
      LEFT JOIN listing_image li ON l.id = li.listingid

      WHERE b.userid = $1

      GROUP BY b.id, l.id
      ORDER BY b.created_at DESC
      `,
      [userid]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.confirmBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      `
      SELECT b.*, l.userid as owner_id
      FROM booking b
      JOIN listing l ON b.listingid = l.id
      WHERE b.id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Не знайдено" });
    }

    const booking = result.rows[0];

    if (booking.owner_id !== req.user.userId) {
      return res.status(403).json({ error: "Немає доступу" });
    }

    const overlap = await pool.query(
      `
      SELECT * FROM booking
      WHERE listingid = $1
      AND status = 'confirmed'
      AND id != $2
      AND (
        ($3 BETWEEN check_in AND check_out)
        OR ($4 BETWEEN check_in AND check_out)
        OR (check_in <= $3 AND check_out >= $4)
      )
      `,
      [booking.listingid, id, booking.check_in, booking.check_out]
    );

    if (overlap.rows.length) {
      return res.status(400).json({ error: "Дати вже зайняті" });
    }

    const updated = await pool.query(
      `UPDATE booking SET status = 'confirmed' WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json(updated.rows[0]);

  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.rejectBooking = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      `
      SELECT b.*, l.userid as owner_id
      FROM booking b
      JOIN listing l ON b.listingid = l.id
      WHERE b.id = $1
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Не знайдено" });
    }

    const booking = result.rows[0];

    if (booking.owner_id !== req.user.userId) {
      return res.status(403).json({ error: "Немає доступу" });
    }

    const updated = await pool.query(
      `UPDATE booking SET status = 'rejected' WHERE id = $1 RETURNING *`,
      [id]
    );

    res.json(updated.rows[0]);

  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getOwnerBookings = async (req, res) => {
  try {
    const userid = req.user.userId;

    const result = await pool.query(
      `
      SELECT 
        b.id,
        b.check_in,
        b.check_out,
        b.total_price,
        b.status,

        json_build_object(
          'id', l.id,
          'title', l.title,
          'city_name', l.city_name,
          'guests', l.guests,
          'bedrooms', l.bedrooms,
          'beds', l.beds,
          'bathrooms', l.bathrooms,
          'images', COALESCE(
            ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
            '{}'
          )
        ) as listing

      FROM booking b
      JOIN listing l ON b.listingid = l.id
      LEFT JOIN listing_image li ON l.id = li.listingid

      WHERE l.userid = $1

      GROUP BY b.id, l.id
      ORDER BY b.created_at DESC
      `,
      [userid]
    );

    res.json(result.rows);

  } catch (err) {
    res.status(500).json({ error: "Помилка сервера" });
  }
};