const express = require('express');
const router = express.Router();

const wishlistController = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

router.post('/', auth, wishlistController.addToWishlist);

router.delete('/:listingId', auth, wishlistController.removeFromWishlist);

router.get('/my', auth, wishlistController.getMyWishlist);

router.get('/ids', auth, wishlistController.getMyWishlistIds);

module.exports = router;