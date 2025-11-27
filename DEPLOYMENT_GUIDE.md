# AutoBella Deployment Guide

## Part 1: Deploy to Vercel with Free Domain

### Step 1: Prepare Your Code for Deployment

1. **Create a GitHub Account** (if you don't have one):
   - Go to [github.com](https://github.com)
   - Sign up for a free account

2. **Create a New Repository**:
   - Click the **"+"** icon in the top right → **"New repository"**
   - Name it: `autobella-website`
   - Set it to **Public** (required for free Vercel hosting)
   - Click **"Create repository"**

3. **Push Your Code to GitHub**:
   - Open a terminal in your project folder
   - Run these commands:
   ```bash
   git init
   git add .
   git commit -m "Initial commit - AutoBella website"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/autobella-website.git
   git push -u origin main
   ```
   (Replace `YOUR_USERNAME` with your actual GitHub username)

### Step 2: Deploy to Vercel

1. **Create a Vercel Account**:
   - Go to [vercel.com](https://vercel.com)
   - Click **"Sign Up"**
   - Choose **"Continue with GitHub"** (easiest option)
   - Authorize Vercel to access your GitHub account

2. **Import Your Project**:
   - On the Vercel dashboard, click **"Add New..."** → **"Project"**
   - You'll see a list of your GitHub repositories
   - Find **"autobella-website"** and click **"Import"**

3. **Configure Your Project**:
   - **Framework Preset**: Should auto-detect as **Next.js** ✓
   - **Root Directory**: Leave as `./`
   - **Build Command**: Leave default (`next build`)
   - **Output Directory**: Leave default (`.next`)

4. **⚠️ CRITICAL: Add Environment Variable**:
   - Before clicking "Deploy", expand **"Environment Variables"**
   - Add this variable:
     - **Name**: `CALLMEBOT_API_KEY`
     - **Value**: `5886767` (your API key)
     - **Environment**: Select all (Production, Preview, Development)
   - Click **"Add"**

5. **Deploy**:
   - Click **"Deploy"**
   - Wait 2-3 minutes for the build to complete
   - You'll get a **free domain** like: `autobella-website.vercel.app`

### Step 3: Test Your Deployment

1. **Visit Your Live Site**:
   - Click the domain link Vercel provides
   - Test the website navigation

2. **Test WhatsApp Integration**:
   - Go to the **Booking** page
   - Fill out the form with test data
   - Click **"Submit Booking"**
   - You should:
     - Be redirected to the success page
     - Receive a WhatsApp message on **+20 1009441336**
     - See a button to share your location

3. **Test Membership Form**:
   - Go to **Memberships** → **Client Memberships**
   - Fill out the registration form
   - Submit and verify the same flow works

---

## Part 2: Connect a Custom Domain (After Purchase)

### Step 1: Purchase Your Domain

1. **Buy from GoDaddy** (or any registrar):
   - Go to [godaddy.com](https://www.godaddy.com)
   - Search for your desired domain (e.g., `autobella.com`)
   - Complete the purchase

### Step 2: Add Domain to Vercel

1. **Open Your Vercel Project**:
   - Go to [vercel.com/dashboard](https://vercel.com/dashboard)
   - Click on your **"autobella-website"** project

2. **Go to Domains Settings**:
   - Click **"Settings"** in the top menu
   - Click **"Domains"** in the left sidebar

3. **Add Your Custom Domain**:
   - In the input field, type your domain: `autobella.com`
   - Click **"Add"**
   - Vercel will show you DNS configuration instructions

### Step 3: Configure DNS in GoDaddy

Vercel will give you specific DNS records to add. Here's what you'll typically need:

1. **Log in to GoDaddy**:
   - Go to [godaddy.com](https://godaddy.com)
   - Navigate to **"My Products"** → **"Domains"**
   - Click **"DNS"** next to your domain

2. **Add DNS Records** (Vercel will show you the exact values):

   **Option A: Using A Record (Recommended)**
   - Click **"Add"** → Select **"A"** record
   - **Name**: `@`
   - **Value**: `76.76.21.21` (Vercel's IP)
   - **TTL**: `600` seconds
   - Click **"Save"**

   **Option B: Using CNAME Record**
   - Click **"Add"** → Select **"CNAME"** record
   - **Name**: `www`
   - **Value**: `cname.vercel-dns.com`
   - **TTL**: `600` seconds
   - Click **"Save"**

3. **Wait for Propagation**:
   - DNS changes can take **5 minutes to 48 hours** (usually 10-30 minutes)
   - Vercel will automatically verify and issue an SSL certificate

### Step 4: Verify Everything Works

1. **Check Domain Status in Vercel**:
   - Go back to Vercel → Settings → Domains
   - Wait until you see a **green checkmark** next to your domain
   - This means SSL is active and the domain is live

2. **Test Your Custom Domain**:
   - Visit `https://autobella.com` (or your domain)
   - Verify the website loads correctly
   - Test the booking form → WhatsApp integration
   - Test the membership form → WhatsApp integration

3. **Set as Primary Domain** (Optional):
   - In Vercel Domains settings, click the **"..."** menu next to your custom domain
   - Select **"Set as Primary"**
   - This will redirect `autobella-website.vercel.app` to your custom domain

---

## Important Notes

### WhatsApp Integration
- ✅ **Works on both free and custom domains** - No changes needed
- ✅ The `CALLMEBOT_API_KEY` environment variable is already set
- ✅ Messages will continue to go to **+20 1009441336**

### SSL Certificate
- ✅ **Automatic and Free** - Vercel provides free SSL for all domains
- ✅ Your site will be `https://` (secure) automatically

### Deployment Updates
- ✅ **Automatic** - Every time you push to GitHub, Vercel redeploys automatically
- ✅ To update your site: just push changes to GitHub

### Costs
- ✅ **Vercel Hosting**: FREE forever (Hobby plan)
- ✅ **SSL Certificate**: FREE
- ✅ **CallMeBot**: FREE (up to ~20 messages/day)
- 💰 **Domain**: Only cost is the domain registration (~$10-15/year)

---

## Troubleshooting

### "WhatsApp messages not sending"
- Check that `CALLMEBOT_API_KEY` is set in Vercel Environment Variables
- Verify the API key is `5886767`
- Redeploy the project after adding the variable

### "Domain not connecting"
- Wait 30 minutes for DNS propagation
- Double-check DNS records match Vercel's instructions exactly
- Clear your browser cache

### "Build failed on Vercel"
- Check the build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Contact me if you see errors

---

## Quick Reference Commands

### Update Your Website
```bash
# Make your changes, then:
git add .
git commit -m "Description of changes"
git push
# Vercel will auto-deploy in ~2 minutes
```

### Check Environment Variables
```bash
# In Vercel Dashboard:
Project → Settings → Environment Variables
```

---

**You're all set! 🚀**

Your website will be live with full WhatsApp functionality on both the free Vercel domain and your custom domain once configured.
