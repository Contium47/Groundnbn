const pool = require('../config/db');

exports.deleteUser = async (req, res) => {
  const client = await pool.connect();

  try {
    const { id } = req.params;

    await client.query('BEGIN');

    await client.query('delete from booking where userid = $1', [id]);
    await client.query('delete from wishlist where userid = $1', [id]);
    await client.query('delete from listing where userid = $1', [id]);

    await client.query('delete from review where user_id = $1', [id]);

    await client.query('delete from "user" where id = $1', [id]);

    await client.query('COMMIT');

    res.json({ message: 'Користувача та всі його дані видалено' });

  } catch (err) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const result = await pool.query(`
      select 
        id,
        first_name,
        last_name,
        email,
        phone_number,
        role
      from "user"
      order by id desc
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};