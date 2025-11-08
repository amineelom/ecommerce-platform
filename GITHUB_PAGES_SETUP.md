# GitHub Pages Setup Guide

Deploy your e-commerce platform frontend to GitHub Pages.

## What is GitHub Pages?

GitHub Pages is a free static site hosting service that publishes HTML, CSS, and JavaScript files directly from a GitHub repository.

## Prerequisites

- GitHub account
- Repository on GitHub (amineelom/ecommerce-platform)
- GitHub Actions enabled (default)

## Setup Steps

### Step 1: Enable GitHub Pages

1. Go to your repository: https://github.com/amineelom/ecommerce-platform
2. Click **Settings** (gear icon)
3. In the left sidebar, click **Pages**
4. Under "Build and deployment":
   - **Source:** Select "GitHub Actions"
   - This enables automatic deployment from GitHub Actions

### Step 2: Configure GitHub Pages Workflow

The workflow file `.github/workflows/pages.yml` is already configured to:
- Build your React frontend with Vite
- Upload the built files to GitHub Pages
- Deploy automatically on every push to main

### Step 3: Push Code to GitHub

Since HTTPS authentication is having issues, you have two options:

#### Option A: Create a Personal Access Token (Recommended)

1. Go to GitHub Settings: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Configure token:
   - Name: `ecommerce-platform-token`
   - Expiration: 90 days (or longer)
   - Scopes: Select `repo` (full control of private repositories)
4. Click **Generate token**
5. Copy the token (you won't see it again!)

#### Option B: Use GitHub CLI

```bash
gh auth login
# Follow the prompts to authenticate
```

### Step 4: Push Your Code

```bash
# Using Personal Access Token
git push https://<YOUR_TOKEN>@github.com/amineelom/ecommerce-platform.git main

# Or using GitHub CLI (if authenticated)
git push origin main
```

### Step 5: Verify Deployment

1. Go to your repository
2. Click **Actions** tab
3. Look for "Deploy to GitHub Pages" workflow
4. Wait for it to complete (green checkmark)
5. Your site will be available at: `https://amineelom.github.io/ecommerce-platform`

## GitHub Pages URL

After successful deployment, your frontend will be available at:

```
https://amineelom.github.io/ecommerce-platform
```

## Connecting Frontend to Backend

Since GitHub Pages only hosts static files, you need to connect to your backend API:

### Update API Configuration

Edit `src/constants/index.js`:

```javascript
export const API_BASE_URL = 'https://your-backend-domain.com/api';
```

Or use environment variables:

```bash
VITE_APP_API_URL=https://your-backend-domain.com/api npm run build
```

## Custom Domain (Optional)

To use a custom domain with GitHub Pages:

1. Go to **Settings** → **Pages**
2. Under "Custom domain", enter your domain (e.g., `ecommerce.yourdomain.com`)
3. Click **Save**
4. Add DNS records to your domain provider:
   - `CNAME` record pointing to `amineelom.github.io`
   - Or `A` records pointing to GitHub's IP addresses

## Troubleshooting

### Pages Not Deploying

1. Check **Actions** tab for workflow errors
2. Ensure `npm run build` succeeds locally
3. Verify `dist` folder is created
4. Check that `.github/workflows/pages.yml` exists

### 404 Errors on Refresh

GitHub Pages doesn't support client-side routing by default. To fix:

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

2. Update `src/main.jsx` to handle routing:

```javascript
// Redirect from 404.html
if (sessionStorage.redirect) {
  const redirect = sessionStorage.redirect;
  delete sessionStorage.redirect;
  window.location.href = redirect;
}
```

### Build Failures

Check the Actions log for errors:

1. Go to **Actions** tab
2. Click the failed workflow
3. Expand the "Build frontend" step
4. Look for error messages
5. Common issues:
   - Missing environment variables
   - Dependency installation failures
   - Build script errors

## Updating Your Site

Every time you push to the main branch:

1. GitHub Actions automatically triggers
2. Builds your React app
3. Deploys to GitHub Pages
4. Your changes are live in ~2 minutes

## Performance Tips

1. **Optimize Images:** Use compressed images
2. **Code Splitting:** Vite does this automatically
3. **Lazy Loading:** Use React.lazy() for components
4. **Caching:** GitHub Pages caches static assets

## Monitoring Deployments

View deployment history:

1. Go to **Deployments** tab in your repository
2. See all past deployments
3. Click on a deployment to view details
4. Rollback if needed

## Security Considerations

1. **Never commit secrets:** Use environment variables
2. **Use HTTPS:** GitHub Pages uses HTTPS by default
3. **Protect sensitive data:** Don't expose API keys
4. **Validate input:** Always validate user input

## Next Steps

1. **Push your code** using one of the methods above
2. **Monitor the deployment** in the Actions tab
3. **Visit your site** at `https://amineelom.github.io/ecommerce-platform`
4. **Connect your backend** API
5. **Test the application** thoroughly

## Useful Links

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Documentation](https://vitejs.dev/)
- [React Router Documentation](https://reactrouter.com/)

## Support

For GitHub Pages issues:
- Check [GitHub Status](https://www.githubstatus.com/)
- Review [GitHub Pages troubleshooting](https://docs.github.com/en/pages/getting-started-with-github-pages/about-github-pages)
- Create an issue in your repository

---

**Your frontend is now ready for GitHub Pages deployment!** 🚀
