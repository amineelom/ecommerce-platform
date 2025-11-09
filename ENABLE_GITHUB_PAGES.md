# Enable GitHub Pages - Manual Setup

Your code is now on GitHub! Follow these steps to enable GitHub Pages for your e-commerce platform frontend.

## Step 1: Go to Repository Settings

1. Visit: https://github.com/amineelom/ecommerce-platform
2. Click the **Settings** tab (gear icon)
3. In the left sidebar, click **Pages**

## Step 2: Configure GitHub Pages

Under "Build and deployment" section:

1. **Source:** Select **"Deploy from a branch"**
2. **Branch:** Select **"main"**
3. **Folder:** Select **"/ (root)"**
4. Click **Save**

## Step 3: Build Your Frontend Locally

Before GitHub Pages can serve your site, you need to build the frontend:

```bash
# Install dependencies
npm install

# Build the React app
npm run build

# This creates a 'dist' folder with your static files
```

## Step 4: Create a Deployment Branch (Alternative Method)

If you want automatic deployment, create a `gh-pages` branch:

```bash
# Build the frontend
npm run build

# Install gh-pages package
npm install --save-dev gh-pages

# Deploy to gh-pages branch
npx gh-pages -d dist
```

## Step 5: Verify Deployment

1. Go back to **Settings** → **Pages**
2. Look for the message: "Your site is published at https://amineelom.github.io/ecommerce-platform"
3. Click the link to visit your live site!

## What Gets Deployed?

Only the **frontend** (React app) gets deployed to GitHub Pages. The **backend** API needs to be deployed separately to a server like:
- Heroku
- AWS
- DigitalOcean
- Railway
- Render

## Connecting Frontend to Backend

Once your backend is deployed, update the API URL in your code:

**File:** `src/constants/index.js`

```javascript
// Change this:
export const API_BASE_URL = 'http://localhost:5000/api';

// To your deployed backend URL:
export const API_BASE_URL = 'https://your-backend-domain.com/api';
```

Then rebuild and deploy:

```bash
npm run build
npx gh-pages -d dist
```

## GitHub Pages URL

Your frontend will be available at:

```
https://amineelom.github.io/ecommerce-platform
```

## Using a Custom Domain (Optional)

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain
3. Add DNS records to your domain provider:
   - CNAME: `amineelom.github.io`

## Troubleshooting

### Site Not Showing

- Ensure the `dist` folder exists after running `npm run build`
- Check that **Pages** is enabled in Settings
- Wait 2-3 minutes for deployment to complete

### 404 Errors on Page Refresh

GitHub Pages doesn't support client-side routing. To fix:

1. Create `public/404.html`:

```html
<!DOCTYPE html>
<html>
  <head>
    <script>
      sessionStorage.redirect = location.href;
    </script>
    <meta http-equiv="refresh" content="0;url=/">
  </head>
</html>
```

2. Update `vite.config.js` to include 404.html in the build

### API Calls Failing

- Check that your backend is deployed
- Verify the API URL in `src/constants/index.js`
- Check CORS settings on your backend
- Use browser DevTools to see the actual API requests

## Deployment Workflow

### Manual Deployment (Recommended for Now)

```bash
# 1. Make changes to your code
# 2. Build the frontend
npm run build

# 3. Deploy to GitHub Pages
npx gh-pages -d dist

# 4. Your changes are live in 2-3 minutes
```

### Automatic Deployment (Requires Workflow Permission)

Once you have workflow permissions, create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '16'
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

## Next Steps

1. **Build your frontend:** `npm run build`
2. **Deploy to GitHub Pages:** `npx gh-pages -d dist`
3. **Visit your site:** https://amineelom.github.io/ecommerce-platform
4. **Deploy your backend** to a hosting service
5. **Update API URL** in your code
6. **Test the full application**

## Useful Commands

```bash
# Build frontend
npm run build

# Deploy to GitHub Pages
npx gh-pages -d dist

# View your site
open https://amineelom.github.io/ecommerce-platform

# Check deployment status
git log --all --oneline | grep "gh-pages"
```

## Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [Vite Build Documentation](https://vitejs.dev/guide/build.html)
- [gh-pages npm Package](https://www.npmjs.com/package/gh-pages)
- [React Router with GitHub Pages](https://create-react-app.dev/docs/deployment/#github-pages)

## Support

For issues:
1. Check the [GitHub Pages troubleshooting guide](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
2. Review the [Vite documentation](https://vitejs.dev/)
3. Create an issue in your repository

---

**Your code is on GitHub! Now enable GitHub Pages and deploy your frontend.** 🚀
