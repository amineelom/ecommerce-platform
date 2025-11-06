# E-Commerce Platform - API Documentation

Complete API reference for the e-commerce platform backend.

## Base URL

```
http://localhost:5000/api
```

## Authentication

Most endpoints require JWT authentication. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Authentication Endpoints

### Register User

```http
POST /auth/register
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "123",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "customer"
  }
}
```

### Login User

```http
POST /auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Get User Profile

```http
GET /auth/profile
Authorization: Bearer <token>
```

### Update User Profile

```http
PUT /auth/update-profile
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "phone": "+1234567890",
  "address": "123 Main St"
}
```

---

## Product Endpoints

### Get All Products

```http
GET /products?page=1&limit=10&category=Electronics&sort=newest
```

**Query Parameters:**
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `sort` - Sort option (newest, oldest, price_asc, price_desc, rating)
- `search` - Search term

**Response:**
```json
{
  "success": true,
  "products": [
    {
      "_id": "123",
      "name": "Product Name",
      "description": "Product description",
      "price": 99.99,
      "discountPrice": 79.99,
      "category": "Electronics",
      "image": "url",
      "rating": 4.5,
      "numReviews": 10,
      "stock": 50
    }
  ],
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1
  }
}
```

### Get Product by ID

```http
GET /products/:id
```

### Create Product (Admin)

```http
POST /products
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "New Product",
  "description": "Description",
  "price": 99.99,
  "category": "Electronics",
  "image": "url",
  "stock": 50
}
```

### Update Product (Admin)

```http
PUT /products/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Updated Name",
  "price": 89.99
}
```

### Delete Product (Admin)

```http
DELETE /products/:id
Authorization: Bearer <admin_token>
```

---

## Cart Endpoints

### Get Cart

```http
GET /cart
Authorization: Bearer <token>
```

### Add to Cart

```http
POST /cart/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "123",
  "quantity": 2
}
```

### Update Cart Item

```http
PUT /cart/:itemId
Authorization: Bearer <token>
Content-Type: application/json

{
  "quantity": 3
}
```

### Remove from Cart

```http
DELETE /cart/:itemId
Authorization: Bearer <token>
```

### Clear Cart

```http
DELETE /cart/clear
Authorization: Bearer <token>
```

---

## Order Endpoints

### Get User Orders

```http
GET /orders
Authorization: Bearer <token>
```

### Get Order by ID

```http
GET /orders/:id
Authorization: Bearer <token>
```

### Create Order

```http
POST /orders
Authorization: Bearer <token>
Content-Type: application/json

{
  "items": [
    {
      "product": "123",
      "quantity": 2,
      "price": 99.99
    }
  ],
  "shippingAddress": {
    "street": "123 Main St",
    "city": "New York",
    "state": "NY",
    "zipCode": "10001",
    "country": "USA"
  },
  "paymentMethod": "credit_card",
  "total": 199.98
}
```

### Update Order Status (Admin)

```http
PUT /orders/:id
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "orderStatus": "shipped",
  "trackingNumber": "TRACK123"
}
```

### Cancel Order

```http
DELETE /orders/:id/cancel
Authorization: Bearer <token>
```

---

## Wishlist Endpoints

### Get Wishlist

```http
GET /wishlist
Authorization: Bearer <token>
```

### Add to Wishlist

```http
POST /wishlist/add
Authorization: Bearer <token>
Content-Type: application/json

{
  "productId": "123"
}
```

### Remove from Wishlist

```http
DELETE /wishlist/:id
Authorization: Bearer <token>
```

### Clear Wishlist

```http
DELETE /wishlist
Authorization: Bearer <token>
```

---

## Review Endpoints

### Get Product Reviews

```http
GET /reviews/product/:productId?page=1&limit=10
```

### Create Review

```http
POST /reviews/product/:productId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "title": "Great product!",
  "comment": "I really enjoyed this product..."
}
```

### Update Review

```http
PUT /reviews/:reviewId
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "title": "Updated title",
  "comment": "Updated comment"
}
```

### Delete Review

```http
DELETE /reviews/:reviewId
Authorization: Bearer <token>
```

### Mark Review as Helpful

```http
POST /reviews/:reviewId/helpful
Authorization: Bearer <token>
```

---

## Coupon Endpoints

### Validate Coupon

```http
POST /coupons/validate
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "SAVE20",
  "orderAmount": 100
}
```

### Apply Coupon

```http
POST /coupons/apply
Authorization: Bearer <token>
Content-Type: application/json

{
  "code": "SAVE20",
  "orderAmount": 100
}
```

### Get All Coupons

```http
GET /coupons?page=1&limit=10
```

### Create Coupon (Admin)

```http
POST /coupons
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "code": "SAVE20",
  "discountType": "percentage",
  "discountValue": 20,
  "minOrderAmount": 50,
  "startDate": "2024-01-01",
  "endDate": "2024-12-31"
}
```

---

## Analytics Endpoints

### Get Dashboard Stats

```http
GET /analytics/dashboard?startDate=2024-01-01&endDate=2024-12-31
Authorization: Bearer <admin_token>
```

### Get Sales Analytics

```http
GET /analytics/sales?period=30
Authorization: Bearer <admin_token>
```

### Get Product Analytics

```http
GET /analytics/products?limit=10
Authorization: Bearer <admin_token>
```

### Get Customer Analytics

```http
GET /analytics/customers
Authorization: Bearer <admin_token>
```

### Record Page View

```http
POST /analytics/page-view
Content-Type: application/json

{
  "page": "/products",
  "source": "organic",
  "device": "mobile"
}
```

---

## Inventory Endpoints

### Get Inventory

```http
GET /inventory?page=1&limit=10
Authorization: Bearer <admin_token>
```

### Get Product Inventory

```http
GET /inventory/product/:productId
Authorization: Bearer <admin_token>
```

### Update Inventory

```http
PUT /inventory/product/:productId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 50,
  "type": "purchase",
  "reason": "New stock arrival"
}
```

### Get Low Stock Products

```http
GET /inventory/low-stock
Authorization: Bearer <admin_token>
```

### Reserve Stock

```http
POST /inventory/reserve/:productId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 5
}
```

### Release Reserved Stock

```http
POST /inventory/release/:productId
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "quantity": 5
}
```

---

## Error Responses

All error responses follow this format:

```json
{
  "success": false,
  "message": "Error description"
}
```

### Common HTTP Status Codes

- `200` - OK
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## Rate Limiting

API requests are rate-limited to prevent abuse:
- 100 requests per minute per IP address
- 1000 requests per hour per user

---

## Pagination

Paginated endpoints support the following parameters:

- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10, max: 100)

Response includes pagination metadata:

```json
{
  "pagination": {
    "total": 100,
    "pages": 10,
    "currentPage": 1
  }
}
```

---

## Sorting

Supported sort options vary by endpoint but generally include:

- `newest` - Most recent first
- `oldest` - Oldest first
- `price_asc` - Price low to high
- `price_desc` - Price high to low
- `rating` - Highest rated first
- `popular` - Most popular first

---

## Testing with cURL

### Example: Get all products

```bash
curl -X GET "http://localhost:5000/api/products?page=1&limit=10" \
  -H "Content-Type: application/json"
```

### Example: Create order

```bash
curl -X POST "http://localhost:5000/api/orders" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [...],
    "shippingAddress": {...},
    "paymentMethod": "credit_card",
    "total": 199.98
  }'
```

---

## Support

For API issues or questions, please contact support or create an issue on GitHub.
