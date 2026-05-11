const express = require('express');
const router = express.Router();

const listingRoutes = require('./listings');
const bookingRoutes = require('./bookings');
const authRoutes = require('./auth');
const metaRoutes = require('./meta');
const uploadRoutes = require('./upload');
const wishlistRoutes = require('./wishlist');
const reviewRoutes = require('./reviews');
const userRoutes = require('./user');


router.use('/listings', listingRoutes);
router.use('/bookings', bookingRoutes);
router.use('/auth', authRoutes);
router.use('/meta', metaRoutes);
router.use('/upload', uploadRoutes);
router.use('/wishlist', wishlistRoutes);
router.use('/reviews', reviewRoutes);
router.use('/users', userRoutes);

module.exports = router;