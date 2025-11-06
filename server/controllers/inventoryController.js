const Inventory = require('../models/Inventory');
const Product = require('../models/Product');

exports.getInventory = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const inventory = await Inventory.find()
      .populate('product')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Inventory.countDocuments();

    res.json({
      success: true,
      inventory,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductInventory = async (req, res) => {
  try {
    const { productId } = req.params;

    const inventory = await Inventory.findOne({ product: productId }).populate('product');

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    res.json({
      success: true,
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateInventory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity, type, reason } = req.body;

    let inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      // Create new inventory record if it doesn't exist
      inventory = await Inventory.create({
        product: productId,
        quantity: type === 'purchase' ? quantity : 0,
      });
    }

    // Update quantity based on type
    if (type === 'purchase') {
      inventory.quantity += quantity;
      inventory.lastRestocked = new Date();
    } else if (type === 'sale') {
      if (inventory.quantity < quantity) {
        return res.status(400).json({ message: 'Insufficient stock' });
      }
      inventory.quantity -= quantity;
    } else if (type === 'return') {
      inventory.quantity += quantity;
    } else if (type === 'adjustment' || type === 'damage') {
      inventory.quantity -= quantity;
    }

    // Record in history
    inventory.history.push({
      type,
      quantity,
      reason,
      reference: req.body.reference || '',
    });

    await inventory.save();

    // Update product stock
    await Product.findByIdAndUpdate(productId, { stock: inventory.quantity });

    res.json({
      success: true,
      message: 'Inventory updated successfully',
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getLowStockProducts = async (req, res) => {
  try {
    const inventory = await Inventory.find({
      $expr: { $lte: ['$available', '$reorderLevel'] },
    }).populate('product');

    res.json({
      success: true,
      lowStockProducts: inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInventoryHistory = async (req, res) => {
  try {
    const { productId } = req.params;
    const { limit = 20 } = req.query;

    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    const history = inventory.history.slice(-limit).reverse();

    res.json({
      success: true,
      history,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.reserveStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    if (inventory.available < quantity) {
      return res.status(400).json({ message: 'Insufficient available stock' });
    }

    inventory.reserved += quantity;
    await inventory.save();

    res.json({
      success: true,
      message: 'Stock reserved successfully',
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.releaseReservedStock = async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const inventory = await Inventory.findOne({ product: productId });

    if (!inventory) {
      return res.status(404).json({ message: 'Inventory not found' });
    }

    if (inventory.reserved < quantity) {
      return res.status(400).json({ message: 'Cannot release more than reserved' });
    }

    inventory.reserved -= quantity;
    await inventory.save();

    res.json({
      success: true,
      message: 'Reserved stock released successfully',
      inventory,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
