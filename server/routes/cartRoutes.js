const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { auth } = require('../middleware/auth');

router.get('/', auth, cartController.getCart);
router.post('/add', auth, cartController.addToCart);
router.put('/update', auth, cartController.updateCartItem);
router.delete('/:productId', auth, cartController.removeFromCart);
router.delete('/', auth, cartController.clearCart);

module.exports = router;
