const express = require('express');
const pool = require('./config/db');
const indexRoutes = require('./routes/indexRoutes');
const path = require('path');
const multer = require('multer');
// const { compareSync } = require('bcrypt');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next()
});

app.use(express.json());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', indexRoutes);

app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({error: 'Помилка завантаження файлу', details: err.message})
  }
  res.status(500).json({error: 'Помилка сервера', details: err.message});
});



const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await pool.connect();
    app.listen(PORT);
    console.log(`Сервер запущено на порту ${PORT}`)
  } catch (err) {
    console.log('Помилка запуску сервера: ', err.message);
    process.exit(1);
  }
};

startServer();