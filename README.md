# 🛍️ Full-Stack E-Commerce Platform

A modern, production-ready e-commerce platform built with **React**, **Node.js**, **Express**, and **MongoDB**. Features a complete shopping experience with user authentication, product catalog, shopping cart, order management, and admin dashboard.

## ✨ Features

### 🔐 Authentication & Authorization
- User registration and login with JWT
- Secure password hashing with bcryptjs
- Role-based access control (User/Admin)
- Profile management

### 📦 Product Management
- Complete product catalog with images
- Advanced search and filtering
- Product categories and sorting
- Featured products section
- Product reviews and ratings
- Stock management

### 🛒 Shopping Cart
- Add/remove items from cart
- Update quantities
- Real-time price calculations
- Tax calculation (10%)
- Persistent cart storage

### 💳 Order Management
- Create orders from cart
- Order tracking and history
- Order status updates
- Payment processing ready (Stripe integration)
- Order confirmation

### 👨‍💼 Admin Dashboard
- Product CRUD operations
- Order management and status updates
- User management
- Sales analytics ready

### 🎨 Frontend
- Responsive design (mobile, tablet, desktop)
- Modern UI with gradient styling
- Smooth animations and transitions
- Intuitive navigation
- Fast loading with optimized components

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stripe** - Payment processing
- **CORS** - Cross-origin requests

### Frontend
- **React** - UI library
- **React Router** - Navigation
- **Axios** - HTTP client
- **Zustand** - State management
- **CSS3** - Styling

## 📋 Project Structure

```
ecommerce-platform/
├── server/
│   ├── config/
│   │   └── database.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── productController.js
│   │   ├── cartController.js
│   │   └── orderController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Product.js
│   │   ├── Cart.js
│   │   └── Order.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── productRoutes.js
│   │   ├── cartRoutes.js
│   │   └── orderRoutes.js
│   ├── middleware/
│   │   ├── auth.js
│   │   └── errorHandler.js
│   └── server.js
├── src/
│   ├── api/
│   │   └── api.js
│   ├── components/
│   │   ├── Navigation.jsx
│   │   ├── Navigation.css
│   │   ├── ProductCard.jsx
│   │   └── ProductCard.css
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Products.jsx
│   │   ├── Products.css
│   │   ├── Cart.jsx
│   │   ├── Cart.css
│   │   ├── Login.jsx
│   │   ├── Register.jsx
│   │   └── Auth.css
│   ├── store/
│   │   ├── authStore.js
│   │   ├── productStore.js
│   │   ├── cartStore.js
│   │   └── orderStore.js
│   └── App.jsx
├── package.json
├── .env.example
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/amineelom/ecommerce-platform.git
cd ecommerce-platform
```

2. **Install dependencies**
```bash
npm install
```

3. **Setup environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your_secret_key_here
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
REACT_APP_API_URL=http://localhost:5000/api
```

4. **Start MongoDB**
```bash
# If using local MongoDB
mongod
```

5. **Start the backend server**
```bash
npm run server
```

6. **Start the frontend (in another terminal)**
```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/profile` - Get user profile (protected)
- `PUT /api/auth/profile` - Update user profile (protected)

### Products
- `GET /api/products` - Get all products with filters
- `GET /api/products/featured` - Get featured products
- `GET /api/products/:id` - Get product details
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `POST /api/products/:id/reviews` - Add product review (protected)

### Cart
- `GET /api/cart` - Get user cart (protected)
- `POST /api/cart/add` - Add item to cart (protected)
- `PUT /api/cart/update` - Update cart item (protected)
- `DELETE /api/cart/:productId` - Remove item from cart (protected)
- `DELETE /api/cart` - Clear cart (protected)

### Orders
- `POST /api/orders` - Create order (protected)
- `GET /api/orders` - Get user orders (protected)
- `GET /api/orders/:id` - Get order details (protected)
- `POST /api/orders/:id/payment` - Process payment (protected)
- `GET /api/orders/admin/all` - Get all orders (admin only)
- `PUT /api/orders/:id/status` - Update order status (admin only)

## 🔐 Authentication

The API uses JWT (JSON Web Tokens) for authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## 💾 Database Models

### User
- name, email, password
- phone, address
- role (user/admin)
- avatar, isActive
- timestamps

### Product
- name, description, price
- discountPrice, category
- image, images array
- stock, rating, reviews
- sku, tags, isFeatured
- timestamps

### Cart
- user (reference)
- items array with product, quantity, price
- subtotal, tax, total
- couponCode, discount
- timestamps

### Order
- user (reference)
- orderNumber, items
- shippingAddress, billingAddress
- subtotal, shippingCost, tax, total
- paymentMethod, paymentStatus
- orderStatus, transactionId
- timestamps

## 🧪 Testing

### Test User Credentials
```
Email: test@example.com
Password: password123
```

### Sample Product Data
Products can be created through the admin dashboard or API.

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Create a production MongoDB database
2. Set environment variables on the hosting platform
3. Deploy using git push or platform CLI

### Frontend Deployment (Vercel/Netlify)
1. Build the frontend: `npm run build`
2. Deploy the `dist` folder to your hosting platform

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Server port | 5000 |
| NODE_ENV | Environment | development |
| MONGODB_URI | Database URL | mongodb://localhost:27017/ecommerce |
| JWT_SECRET | JWT secret key | your_secret_key |
| JWT_EXPIRE | Token expiration | 7d |
| STRIPE_PUBLIC_KEY | Stripe public key | pk_test_... |
| STRIPE_SECRET_KEY | Stripe secret key | sk_test_... |
| REACT_APP_API_URL | API base URL | http://localhost:5000/api |

## 🐛 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running
- Check connection string in .env
- Verify network access if using MongoDB Atlas

### CORS Errors
- Verify CORS is enabled in server.js
- Check API_URL in frontend configuration

### Authentication Errors
- Ensure JWT_SECRET is set
- Check token format in requests
- Verify token hasn't expired

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Amine Elom**
- GitHub: [@amineelom](https://github.com/amineelom)

## 🙏 Acknowledgments

- Express.js documentation
- MongoDB documentation
- React documentation
- Stripe API documentation

## 📞 Support

For support, email amine@ecommerce.com or open an issue on GitHub.

---

**Made with ❤️ by Amine Elom**
