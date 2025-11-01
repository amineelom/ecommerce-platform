const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const { auth, adminAuth } = require('../middleware/auth');

// User routes
router.post('/', auth, orderController.createOrder);
router.get('/', auth, orderController.getOrders);
router.get('/:id', auth, orderController.getOrderById);
router.post('/:id/payment', auth, orderController.processPayment);

// Admin routes
router.get('/admin/all', adminAuth, orderController.getAllOrders);
router.put('/:id/status', adminAuth, orderController.updateOrderStatus);

module.exports = router;
