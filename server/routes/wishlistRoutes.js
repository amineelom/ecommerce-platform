const express = require('express');
const router = express.Router();
const wishlistController = require('../controllers/wishlistController');
const { auth } = require('../middleware/auth');

router.get('/', auth, wishlistController.getWishlist);
router.post('/add', auth, wishlistController.addToWishlist);
router.delete('/:productId', auth, wishlistController.removeFromWishlist);
router.delete('/', auth, wishlistController.clearWishlist);
router.get('/check/:productId', auth, wishlistController.isInWishlist);

module.exports = router;
