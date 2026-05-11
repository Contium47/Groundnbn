const express = require('express');
const router = express.Router();
const listingController = require('../controllers/listingController');
const upload = require('../middleware/upload');
const { auth, isAdmin } = require('../middleware/auth');

router.get('/my', auth, listingController.getMyListings);
router.get('/', listingController.getListings);
router.get('/country/:iso2', listingController.getListingsByCountry);
router.get('/:id', listingController.getListingById);
router.delete('/:id', auth, listingController.deleteListing);

router.post(
  '/',
  auth,
  (req, res, next) => {
    if (
      req.headers['content-type'] &&
      req.headers['content-type'].includes('multipart/form-data')
    ) {
      upload.array('images', 10)(req, res, (err) => {
        if (err) {
          return res.status(400).json({
            error: 'Помилка завантаження файлу',
            details: err.message,
          });
        }
        next();
      });
    } else {
      next();
    }
  },
  listingController.createListing
);

module.exports = router;