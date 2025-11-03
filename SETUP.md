# E-Commerce Platform - Setup Guide

A comprehensive full-stack e-commerce platform built with React, Node.js, Express, and MongoDB.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Running the Application](#running-the-application)
5. [Project Structure](#project-structure)
6. [Features](#features)
7. [API Documentation](#api-documentation)
8. [Troubleshooting](#troubleshooting)

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB** (v4.4 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **Git** - [Download](https://git-scm.com/)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/amineelom/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install Dependencies

```bash
# Install all dependencies (frontend and backend)
npm install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Update the `.env` file with your configuration:

```env
# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/ecommerce

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d

# Frontend Configuration
REACT_APP_API_URL=http://localhost:5000/api
```

### 4. Set Up MongoDB

**Option A: Local MongoDB**

```bash
# Start MongoDB service (macOS with Homebrew)
brew services start mongodb-community

# Or on Linux
sudo systemctl start mongod

# Or on Windows
mongod
```

**Option B: MongoDB Atlas (Cloud)**

1. Create an account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get your connection string
4. Update `MONGODB_URI` in `.env`

## Configuration

### Database Setup

The application will automatically create the necessary collections on first run. Ensure MongoDB is running before starting the server.

### JWT Secret

Generate a secure JWT secret:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Update the `JWT_SECRET` in `.env` with the generated value.

## Running the Application

### Option 1: Run Both Frontend and Backend Together

```bash
npm start
```

This will start:
- Backend server on `http://localhost:5000`
- Frontend dev server on `http://localhost:3000`

### Option 2: Run Separately

**Terminal 1 - Backend:**

```bash
npm run server
```

Backend will run on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
npm run dev
```

Frontend will run on `http://localhost:3000`

### Option 3: Production Build

```bash
# Build frontend
npm run build

# Start backend in production
NODE_ENV=production npm run server
```

## Project Structure

```
ecommerce-platform/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   ├── orderController.js
│   │   └── wishlistController.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   ├── Order.js
│   │   └── Wishlist.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   ├── orderRoutes.js
│   │   └── wishlistRoutes.js
│   └── server.js
├── src/
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── ProductCard.jsx
│   │   └── ...
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Products.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── OrderDetails.jsx
│   │   ├── Profile.jsx
│   │   ├── ProductDetails.jsx
│   │   ├── Wishlist.jsx
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── AdminDashboard.jsx
│   ├── store/
│   │   ├── authStore.js
│   │   ├── cartStore.js
│   │   ├── productStore.js
│   │   ├── orderStore.js
│   │   └── wishlistStore.js
│   ├── utils/
│   │   └── helpers.js
│   ├── constants/
│   │   └── index.js
│   ├── App.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── vite.config.js
├── package.json
├── .env
└── README.md
```

## Features

### User Features

- ✅ User Registration and Login
- ✅ User Profile Management
- ✅ Product Browsing and Search
- ✅ Product Details with Reviews
- ✅ Shopping Cart Management
- ✅ Wishlist Functionality
- ✅ Multi-step Checkout Process
- ✅ Order Tracking
- ✅ Order History

### Admin Features

- ✅ Admin Dashboard
- ✅ Product Management (Create, Read, Update, Delete)
- ✅ Order Management
- ✅ Sales Analytics
- ✅ User Management

### Technical Features

- ✅ JWT Authentication
- ✅ Responsive Design
- ✅ State Management with Zustand
- ✅ RESTful API
- ✅ MongoDB Database
- ✅ Error Handling
- ✅ Input Validation

## API Documentation

### Authentication Endpoints

```
POST   /api/auth/register       - Register new user
POST   /api/auth/login          - Login user
GET    /api/auth/profile        - Get user profile
PUT    /api/auth/update-profile - Update user profile
```

### Product Endpoints

```
GET    /api/products            - Get all products
GET    /api/products/:id        - Get product by ID
POST   /api/products            - Create product (Admin)
PUT    /api/products/:id        - Update product (Admin)
DELETE /api/products/:id        - Delete product (Admin)
```

### Cart Endpoints

```
GET    /api/cart                - Get user cart
POST   /api/cart/add            - Add item to cart
PUT    /api/cart/:id            - Update cart item
DELETE /api/cart/:id            - Remove item from cart
DELETE /api/cart/clear          - Clear cart
```

### Order Endpoints

```
GET    /api/orders              - Get user orders
GET    /api/orders/:id          - Get order by ID
POST   /api/orders              - Create order
PUT    /api/orders/:id          - Update order status (Admin)
DELETE /api/orders/:id/cancel   - Cancel order
```

### Wishlist Endpoints

```
GET    /api/wishlist            - Get user wishlist
POST   /api/wishlist/add        - Add to wishlist
DELETE /api/wishlist/:id        - Remove from wishlist
DELETE /api/wishlist            - Clear wishlist
GET    /api/wishlist/check/:id  - Check if product in wishlist
```

## Troubleshooting

### MongoDB Connection Error

**Problem:** `MongooseError: Cannot connect to MongoDB`

**Solution:**
1. Ensure MongoDB is running
2. Check `MONGODB_URI` in `.env`
3. Verify MongoDB credentials if using Atlas

### Port Already in Use

**Problem:** `Error: listen EADDRINUSE: address already in use :::5000`

**Solution:**
```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Or use a different port
PORT=5001 npm run server
```

### CORS Error

**Problem:** `Access to XMLHttpRequest blocked by CORS policy`

**Solution:**
1. Ensure backend is running on `http://localhost:5000`
2. Check `REACT_APP_API_URL` in `.env`
3. Verify CORS is enabled in `server.js`

### Module Not Found

**Problem:** `Cannot find module 'express'`

**Solution:**
```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

### Build Errors

**Problem:** Vite build fails

**Solution:**
```bash
# Clear cache and rebuild
rm -rf dist
npm run build
```

## Development Tips

### Hot Module Replacement (HMR)

The frontend automatically reloads when you save changes during development.

### API Testing

Use tools like [Postman](https://www.postman.com/) or [Insomnia](https://insomnia.rest/) to test API endpoints.

### Database Inspection

Use [MongoDB Compass](https://www.mongodb.com/products/compass) to inspect and manage your database.

### Debug Mode

```bash
# Run with debug logging
DEBUG=* npm run server
```

## Deployment

### Deploy to Heroku

1. Create a Heroku account
2. Install Heroku CLI
3. Run:

```bash
heroku login
heroku create your-app-name
git push heroku main
```

### Deploy Frontend to Vercel

1. Create a Vercel account
2. Connect your GitHub repository
3. Deploy with one click

## Support

For issues and questions, please create an issue on [GitHub](https://github.com/amineelom/ecommerce-platform/issues).

## License

This project is licensed under the ISC License - see the LICENSE file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

**Happy Coding!** 🚀
