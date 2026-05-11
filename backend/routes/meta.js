const express = require('express');
const router = express.Router();
const metaController = require('../controllers/metaController');

router.get('/structures', metaController.getStructures);

module.exports = router;