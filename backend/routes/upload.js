const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');

router.post('/', upload.array('images', 10), (req, res) => {
  const images = req.files.map(file => `/uploads/${file.filename}`);

  res.json({ images });
});

module.exports = router;