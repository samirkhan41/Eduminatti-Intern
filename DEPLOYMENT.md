# 🚀 EDUMINATTI — Production Deployment Guide

This guide details step-by-step instructions to deploy the full-stack **EDUMINATTI** platform to production for free.

---

## 📋 Architecture & Prerequisites

- **Frontend**: React 18 (Vite SPA)
- **Backend**: Node.js & Express.js REST API
- **Database**: MongoDB Atlas Cluster (already configured and live)
- **Git Repository**: GitHub repository with the latest code

---

## 🌟 Method 1: Split Deployment (Recommended)
> **Frontend on Vercel + Backend on Render**
> Best performance: Frontend gets global CDN caching and instantaneous loading, while backend runs on an isolated API container.

### Step 1: Push Code to GitHub
If you haven't pushed to GitHub yet:
```bash
git remote add origin https://github.com/<YOUR_GITHUB_USERNAME>/<YOUR_REPO_NAME>.git
git branch -M main
git push -u origin main
```

---

### Step 2: Deploy Backend on Render (Free)
1. Go to [Render Dashboard](https://dashboard.render.com/) and sign in with GitHub.
2. Click **New +** -> **Web Service**.
3. Select your GitHub repository.
4. Fill in the service configuration:
   - **Name**: `eduminatti-api`
   - **Region**: Oregon (US West) or closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Instance Type**: `Free`
5. Click **Advanced** -> **Add Environment Variable**:
   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | `mongodb+srv://samirkha4575_db_user:fnrp7nvhytCSgqGi@cluster0.1h37ztk.mongodb.net/eduminatti?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `eduminatti_super_secret_jwt_key_2025_prod_ready` |
   | `CLIENT_URL` | `*` |
6. Click **Create Web Service**.
7. Once deployed, copy your backend URL (e.g. `https://eduminatti-api.onrender.com`).
8. *(Optional)* Seed initial data: In the Render dashboard, open the **Shell** tab and run:
   ```bash
   node utils/seedData.js
   ```

---

### Step 3: Deploy Frontend on Vercel (Free)
1. Go to [Vercel](https://vercel.com/) and sign in with GitHub.
2. Click **Add New...** -> **Project**.
3. Select your `eduminatti` repository and click **Import**.
4. In the Project Configuration:
   - **Framework Preset**: `Vite`
   - **Root Directory**: Click edit and select `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Expand **Environment Variables** and add:
   | Key | Value |
   | --- | --- |
   | `VITE_API_URL` | `https://eduminatti-api.onrender.com/api` *(Replace with your Render URL from Step 2 + `/api`)* |
6. Click **Deploy**.
7. Your app is live! Vercel handles SSL, global CDN, and client-side routing automatically with the included `frontend/vercel.json`.

---

## ⚡ Method 2: Single Full-Stack Web Service on Render
> Deploy both Frontend and Backend on one single Render URL with zero CORS configuration!

1. Go to [Render Dashboard](https://dashboard.render.com/) -> **New +** -> **Web Service**.
2. Connect your GitHub repository.
3. Configure the service:
   - **Name**: `eduminatti-fullstack`
   - **Root Directory**: *(leave blank — repository root)*
   - **Runtime**: `Node`
   - **Build Command**: `npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`
4. Add Environment Variables:
   | Key | Value |
   | --- | --- |
   | `NODE_ENV` | `production` |
   | `MONGODB_URI` | `mongodb+srv://samirkha4575_db_user:fnrp7nvhytCSgqGi@cluster0.1h37ztk.mongodb.net/eduminatti?retryWrites=true&w=majority` |
   | `JWT_SECRET` | `eduminatti_super_secret_jwt_key_2025_prod_ready` |
5. Click **Create Web Service**. The root build script builds `frontend/dist`, and Express automatically serves both the API and the React frontend on a single domain.

---

## 🐳 Method 3: Railway / Docker Deployment
We have provided a production-ready multi-stage `Dockerfile`:
```bash
# Build Docker image
docker build -t eduminatti .

# Run container locally or on a cloud VPS (DigitalOcean / AWS / GCP)
docker run -d \
  -p 5001:5001 \
  -e NODE_ENV=production \
  -e MONGODB_URI="mongodb+srv://samirkha4575_db_user:fnrp7nvhytCSgqGi@cluster0.1h37ztk.mongodb.net/eduminatti?retryWrites=true&w=majority" \
  -e JWT_SECRET="eduminatti_super_secret_jwt_key_2025_prod_ready" \
  --name eduminatti-app \
  eduminatti
```
On **Railway** (https://railway.app):
1. Click **New Project** -> **Deploy from GitHub repo**.
2. Add the environment variables (`MONGODB_URI`, `JWT_SECRET`, `NODE_ENV=production`).
3. Railway automatically detects the Dockerfile and deploys!

---

## 🛡️ Production Verification Checklist
- [x] MongoDB Atlas connection verified and active
- [x] Initial seed data loaded (10 premier boarding schools, admin & parent accounts)
- [x] SPA routing fallback configured (`vercel.json` rewrites & Express `*` fallback)
- [x] Sensitive credentials excluded from Git via `.gitignore`
- [x] Health check endpoint active at `/api/health`
- [x] Production build passes cleanly with zero errors
