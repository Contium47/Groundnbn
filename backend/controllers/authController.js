const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../config/db');

const JWT_SECRET = process.env.JWT_SECRET || 'my_own_secret_key';
const JWT_EXPIRES_IN = '1h';

exports.signup = async (req, res) => {
  try {
    const { first_name, last_name, email, password, phone_number } = req.body;

    if (!first_name || !email || !password || !phone_number) {
      return res.status(400).json({ error: "Відсутні обов'язкові поля" });
    }

    const existingUserQuery = 'select * from "user" where email = $1';
    const existingUser = await pool.query(existingUserQuery, [email]);

    if (existingUser.rows.length > 0) {
      return res.status(400).json({ error: "A user with this email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertQuery = `
      insert into "user" (first_name, last_name, email, password_hash, phone_number)
      values ($1, $2, $3, $4, $5)
      returning id, first_name, last_name, email, phone_number, role;
    `;

    const values = [first_name, last_name || null, email, hashedPassword, phone_number];
    const result = await pool.query(insertQuery, values);
    const user = result.rows[0];

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(201).json({
      message: 'Користувач успішно зареєстрований',
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: 'Помилка сервера', details: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const userQuery = 'select * from "user" where email = $1';
    const result = await pool.query(userQuery, [email]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        role: user.role,
      },
    });
  } catch (err) {
    res.status(500).json({ error: "Server error", details: err.message });
  }
};