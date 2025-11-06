const nodemailer = require('nodemailer');

// Email templates
const emailTemplates = {
  orderConfirmation: (order) => ({
    subject: `Order Confirmation - #${order.orderNumber}`,
    html: `
      <h2>Order Confirmation</h2>
      <p>Thank you for your order!</p>
      <p><strong>Order Number:</strong> #${order.orderNumber}</p>
      <p><strong>Total Amount:</strong> $${order.total.toFixed(2)}</p>
      <p><strong>Status:</strong> ${order.orderStatus}</p>
      <p>We'll send you a shipping notification once your order is dispatched.</p>
    `,
  }),

  orderShipped: (order) => ({
    subject: `Your Order Has Been Shipped - #${order.orderNumber}`,
    html: `
      <h2>Order Shipped</h2>
      <p>Great news! Your order has been shipped.</p>
      <p><strong>Order Number:</strong> #${order.orderNumber}</p>
      <p><strong>Tracking Number:</strong> ${order.trackingNumber || 'Coming soon'}</p>
      <p>You can track your package using the tracking number above.</p>
    `,
  }),

  orderDelivered: (order) => ({
    subject: `Your Order Has Been Delivered - #${order.orderNumber}`,
    html: `
      <h2>Order Delivered</h2>
      <p>Your order has been delivered successfully!</p>
      <p><strong>Order Number:</strong> #${order.orderNumber}</p>
      <p>Thank you for shopping with us. We hope you enjoy your purchase!</p>
      <p>Please leave a review to help other customers.</p>
    `,
  }),

  welcomeEmail: (user) => ({
    subject: 'Welcome to Our E-Commerce Platform',
    html: `
      <h2>Welcome, ${user.name}!</h2>
      <p>Thank you for creating an account with us.</p>
      <p>You can now browse and purchase products from our store.</p>
      <p>If you have any questions, feel free to contact our support team.</p>
    `,
  }),

  passwordReset: (resetLink) => ({
    subject: 'Password Reset Request',
    html: `
      <h2>Password Reset</h2>
      <p>We received a request to reset your password.</p>
      <p><a href="${resetLink}">Click here to reset your password</a></p>
      <p>If you didn't request this, please ignore this email.</p>
      <p>This link will expire in 1 hour.</p>
    `,
  }),

  promotionalEmail: (promotion) => ({
    subject: promotion.subject || 'Special Offer Just for You!',
    html: `
      <h2>${promotion.title}</h2>
      <p>${promotion.description}</p>
      <p><strong>Discount Code:</strong> ${promotion.code}</p>
      <p>Valid until: ${promotion.expiryDate}</p>
      <p><a href="${promotion.link}">Shop Now</a></p>
    `,
  }),
};

class EmailService {
  constructor() {
    // Initialize nodemailer transporter
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: process.env.SMTP_PORT || 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  async sendEmail(to, subject, html) {
    try {
      const mailOptions = {
        from: process.env.SMTP_USER || 'noreply@ecommerce.com',
        to,
        subject,
        html,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.response);
      return { success: true, messageId: info.messageId };
    } catch (error) {
      console.error('Error sending email:', error);
      return { success: false, error: error.message };
    }
  }

  async sendOrderConfirmation(user, order) {
    const template = emailTemplates.orderConfirmation(order);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendOrderShipped(user, order) {
    const template = emailTemplates.orderShipped(order);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendOrderDelivered(user, order) {
    const template = emailTemplates.orderDelivered(order);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendWelcomeEmail(user) {
    const template = emailTemplates.welcomeEmail(user);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendPasswordReset(user, resetLink) {
    const template = emailTemplates.passwordReset(resetLink);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendPromotionalEmail(user, promotion) {
    const template = emailTemplates.promotionalEmail(promotion);
    return this.sendEmail(user.email, template.subject, template.html);
  }

  async sendBulkEmail(recipients, subject, html) {
    const results = [];
    for (const email of recipients) {
      const result = await this.sendEmail(email, subject, html);
      results.push(result);
    }
    return results;
  }
}

module.exports = new EmailService();
