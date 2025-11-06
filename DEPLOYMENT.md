# E-Commerce Platform - Deployment Guide

Complete guide for deploying the e-commerce platform to production.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Environment Setup](#environment-setup)
3. [Database Setup](#database-setup)
4. [Deployment Options](#deployment-options)
5. [Post-Deployment](#post-deployment)
6. [Monitoring](#monitoring)
7. [Troubleshooting](#troubleshooting)

## Prerequisites

- Node.js v14+ and npm
- MongoDB (local or Atlas)
- Git
- A hosting provider account (Heroku, AWS, DigitalOcean, etc.)
- Domain name (optional but recommended)

## Environment Setup

### 1. Create Production Environment File

Create a `.env.production` file with production values:

```env
# Server Configuration
PORT=5000
NODE_ENV=production

# Database Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ecommerce

# JWT Configuration
JWT_SECRET=your_very_secure_random_string_here
JWT_EXPIRE=7d

# Frontend Configuration
REACT_APP_API_URL=https://api.yourdomain.com

# Stripe Configuration
STRIPE_PUBLIC_KEY=pk_live_your_live_key
STRIPE_SECRET_KEY=sk_live_your_live_key

# Email Configuration
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# AWS S3 Configuration (Optional)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_S3_BUCKET=your_bucket_name
AWS_REGION=us-east-1

# Application Settings
TAX_RATE=0.1
SHIPPING_COST=0
ITEMS_PER_PAGE=10
```

### 2. Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

## Database Setup

### Option 1: MongoDB Atlas (Recommended)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with strong password
4. Whitelist your server IP
5. Get connection string
6. Update `MONGODB_URI` in `.env.production`

### Option 2: Self-Hosted MongoDB

```bash
# Install MongoDB
# Follow official MongoDB installation guide

# Start MongoDB service
mongod --dbpath /path/to/data

# Create database and user
mongo
> use ecommerce
> db.createUser({
    user: "ecommerce_user",
    pwd: "strong_password",
    roles: ["readWrite"]
  })
```

## Deployment Options

### Option 1: Deploy to Heroku

#### Step 1: Install Heroku CLI

```bash
npm install -g heroku
heroku login
```

#### Step 2: Create Heroku App

```bash
heroku create your-app-name
```

#### Step 3: Set Environment Variables

```bash
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your_mongodb_uri
heroku config:set JWT_SECRET=your_jwt_secret
# ... set all other environment variables
```

#### Step 4: Deploy

```bash
git push heroku main
```

#### Step 5: View Logs

```bash
heroku logs --tail
```

### Option 2: Deploy to AWS EC2

#### Step 1: Launch EC2 Instance

1. Go to AWS Console
2. Launch Ubuntu 20.04 LTS instance
3. Configure security groups (allow ports 80, 443, 5000)
4. Create and download key pair

#### Step 2: Connect to Instance

```bash
chmod 400 your-key.pem
ssh -i your-key.pem ubuntu@your-instance-ip
```

#### Step 3: Install Dependencies

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Install Nginx
sudo apt install -y nginx

# Install PM2
sudo npm install -g pm2
```

#### Step 4: Clone Repository

```bash
git clone https://github.com/yourusername/ecommerce-platform.git
cd ecommerce-platform
npm install
```

#### Step 5: Configure Environment

```bash
cp .env.example .env.production
# Edit .env.production with production values
```

#### Step 6: Build Frontend

```bash
npm run build
```

#### Step 7: Start Application with PM2

```bash
pm2 start server/server.js --name "ecommerce-api"
pm2 save
pm2 startup
```

#### Step 8: Configure Nginx

Create `/etc/nginx/sites-available/ecommerce`:

```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location /api {
        proxy_pass http://localhost:5000/api;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/ecommerce /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

#### Step 9: Setup SSL with Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

### Option 3: Deploy to DigitalOcean

#### Step 1: Create Droplet

1. Go to DigitalOcean Console
2. Create new droplet (Ubuntu 20.04)
3. Select size (minimum 2GB RAM recommended)
4. Add SSH key

#### Step 2: Follow AWS EC2 Steps 2-9

The process is similar to AWS EC2 deployment.

### Option 4: Deploy to Vercel (Frontend Only)

```bash
npm install -g vercel
vercel
# Follow prompts to deploy
```

## Post-Deployment

### 1. Database Migrations

```bash
# Run any pending migrations
npm run migrate
```

### 2. Seed Initial Data

```bash
# Create admin user
node scripts/create-admin.js

# Seed sample products
node scripts/seed-products.js
```

### 3. Setup SSL/TLS

Ensure HTTPS is enabled for security.

### 4. Configure CORS

Update `server.js` with your production domain:

```javascript
const corsOptions = {
  origin: 'https://yourdomain.com',
  credentials: true,
};
```

### 5. Setup Email Service

Configure SMTP credentials for email notifications.

### 6. Setup Payment Processing

Configure Stripe keys for payment processing.

## Monitoring

### 1. Application Monitoring

```bash
# With PM2
pm2 monit

# With New Relic
npm install newrelic
# Add to top of server.js: require('newrelic')
```

### 2. Database Monitoring

- MongoDB Atlas provides built-in monitoring
- Set up alerts for high CPU/memory usage
- Monitor connection count

### 3. Error Tracking

Setup Sentry for error tracking:

```bash
npm install @sentry/node
```

### 4. Performance Monitoring

- Use New Relic or DataDog
- Monitor API response times
- Track database query performance

### 5. Uptime Monitoring

- Use Pingdom or UptimeRobot
- Monitor critical endpoints
- Set up alerts

## Troubleshooting

### Application Won't Start

```bash
# Check logs
pm2 logs ecommerce-api

# Check port availability
lsof -i :5000

# Restart application
pm2 restart ecommerce-api
```

### Database Connection Issues

```bash
# Test MongoDB connection
mongo "your_mongodb_uri"

# Check network connectivity
ping your_mongodb_host

# Verify credentials
# Check MONGODB_URI in .env
```

### High Memory Usage

```bash
# Check memory consumption
pm2 monit

# Restart application
pm2 restart ecommerce-api

# Increase Node.js heap size
NODE_OPTIONS=--max-old-space-size=4096 pm2 start server/server.js
```

### Email Not Sending

```bash
# Check SMTP configuration
# Verify credentials in .env
# Check email logs in application
# Test with nodemailer directly
```

### Slow API Response

```bash
# Check database indexes
# Monitor slow queries
# Optimize database queries
# Consider caching with Redis
```

## Scaling

### Horizontal Scaling

1. Use load balancer (AWS ELB, Nginx)
2. Run multiple instances of the application
3. Use sticky sessions for user sessions

### Vertical Scaling

1. Increase server resources (CPU, RAM)
2. Optimize database queries
3. Implement caching (Redis)

### Database Scaling

1. Add read replicas
2. Implement sharding
3. Optimize indexes

## Backup Strategy

### Database Backups

```bash
# MongoDB Atlas automatic backups
# Or manual backup:
mongodump --uri "your_mongodb_uri" --out ./backup

# Restore:
mongorestore ./backup
```

### Application Code

```bash
# Git ensures code backup
git push origin main
```

### Regular Backup Schedule

- Daily automated backups
- Weekly manual verification
- Monthly backup testing

## Security Checklist

- [ ] Use HTTPS/SSL
- [ ] Set strong JWT secret
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable database authentication
- [ ] Setup firewall rules
- [ ] Regular security updates
- [ ] Monitor for suspicious activity
- [ ] Implement rate limiting
- [ ] Use CSRF tokens
- [ ] Validate all inputs
- [ ] Keep dependencies updated

## Support

For deployment issues, refer to:
- [Node.js Documentation](https://nodejs.org/docs/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Heroku Documentation](https://devcenter.heroku.com/)
- [AWS Documentation](https://docs.aws.amazon.com/)
