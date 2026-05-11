const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { auth } = require('../middleware/auth');

router.post('/', auth, bookingController.createBooking);

router.get('/my', auth, bookingController.getMyBookings);

router.delete('/:id', auth, bookingController.deleteBooking);

router.get('/owner', auth, bookingController.getOwnerBookings);

router.patch('/:id/confirm', auth, bookingController.confirmBooking);

router.patch('/:id/reject', auth, bookingController.rejectBooking);

module.exports = router;