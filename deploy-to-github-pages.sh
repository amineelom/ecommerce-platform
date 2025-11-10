#!/bin/bash

# GitHub Pages Deployment Script
# This script builds your React app and deploys it to GitHub Pages

echo "🚀 Starting GitHub Pages Deployment..."
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Build the application
echo -e "${BLUE}Step 1: Building the application...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed!${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build successful!${NC}"
echo ""

# Step 2: Deploy to GitHub Pages
echo -e "${BLUE}Step 2: Deploying to GitHub Pages...${NC}"

# Check if gh-pages is installed
if ! npm list gh-pages > /dev/null 2>&1; then
    echo "Installing gh-pages..."
    npm install --save-dev gh-pages
fi

# Deploy
npx gh-pages -d dist

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✅ Deployment successful!${NC}"
    echo ""
    echo -e "${BLUE}Your site is now live at:${NC}"
    echo -e "${GREEN}https://amineelom.github.io/ecommerce-platform${NC}"
    echo ""
    echo "It may take a few minutes for the changes to appear."
else
    echo -e "${RED}❌ Deployment failed!${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Make sure you have git configured:"
    echo "   git config --global user.name 'Your Name'"
    echo "   git config --global user.email 'your@email.com'"
    echo ""
    echo "2. Make sure you have GitHub authentication set up:"
    echo "   gh auth login"
    echo ""
    echo "3. Try deploying manually:"
    echo "   npx gh-pages -d dist"
    exit 1
fi
