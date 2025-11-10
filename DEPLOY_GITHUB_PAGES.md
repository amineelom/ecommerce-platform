# Deploy to GitHub Pages - Manual Instructions

Your frontend is built and ready to deploy! Follow these steps to get it live.

## Option 1: Using GitHub Web Interface (Easiest)

### Step 1: Prepare Your Built Files

The `dist` folder contains your built frontend. You need to push this to GitHub.

### Step 2: Create a gh-pages Branch

```bash
# Create and switch to gh-pages branch
git checkout --orphan gh-pages

# Remove all files
git rm -rf .

# Copy the dist folder contents
cp -r dist/* .

# Add and commit
git add .
git commit -m "Deploy to GitHub Pages"

# Push to GitHub
git push origin gh-pages

# Switch back to main branch
git checkout main
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/amineelom/ecommerce-platform/settings/pages
2. Under "Build and deployment":
   - **Source:** Select "Deploy from a branch"
   - **Branch:** Select "gh-pages"
   - **Folder:** Select "/ (root)"
3. Click **Save**

### Step 4: Wait for Deployment

- GitHub will automatically deploy your site
- Check the "Deployments" tab to see the status
- Your site will be live at: `https://amineelom.github.io/ecommerce-platform`

---

## Option 2: Using GitHub CLI

### Step 1: Authenticate with GitHub

```bash
gh auth login
# Follow the prompts to authenticate
```

### Step 2: Deploy Using gh-pages

```bash
# Make sure you're in the project directory
cd /home/ubuntu/ecommerce-platform

# Deploy to GitHub Pages
npx gh-pages -d dist
```

### Step 3: Enable GitHub Pages

1. Go to: https://github.com/amineelom/ecommerce-platform/settings/pages
2. Select "gh-pages" branch as source
3. Click **Save**

---

## Option 3: Using Personal Access Token

### Step 1: Create a Personal Access Token

1. Go to: https://github.com/settings/tokens
2. Click **Generate new token** → **Generate new token (classic)**
3. Configure:
   - **Name:** `github-pages-deploy`
   - **Expiration:** 90 days
   - **Scopes:** Check `repo` and `workflow`
4. Click **Generate token**
5. **Copy the token** (save it safely)

### Step 2: Set Git Credentials

```bash
# Configure git to use the token
git config --global credential.helper store

# Try to push (you'll be prompted for credentials)
git push origin main

# Enter your GitHub username and paste the token as password
```

### Step 3: Deploy to GitHub Pages

```bash
npx gh-pages -d dist
```

---

## Option 4: Manual Upload via GitHub Web Interface

### Step 1: Create gh-pages Branch

1. Go to: https://github.com/amineelom/ecommerce-platform
2. Click the branch dropdown (currently showing "main")
3. Type "gh-pages" and click "Create branch: gh-pages"

### Step 2: Upload Files

1. Switch to the gh-pages branch
2. Click "Add file" → "Upload files"
3. Drag and drop all files from the `dist` folder
4. Commit the changes

### Step 3: Enable GitHub Pages

1. Go to Settings → Pages
2. Select "gh-pages" as source
3. Save

---

## Verify Deployment

### Check Deployment Status

1. Go to your repository
2. Click **Deployments** tab
3. Look for "github-pages" deployment
4. It should show "Active" with a green checkmark

### Visit Your Site

```
https://amineelom.github.io/ecommerce-platform
```

---

## Troubleshooting

### Site Shows 404

**Solution:** Make sure the gh-pages branch exists and contains the built files from the `dist` folder.

```bash
# Check if gh-pages branch exists
git branch -a

# If not, create it
git checkout --orphan gh-pages
git rm -rf .
cp -r dist/* .
git add .
git commit -m "Deploy to GitHub Pages"
git push origin gh-pages
```

### Changes Not Appearing

**Solution:** GitHub Pages caches content. Try these steps:

1. Hard refresh your browser: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
2. Clear browser cache
3. Wait 2-3 minutes for deployment to complete
4. Check the Deployments tab for status

### Authentication Failed

**Solution:** Set up GitHub authentication:

```bash
# Option A: Using GitHub CLI
gh auth login

# Option B: Using Personal Access Token
git config --global credential.helper store
# Then try pushing - you'll be prompted for credentials
```

### Build Errors

**Solution:** Make sure the build was successful:

```bash
# Clean and rebuild
rm -rf dist node_modules
npm install
npm run build

# Check if dist folder was created
ls -la dist/
```

---

## After Deployment

### Update Your Repository

Once deployed, update your package.json to include the deployment command:

```json
{
  "scripts": {
    "deploy": "npm run build && npx gh-pages -d dist"
  }
}
```

Then you can deploy with:

```bash
npm run deploy
```

### Update Your README

Add a link to your live site in the README:

```markdown
## 🌐 Live Demo

Visit the live application: https://amineelom.github.io/ecommerce-platform
```

### Connect Your Backend

Update the API URL in your code:

**File:** `src/constants/index.js`

```javascript
export const API_BASE_URL = 'https://your-backend-domain.com/api';
```

Then rebuild and redeploy:

```bash
npm run build
npx gh-pages -d dist
```

---

## Automatic Deployment (Advanced)

To automatically deploy on every push to main, you would need GitHub Actions. However, due to workflow permission restrictions, you'll need to:

1. Go to your repository settings
2. Grant the GitHub App "workflows" permission
3. Then create a `.github/workflows/deploy.yml` file

For now, manual deployment works great!

---

## Support

If you encounter issues:

1. Check the [GitHub Pages documentation](https://docs.github.com/en/pages)
2. Review the [gh-pages npm package](https://www.npmjs.com/package/gh-pages)
3. Create an issue on your repository
4. Check the Deployments tab for error messages

---

## Summary

Your e-commerce platform frontend is built and ready! Choose one of the options above to deploy it to GitHub Pages. The easiest method is **Option 1: Using GitHub Web Interface**.

**Your live site will be at:** `https://amineelom.github.io/ecommerce-platform`

🚀 **Happy deploying!**
