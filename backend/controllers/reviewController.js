const pool = require("../config/db");

exports.getReviewsByListing = async (req, res) => {
  try {
    const listingId = parseInt(req.params.listingId);

    if (isNaN(listingId)) {
      return res.status(400).json({ error: "ID має бути числом" });
    }

    const result = await pool.query(
      `
      SELECT 
        r.id,
        r.comment,
        r.rating,
        r.created_at,
        u.first_name,
        u.last_name
      FROM review r
      JOIN "user" u ON r.user_id = u.id
      WHERE r.listing_id = $1
      ORDER BY r.created_at DESC
      `,
      [listingId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("GET REVIEWS ERROR:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.createReview = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;
    const { listingId, comment, rating } = req.body;

    if (!listingId || rating === undefined) {
      return res.status(400).json({ error: "Немає обов'язкових полів" });
    }

    const insertResult = await pool.query(
      `
      INSERT INTO review (user_id, listing_id, comment, rating)
      VALUES ($1, $2, $3, $4)
      RETURNING id
      `,
      [userId, listingId, comment || null, rating]
    );

    const reviewId = insertResult.rows[0].id;

    const result = await pool.query(
      `
      SELECT 
        r.id,
        r.comment,
        r.rating,
        r.created_at,
        u.first_name,
        u.last_name
      FROM review r
      JOIN "user" u ON r.user_id = u.id
      WHERE r.id = $1
      `,
      [reviewId]
    );

    res.status(201).json(result.rows[0]);

  } catch (err) {
    console.error("CREATE REVIEW ERROR:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const reviewId = parseInt(req.params.id);

    if (isNaN(reviewId)) {
      return res.status(400).json({ error: "ID має бути числом" });
    }

    if (!req.user) {
      return res.status(401).json({ error: "Не авторизований" });
    }

    const userId = req.user.userId;

    const check = await pool.query(
      `SELECT user_id FROM review WHERE id = $1`,
      [reviewId]
    );

    if (!check.rows.length) {
      return res.status(404).json({ error: "Відгук не знайдено" });
    }

    if (check.rows[0].user_id !== userId) {
      return res.status(403).json({ error: "Немає доступу" });
    }

    await pool.query(`DELETE FROM review WHERE id = $1`, [reviewId]);

    res.json({ message: "Відгук видалено" });
  } catch (err) {
    console.error("DELETE REVIEW ERROR:", err);
    res.status(500).json({ error: "Помилка сервера" });
  }
};