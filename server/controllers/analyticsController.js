const Analytics = require('../models/Analytics');
const Order = require('../models/Order');
const User = require('../models/User');
const Product = require('../models/Product');

exports.getDashboardStats = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    const query = {};
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const analytics = await Analytics.find(query).sort({ date: -1 }).limit(30);

    if (analytics.length === 0) {
      return res.json({
        success: true,
        stats: {
          totalRevenue: 0,
          totalOrders: 0,
          totalCustomers: 0,
          averageOrderValue: 0,
          conversionRate: 0,
        },
        analytics: [],
      });
    }

    const totalRevenue = analytics.reduce((sum, a) => sum + a.totalRevenue, 0);
    const totalOrders = analytics.reduce((sum, a) => sum + a.totalOrders, 0);
    const totalCustomers = analytics[0].totalCustomers || 0;
    const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

    res.json({
      success: true,
      stats: {
        totalRevenue,
        totalOrders,
        totalCustomers,
        averageOrderValue,
        conversionRate: analytics[0].conversionRate || 0,
      },
      analytics,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getSalesAnalytics = async (req, res) => {
  try {
    const { period = '30' } = req.query;
    const days = parseInt(period);
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const orders = await Order.find({
      createdAt: { $gte: startDate },
    }).populate('items.product');

    const salesByDate = {};
    orders.forEach((order) => {
      const date = order.createdAt.toISOString().split('T')[0];
      if (!salesByDate[date]) {
        salesByDate[date] = { sales: 0, revenue: 0, orders: 0 };
      }
      salesByDate[date].sales += order.items.reduce((sum, item) => sum + item.quantity, 0);
      salesByDate[date].revenue += order.total;
      salesByDate[date].orders += 1;
    });

    const chartData = Object.entries(salesByDate).map(([date, data]) => ({
      date,
      ...data,
    }));

    res.json({
      success: true,
      chartData: chartData.sort((a, b) => new Date(a.date) - new Date(b.date)),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductAnalytics = async (req, res) => {
  try {
    const { limit = 10 } = req.query;

    const orders = await Order.find().populate('items.product');

    const productStats = {};
    orders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = item.product._id.toString();
        if (!productStats[productId]) {
          productStats[productId] = {
            product: item.product,
            sales: 0,
            revenue: 0,
          };
        }
        productStats[productId].sales += item.quantity;
        productStats[productId].revenue += item.price * item.quantity;
      });
    });

    const topProducts = Object.values(productStats)
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, limit);

    res.json({
      success: true,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCustomerAnalytics = async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const newCustomersThisMonth = await User.countDocuments({
      role: 'customer',
      createdAt: {
        $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    });

    const orders = await Order.find().populate('user');
    const customerStats = {};

    orders.forEach((order) => {
      const userId = order.user._id.toString();
      if (!customerStats[userId]) {
        customerStats[userId] = {
          customer: order.user,
          orders: 0,
          totalSpent: 0,
        };
      }
      customerStats[userId].orders += 1;
      customerStats[userId].totalSpent += order.total;
    });

    const topCustomers = Object.values(customerStats)
      .sort((a, b) => b.totalSpent - a.totalSpent)
      .slice(0, 10);

    res.json({
      success: true,
      stats: {
        totalCustomers,
        newCustomersThisMonth,
      },
      topCustomers,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.recordPageView = async (req, res) => {
  try {
    const { page, source, device } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let analytics = await Analytics.findOne({
      date: { $gte: today },
    });

    if (!analytics) {
      analytics = new Analytics({ date: today });
    }

    analytics.pageViews += 1;
    if (source) {
      analytics.trafficSources[source] = (analytics.trafficSources[source] || 0) + 1;
    }
    if (device) {
      analytics.deviceBreakdown[device] = (analytics.deviceBreakdown[device] || 0) + 1;
    }

    await analytics.save();

    res.json({
      success: true,
      message: 'Page view recorded',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
