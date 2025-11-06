const mongoose = require('mongoose');

const analyticsSchema = new mongoose.Schema({
  date: {
    type: Date,
    default: Date.now,
    index: true,
  },
  totalSales: {
    type: Number,
    default: 0,
  },
  totalOrders: {
    type: Number,
    default: 0,
  },
  totalRevenue: {
    type: Number,
    default: 0,
  },
  averageOrderValue: {
    type: Number,
    default: 0,
  },
  totalCustomers: {
    type: Number,
    default: 0,
  },
  newCustomers: {
    type: Number,
    default: 0,
  },
  returningCustomers: {
    type: Number,
    default: 0,
  },
  topProducts: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
      sales: Number,
      revenue: Number,
    },
  ],
  topCategories: [
    {
      category: String,
      sales: Number,
      revenue: Number,
    },
  ],
  conversionRate: {
    type: Number,
    default: 0,
  },
  cartAbandonmentRate: {
    type: Number,
    default: 0,
  },
  pageViews: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  trafficSources: {
    direct: { type: Number, default: 0 },
    organic: { type: Number, default: 0 },
    referral: { type: Number, default: 0 },
    social: { type: Number, default: 0 },
    paid: { type: Number, default: 0 },
  },
  deviceBreakdown: {
    desktop: { type: Number, default: 0 },
    mobile: { type: Number, default: 0 },
    tablet: { type: Number, default: 0 },
  },
});

module.exports = mongoose.model('Analytics', analyticsSchema);
