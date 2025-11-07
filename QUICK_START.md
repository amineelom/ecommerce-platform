# Quick Start Guide

Get the e-commerce platform up and running in minutes.

## Prerequisites

- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Git

## Installation (5 minutes)

### 1. Clone Repository

```bash
git clone https://github.com/amineelom/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

```bash
cp .env.example .env
# Edit .env with your settings
```

### 4. Start Services

```bash
# Option A: Start both frontend and backend
npm start

# Option B: Start separately
npm run server    # Terminal 1 - Backend on port 5000
npm run dev       # Terminal 2 - Frontend on port 3000
```

### 5. Access Application

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Documentation: http://localhost:5000/api/docs

## Using Docker (2 minutes)

```bash
# Start all services
docker-compose up -d

# Access application
# Frontend: http://localhost
# Backend API: http://localhost/api
```

## First Steps

### Create Admin User

```bash
node scripts/create-admin.js
```

### Seed Sample Data

```bash
node scripts/seed-products.js
```

### Login

- Email: admin@example.com
- Password: admin123

## Common Commands

```bash
# Development
npm run dev              # Start frontend dev server
npm run server          # Start backend server
npm start               # Start both

# Production
npm run build           # Build frontend
npm run build:server    # Build backend

# Testing
npm test                # Run tests
npm run test:watch     # Watch mode

# Code Quality
npm run lint            # Check code style
npm run lint:fix        # Fix code style
npm run format          # Format code

# Docker
docker-compose up -d    # Start services
docker-compose down     # Stop services
docker-compose logs -f  # View logs
```

## Project Structure

```
src/                    # Frontend code
├── components/        # React components
├── pages/            # Page components
├── store/            # State management
└── utils/            # Utilities

server/                 # Backend code
├── models/           # Database models
├── controllers/      # Business logic
├── routes/          # API routes
└── services/        # External services
```

## API Quick Reference

### Authentication

```bash
# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John","email":"john@example.com","password":"password123"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Products

```bash
# Get all products
curl http://localhost:5000/api/products

# Get product by ID
curl http://localhost:5000/api/products/123
```

### Cart

```bash
# Get cart
curl -H "Authorization: Bearer TOKEN" \
  http://localhost:5000/api/cart

# Add to cart
curl -X POST http://localhost:5000/api/cart/add \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"productId":"123","quantity":2}'
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 5000
lsof -ti:5000 | xargs kill -9

# Use different port
PORT=5001 npm run server
```

### MongoDB Connection Error

```bash
# Check MongoDB is running
mongod

# Or use MongoDB Atlas
# Update MONGODB_URI in .env
```

### Module Not Found

```bash
# Reinstall dependencies
rm -rf node_modules
npm install
```

## Next Steps

1. Read [SETUP.md](SETUP.md) for detailed configuration
2. Check [API_DOCUMENTATION.md](API_DOCUMENTATION.md) for API reference
3. Review [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
4. See [CONTRIBUTING.md](CONTRIBUTING.md) to contribute

## Support

- 📖 [Documentation](README.md)
- 🐛 [Report Issues](https://github.com/amineelom/ecommerce-platform/issues)
- 💬 [Discussions](https://github.com/amineelom/ecommerce-platform/discussions)

## Tips

- Use `.env.example` as a template
- Check logs for errors: `docker-compose logs -f`
- Use Postman for API testing
- Enable debug mode: `DEBUG=* npm run server`
- Use MongoDB Compass for database inspection

Happy coding! 🚀
