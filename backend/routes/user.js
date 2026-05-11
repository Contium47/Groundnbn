const express = require('express');
const router = express.Router();

const { auth, isAdmin } = require('../middleware/auth');
const userController = require('../controllers/userController');

router.get('/', auth, isAdmin, userController.getAllUsers);
router.delete('/:id', auth, isAdmin, userController.deleteUser);

module.exports = router;