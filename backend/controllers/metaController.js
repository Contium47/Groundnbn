const pool = require('../config/db');

exports.getStructures = async (req, res) => {
  try {
    const result = await pool.query(`
      select id, name, icon_svg
      from structure_type
      order by name;
    `);

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера' });
  }
};