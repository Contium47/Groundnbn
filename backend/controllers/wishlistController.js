const pool = require("../config/db");

exports.addToWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;
    const { listing_id } = req.body;

    if (!listing_id) {
      return res.status(400).json({ error: "listing_id required" });
    }

    const query = `
      insert into wishlist (userid, listingid)
      values ($1, $2)
      on conflict (userid, listingid) do nothing
      returning *;
    `;

    const result = await pool.query(query, [userId, +listing_id]);

    res.status(201).json({
      message: result.rows.length
        ? "Added to wishlist"
        : "Already in wishlist",
      data: result.rows[0] || null,
    });
  } catch (err) {
    console.error("Add wishlist error:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.removeFromWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;
    const listingId = +req.params.listingId;

    const query = `
      delete from wishlist
      where userid = $1 and listingid = $2
      returning *;
    `;

    const result = await pool.query(query, [userId, listingId]);

    if (!result.rows.length) {
      return res.status(404).json({ error: "Not found in wishlist" });
    }

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    console.error("Remove wishlist error:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getMyWishlist = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;

    const query = `
      select 
        l.id,
        l.title,
        l.weekday_price,
        l.weekend_price,
        l.city_name,
        l.country_name,

        coalesce(
          array_agg(li.url order by li.id) 
            filter (where li.url is not null),
          '{}'
        ) as images

      from wishlist w
      join listing l on w.listingid = l.id
      left join listing_image li on l.id = li.listingid

      where w.userid = $1

      group by 
        l.id,
        l.title,
        l.weekday_price,
        l.weekend_price,
        l.city_name,
        l.country_name

      order by l.id desc;
    `;

    const result = await pool.query(query, [userId]);

    res.json(result.rows);
  } catch (err) {
    console.error("Wishlist error:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getMyWishlistIds = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;

    const query = `
      select listingid
      from wishlist
      where userid = $1;
    `;

    const result = await pool.query(query, [userId]);

    const ids = result.rows.map((row) => row.listingid);

    res.json(ids);
  } catch (err) {
    console.error("Wishlist IDs error:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};