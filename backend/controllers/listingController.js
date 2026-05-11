const pool = require("../config/db");

const formatListing = (listing) => {
  const today = new Date().getDay();
  const isWeekend = today === 0 || today === 6;

  const current_price = isWeekend
    ? +listing.weekend_price
    : +listing.weekday_price;

  return {
    ...listing,
    images: listing.images || [],
    owner_email: listing.owner_email || null,
    owner_phone: listing.owner_phone || null,
    avg_rating: +listing.avg_rating || 0,
    reviews_count: +listing.reviews_count || 0,
    current_price,
  };
};

exports.getListings = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        l.*,
        u.first_name,
        u.last_name,
        u.email AS owner_email,
        u.phone_number AS owner_phone,

        COALESCE(r.avg_rating, 0) AS avg_rating,
        COALESCE(r.reviews_count, 0) AS reviews_count,

        COALESCE(
          ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
          '{}'
        ) AS images

      FROM listing l
      LEFT JOIN "user" u ON l.userid = u.id
      LEFT JOIN listing_image li ON l.id = li.listingid

      LEFT JOIN (
        SELECT listing_id, AVG(rating) AS avg_rating, COUNT(*) AS reviews_count
        FROM review
        GROUP BY listing_id
      ) r ON l.id = r.listing_id

      GROUP BY l.id, u.id, r.avg_rating, r.reviews_count
      ORDER BY l.id DESC
    `);

    res.json(result.rows.map(formatListing));
  } catch (err) {
    console.error("getListings:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getListingById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const result = await pool.query(
      `
      SELECT 
        l.*,
        u.first_name,
        u.last_name,
        u.email AS owner_email,
        u.phone_number AS owner_phone,

        COALESCE(r.avg_rating, 0) AS avg_rating,
        COALESCE(r.reviews_count, 0) AS reviews_count,

        COALESCE(
          ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
          '{}'
        ) AS images

      FROM listing l
      LEFT JOIN "user" u ON l.userid = u.id
      LEFT JOIN listing_image li ON l.id = li.listingid

      LEFT JOIN (
        SELECT listing_id, AVG(rating) AS avg_rating, COUNT(*) AS reviews_count
        FROM review
        GROUP BY listing_id
      ) r ON l.id = r.listing_id

      WHERE l.id = $1

      GROUP BY l.id, u.id, r.avg_rating, r.reviews_count
      `,
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: "Оголошення не знайдено" });
    }

    res.json(formatListing(result.rows[0]));
  } catch (err) {
    console.error("getListingById:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getMyListings = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        l.*,

        COALESCE(r.avg_rating, 0) AS avg_rating,
        COALESCE(r.reviews_count, 0) AS reviews_count,

        COALESCE(
          ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
          '{}'
        ) AS images

      FROM listing l
      LEFT JOIN listing_image li ON l.id = li.listingid

      LEFT JOIN (
        SELECT listing_id, AVG(rating) AS avg_rating, COUNT(*) AS reviews_count
        FROM review
        GROUP BY listing_id
      ) r ON l.id = r.listing_id

      WHERE l.userid = $1

      GROUP BY l.id, r.avg_rating, r.reviews_count
      ORDER BY l.id DESC
      `,
      [req.user.userId]
    );

    res.json(result.rows.map(formatListing));
  } catch (err) {
    console.error("getMyListings:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.getListingsByCountry = async (req, res) => {
  try {
    const result = await pool.query(
      `
      SELECT 
        l.*,
        u.first_name,
        u.last_name,
        u.email AS owner_email,
        u.phone_number AS owner_phone,

        COALESCE(r.avg_rating, 0) AS avg_rating,
        COALESCE(r.reviews_count, 0) AS reviews_count,

        COALESCE(
          ARRAY_AGG(li.url) FILTER (WHERE li.url IS NOT NULL),
          '{}'
        ) AS images

      FROM listing l
      LEFT JOIN "user" u ON l.userid = u.id
      LEFT JOIN listing_image li ON l.id = li.listingid

      LEFT JOIN (
        SELECT listing_id, AVG(rating) AS avg_rating, COUNT(*) AS reviews_count
        FROM review
        GROUP BY listing_id
      ) r ON l.id = r.listing_id

      WHERE LOWER(l.iso2) = LOWER($1)

      GROUP BY l.id, u.id, r.avg_rating, r.reviews_count
      ORDER BY l.id DESC
      `,
      [req.params.iso2]
    );

    res.json(result.rows.map(formatListing));
  } catch (err) {
    console.error("getListingsByCountry:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.createListing = async (req, res) => {
  try {
    const {
      title,
      description,
      country_name,
      iso2,
      city_name,
      street,
      guests,
      bedrooms,
      beds,
      bathrooms,
      structure,
      privacy_type,
      weekday_price,
      weekend_price,
      images,
    } = req.body;

    const userId = req.user.userId;

    const result = await pool.query(
      `
      INSERT INTO listing (
        title, description, userid, country_name, iso2,
        city_name, street, guests, bedrooms, beds, bathrooms,
        structure, privacy_type, weekday_price, weekend_price
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15)
      RETURNING *
      `,
      [
        title,
        description,
        userId,
        country_name,
        iso2,
        city_name,
        street,
        guests,
        bedrooms,
        beds,
        bathrooms,
        structure,
        privacy_type,
        weekday_price,
        weekend_price,
      ]
    );

    const listing = result.rows[0];

    if (images) {
      const parsed = JSON.parse(images);

      for (const img of parsed) {
        await pool.query(
          `INSERT INTO listing_image (url, listingid) VALUES ($1,$2)`,
          [img, listing.id]
        );
      }
    }

    res.status(201).json(listing);
  } catch (err) {
    console.error("createListing:", err.message);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.deleteListing = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      'select * from listing where id = $1',
      [id]
    );

    if (!result.rows.length) {
      return res.status(404).json({ error: 'Not found' });
    }

    const listing = result.rows[0];

    if (
      req.user.role !== 'admin' &&
      listing.userid !== req.user.userId
    ) {
      return res.status(403).json({ error: 'Немає доступу' });
    }

    await pool.query('delete from listing where id = $1', [id]);

    res.json({ message: 'Оголошення видалено' });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};