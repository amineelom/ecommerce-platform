const express = require('express');
const router = express.Router();
const inventoryController = require('../controllers/inventoryController');
const { auth } = require('../middleware/auth');

router.get('/', auth, inventoryController.getInventory);
router.get('/product/:productId', auth, inventoryController.getProductInventory);
router.put('/product/:productId', auth, inventoryController.updateInventory);
router.get('/low-stock', auth, inventoryController.getLowStockProducts);
router.get('/history/:productId', auth, inventoryController.getInventoryHistory);
router.post('/reserve/:productId', auth, inventoryController.reserveStock);
router.post('/release/:productId', auth, inventoryController.releaseReservedStock);

module.exports = router;
