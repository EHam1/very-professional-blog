# Deployment Guide

## Prerequisites

Before deploying, ensure you have:

1. ✅ Completed Supabase setup (see `SUPABASE_SETUP.md`)
2. ✅ Added environment variables to `.env.local` locally
3. ✅ Tested the site locally with `npm run dev`
4. ✅ Committed all changes to Git

## Deploy to Vercel (Recommended)

### Step 1: Push to GitHub

```bash
git add .
git commit -m "Initial commit - blog setup complete"
git push origin main
```

### Step 2: Import to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "Add New Project"
3. Import your GitHub repository: `EHam1/very-professional-blog`
4. Vercel will auto-detect Next.js settings

### Step 3: Configure Environment Variables

Before deploying, add your environment variables in Vercel:

1. In the import screen, click "Environment Variables"
2. Add the following variables:
   - **Name**: `NEXT_PUBLIC_SUPABASE_URL`
   - **Value**: Your Supabase project URL
   - Click "Add"
   
   - **Name**: `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **Value**: Your Supabase anon key
   - Click "Add"

### Step 4: Deploy

1. Click "Deploy"
2. Wait for the build to complete (~2-3 minutes)
3. Your site will be live at `https://your-project-name.vercel.app`

### Step 5: Configure Custom Domain (Optional)

1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your custom domain and follow DNS instructions

## Continuous Deployment

Vercel automatically redeploys your site when you push to the main branch:

```bash
# Make changes
git add .
git commit -m "Add new blog post"
git push origin main

# Vercel automatically builds and deploys!
```

## Environment Variables in Vercel

To update environment variables after deployment:

1. Go to your project in Vercel dashboard
2. Click "Settings" → "Environment Variables"
3. Add, edit, or delete variables
4. Redeploy for changes to take effect

## Testing Before Deployment

Always test locally before deploying:

```bash
# Build the production version
npm run build

# Test the production build
npm run start

# Visit http://localhost:3000 to verify
```

## Troubleshooting

### Build Fails on Vercel

**Problem**: Build fails with TypeScript errors
- **Solution**: Run `npm run build` locally and fix any errors

**Problem**: Missing environment variables
- **Solution**: Ensure all `NEXT_PUBLIC_*` variables are set in Vercel

### Analytics Not Working

**Problem**: Events not being logged to Supabase
- **Solution**: 
  1. Check environment variables are correct
  2. Verify Supabase RLS policies allow inserts
  3. Check browser console for errors

### Posts Not Showing

**Problem**: Blog posts don't appear
- **Solution**: 
  1. Ensure posts are in the `posts/` directory
  2. Check frontmatter is valid YAML
  3. Verify file extensions are `.mdx` or `.md`

## Monitoring

After deployment, monitor your site:

1. **Vercel Analytics**: Built-in performance metrics
2. **Supabase Dashboard**: Check event logs in the `events` table
3. **Browser DevTools**: Check for console errors

## Quick Deployment Checklist

- [ ] Supabase project created and table set up
- [ ] Environment variables configured locally
- [ ] Site tested locally (`npm run dev`)
- [ ] Production build tested (`npm run build`)
- [ ] Code committed to Git
- [ ] Code pushed to GitHub
- [ ] Project imported to Vercel
- [ ] Environment variables added in Vercel
- [ ] Deployment successful
- [ ] Site loads correctly at Vercel URL
- [ ] Analytics working (check Supabase)
- [ ] A/B tests assigning variants correctly

## Next Steps After Deployment

1. Write more blog posts in the `posts/` directory
2. Share your blog URL on LinkedIn/Twitter
3. Monitor analytics to see what content resonates
4. Analyze A/B test results
5. Iterate and improve based on data

---

Need help? Check the [README.md](./README.md) or [open an issue](https://github.com/EHam1/very-professional-blog/issues).

