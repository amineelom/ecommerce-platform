const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
    unique: true,
  },
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  reserved: {
    type: Number,
    default: 0,
  },
  available: {
    type: Number,
    default: 0,
  },
  reorderLevel: {
    type: Number,
    default: 10,
  },
  reorderQuantity: {
    type: Number,
    default: 50,
  },
  warehouse: {
    location: String,
    quantity: Number,
  },
  history: [
    {
      type: {
        type: String,
        enum: ['purchase', 'sale', 'return', 'adjustment', 'damage'],
      },
      quantity: Number,
      reason: String,
      reference: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  lastRestocked: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Calculate available quantity
inventorySchema.pre('save', function (next) {
  this.available = this.quantity - this.reserved;
  next();
});

module.exports = mongoose.model('Inventory', inventorySchema);
