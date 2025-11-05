const Coupon = require('../models/Coupon');

exports.validateCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Check if coupon is active
    if (!coupon.isActive) {
      return res.status(400).json({ message: 'Coupon is not active' });
    }

    // Check date validity
    const now = new Date();
    if (now < coupon.startDate || now > coupon.endDate) {
      return res.status(400).json({ message: 'Coupon has expired' });
    }

    // Check usage limit
    if (coupon.usageLimit && coupon.usageCount >= coupon.usageLimit) {
      return res.status(400).json({ message: 'Coupon usage limit exceeded' });
    }

    // Check minimum order amount
    if (orderAmount < coupon.minOrderAmount) {
      return res.status(400).json({
        message: `Minimum order amount of $${coupon.minOrderAmount} required`,
      });
    }

    // Check user usage limit
    const userUsage = coupon.usedBy.find((u) => u.user.toString() === req.user.id);
    if (userUsage && userUsage.usageCount >= coupon.userUsageLimit) {
      return res.status(400).json({ message: 'You have reached the usage limit for this coupon' });
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (orderAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
      }
    } else {
      discount = coupon.discountValue;
    }

    res.json({
      success: true,
      coupon: {
        code: coupon.code,
        discountType: coupon.discountType,
        discountValue: coupon.discountValue,
        discount,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.applyCoupon = async (req, res) => {
  try {
    const { code, orderAmount } = req.body;

    const coupon = await Coupon.findOne({ code: code.toUpperCase() });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    // Update usage
    coupon.usageCount += 1;

    const userUsageIndex = coupon.usedBy.findIndex((u) => u.user.toString() === req.user.id);
    if (userUsageIndex > -1) {
      coupon.usedBy[userUsageIndex].usageCount += 1;
      coupon.usedBy[userUsageIndex].lastUsedAt = new Date();
    } else {
      coupon.usedBy.push({
        user: req.user.id,
        usageCount: 1,
        lastUsedAt: new Date(),
      });
    }

    await coupon.save();

    res.json({
      success: true,
      message: 'Coupon applied successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAllCoupons = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const coupons = await Coupon.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Coupon.countDocuments();

    res.json({
      success: true,
      coupons,
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

exports.createCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Coupon created successfully',
      coupon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const coupon = await Coupon.findByIdAndUpdate(couponId, req.body, {
      new: true,
    });

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({
      success: true,
      message: 'Coupon updated successfully',
      coupon,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;

    const coupon = await Coupon.findByIdAndDelete(couponId);

    if (!coupon) {
      return res.status(404).json({ message: 'Coupon not found' });
    }

    res.json({
      success: true,
      message: 'Coupon deleted successfully',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
