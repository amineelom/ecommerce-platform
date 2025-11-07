# Docker Setup Guide

Run the entire e-commerce platform using Docker and Docker Compose.

## Prerequisites

- [Docker](https://www.docker.com/products/docker-desktop) (v20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (v1.29+)
- At least 4GB RAM available

## Quick Start

### 1. Clone the Repository

```bash
git clone https://github.com/amineelom/ecommerce-platform.git
cd ecommerce-platform
```

### 2. Create Environment File

```bash
cp .env.example .env.docker
```

Edit `.env.docker` with your configuration:

```env
NODE_ENV=development
MONGO_USER=admin
MONGO_PASSWORD=password
JWT_SECRET=your_jwt_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
STRIPE_SECRET_KEY=your_stripe_secret_key
```

### 3. Start Services

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 4. Access Application

- **Frontend:** http://localhost
- **Backend API:** http://localhost/api
- **MongoDB:** localhost:27017
- **Redis:** localhost:6379

## Services

### MongoDB

- **Container:** ecommerce-db
- **Port:** 27017
- **Username:** admin (default)
- **Password:** password (default)
- **Database:** ecommerce

Access MongoDB:

```bash
docker-compose exec mongodb mongosh -u admin -p password
```

### Redis

- **Container:** ecommerce-cache
- **Port:** 6379

Access Redis:

```bash
docker-compose exec redis redis-cli
```

### Backend API

- **Container:** ecommerce-api
- **Port:** 5000
- **Health Check:** http://localhost:5000/health

View logs:

```bash
docker-compose logs -f backend
```

### Nginx

- **Container:** ecommerce-proxy
- **Port:** 80, 443
- **Config:** nginx.conf

## Building Images

### Build Backend Image

```bash
docker build -t ecommerce-api:latest .
```

### Build with Docker Compose

```bash
docker-compose build
```

### Push to Docker Hub

```bash
docker login
docker tag ecommerce-api:latest yourusername/ecommerce-api:latest
docker push yourusername/ecommerce-api:latest
```

## Development Workflow

### Run in Development Mode

```bash
# Start services with hot reload
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d
```

### Execute Commands in Container

```bash
# Run npm commands
docker-compose exec backend npm install

# Run MongoDB commands
docker-compose exec mongodb mongosh

# Run shell
docker-compose exec backend sh
```

### View Logs

```bash
# All services
docker-compose logs -f

# Specific service
docker-compose logs -f backend

# Last 100 lines
docker-compose logs --tail=100 backend
```

## Database Management

### Backup Database

```bash
docker-compose exec mongodb mongodump --out /backup
docker cp ecommerce-db:/backup ./backup
```

### Restore Database

```bash
docker cp ./backup ecommerce-db:/backup
docker-compose exec mongodb mongorestore /backup
```

### Reset Database

```bash
docker-compose down -v
docker-compose up -d
```

## Troubleshooting

### Container Won't Start

```bash
# Check logs
docker-compose logs backend

# Rebuild image
docker-compose build --no-cache backend

# Restart service
docker-compose restart backend
```

### Port Already in Use

```bash
# Change port in docker-compose.yml
# Or kill process using port
lsof -i :5000
kill -9 <PID>
```

### MongoDB Connection Error

```bash
# Check MongoDB is running
docker-compose ps mongodb

# Check logs
docker-compose logs mongodb

# Restart MongoDB
docker-compose restart mongodb
```

### Out of Memory

```bash
# Increase Docker memory limit in Docker Desktop settings
# Or reduce services running
docker-compose down
```

## Production Deployment

### Build Production Image

```bash
docker build -t ecommerce-api:1.0.0 .
```

### Push to Registry

```bash
docker tag ecommerce-api:1.0.0 registry.example.com/ecommerce-api:1.0.0
docker push registry.example.com/ecommerce-api:1.0.0
```

### Deploy with Docker Compose

```bash
# On production server
docker-compose -f docker-compose.yml pull
docker-compose -f docker-compose.yml up -d
```

### Use Environment Variables

```bash
# Create .env file
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/ecommerce
JWT_SECRET=your_production_secret

# Start with env file
docker-compose --env-file .env.production up -d
```

## Performance Optimization

### Resource Limits

Edit `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: '1'
          memory: 512M
        reservations:
          cpus: '0.5'
          memory: 256M
```

### Enable Caching

```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker build .
```

### Multi-stage Build

The Dockerfile already uses multi-stage builds for optimal image size.

## Monitoring

### Health Checks

All services have health checks configured:

```bash
# Check service health
docker-compose ps

# View health status
docker inspect ecommerce-api | grep -A 10 Health
```

### Resource Usage

```bash
# View resource consumption
docker stats

# View specific container
docker stats ecommerce-api
```

## Cleanup

### Remove Unused Resources

```bash
# Remove stopped containers
docker container prune

# Remove unused images
docker image prune

# Remove unused volumes
docker volume prune

# Remove everything
docker system prune -a
```

### Stop and Remove Services

```bash
# Stop services
docker-compose stop

# Remove containers
docker-compose rm

# Remove everything including volumes
docker-compose down -v
```

## Security

### Use Secrets

```bash
# Create secret
echo "your_secret_value" | docker secret create my_secret -

# Use in compose
docker-compose config
```

### Network Isolation

Services communicate through `ecommerce-network` bridge network.

### SSL/TLS

Update `nginx.conf` with your SSL certificates:

```nginx
ssl_certificate /etc/nginx/ssl/cert.pem;
ssl_certificate_key /etc/nginx/ssl/key.pem;
```

## Advanced Usage

### Custom Network

```bash
docker network create ecommerce-net
docker-compose -f docker-compose.yml --network ecommerce-net up -d
```

### Scale Services

```bash
docker-compose up -d --scale backend=3
```

### Override Configuration

```bash
# Create docker-compose.override.yml
version: '3.8'
services:
  backend:
    ports:
      - "5001:5000"
```

## Support

For Docker-related issues:
- Check [Docker documentation](https://docs.docker.com/)
- Review [Docker Compose documentation](https://docs.docker.com/compose/)
- Create an issue on GitHub

## Next Steps

- Configure SSL certificates
- Set up monitoring with Prometheus/Grafana
- Implement log aggregation with ELK stack
- Configure backup strategy
- Set up CI/CD pipeline
