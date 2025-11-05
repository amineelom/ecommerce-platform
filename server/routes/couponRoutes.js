const express = require('express');
const router = express.Router();
const couponController = require('../controllers/couponController');
const { auth } = require('../middleware/auth');

router.post('/validate', auth, couponController.validateCoupon);
router.post('/apply', auth, couponController.applyCoupon);
router.get('/', couponController.getAllCoupons);
router.post('/', auth, couponController.createCoupon);
router.put('/:couponId', auth, couponController.updateCoupon);
router.delete('/:couponId', auth, couponController.deleteCoupon);

module.exports = router;
