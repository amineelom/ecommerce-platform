const express = require('express');
const router = express.Router();
const analyticsController = require('../controllers/analyticsController');
const { auth } = require('../middleware/auth');

router.get('/dashboard', auth, analyticsController.getDashboardStats);
router.get('/sales', auth, analyticsController.getSalesAnalytics);
router.get('/products', auth, analyticsController.getProductAnalytics);
router.get('/customers', auth, analyticsController.getCustomerAnalytics);
router.post('/page-view', analyticsController.recordPageView);

module.exports = router;
