# Deployment Guide

This guide covers deploying Humanitarian HRMS to various platforms.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Supabase Setup](#supabase-setup)
- [Deploy to Vercel](#deploy-to-vercel)
- [Deploy with Docker](#deploy-with-docker)
- [Deploy to AWS](#deploy-to-aws)
- [Self-Hosted Deployment](#self-hosted-deployment)
- [Environment Variables](#environment-variables)
- [Custom Domain](#custom-domain)
- [Post-Deployment Checklist](#post-deployment-checklist)

---

## Prerequisites

Before deploying, ensure you have:

- A Supabase project (free tier works for demo/small teams)
- A hosting platform account (Vercel recommended)
- Node.js 18.17+ installed (for local builds)
- Git installed

---

## Supabase Setup

### 1. Create Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in
3. Click **New Project**
4. Fill in:
   - **Organization**: Create new or select existing
   - **Project name**: `ngo-hrms` (or your preference)
   - **Database password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
5. Click **Create Project** and wait ~2 minutes

### 2. Set Up Database

1. In the Supabase dashboard, go to **SQL Editor**
2. Click **New Query**
3. Copy the entire contents of `supabase/schema.sql`
4. Paste into the editor and click **Run**
5. Repeat with `supabase/seed.sql` for sample data

### 3. Get API Credentials

1. Go to **Settings → API**
2. Copy the following values:
   - **Project URL**: `https://your-ref.supabase.co`
   - **anon public key**: `eyJ...` (long string)

### 4. Configure Authentication (Optional)

1. Go to **Authentication → Providers**
2. Enable **Google** (or other providers):
   - Create OAuth credentials in [Google Cloud Console](https://console.cloud.google.com)
   - Add the redirect URL from Supabase
   - Paste Client ID and Secret into Supabase

---

## Deploy to Vercel

### Option A: GitHub Integration (Recommended)

1. Push your code to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/your-username/ngo-hrms.git
   git push -u origin main
   ```

2. Go to [vercel.com](https://vercel.com)
3. Sign in with GitHub
4. Click **New Project**
5. Import your `ngo-hrms` repository
6. Configure:
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (default)
7. Add Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your anon key
8. Click **Deploy**

Vercel will build and deploy automatically. Future pushes to `main` trigger auto-deployment.

### Option B: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy (follow prompts)
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY

# Deploy to production
vercel --prod
```

---

## Deploy with Docker

### Build Image

```bash
# Create Dockerfile (see below)
docker build -t ngo-hrms:latest .
```

### Dockerfile

```dockerfile
# Stage 1: Dependencies
FROM node:18-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:18-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
CMD ["node", "server.js"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  ngo-hrms:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_SUPABASE_URL=${NEXT_PUBLIC_SUPABASE_URL}
      - NEXT_PUBLIC_SUPABASE_ANON_KEY=${NEXT_PUBLIC_SUPABASE_ANON_KEY}
    restart: unless-stopped
```

```bash
# Run with Docker Compose
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

---

## Deploy to AWS

### Using AWS Amplify

1. Go to AWS Amplify Console
2. Click **New App → Host web app**
3. Connect your GitHub repository
4. Configure build settings:
   ```yaml
   # amplify.yml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```
5. Add environment variables
6. Deploy

### Using EC2

```bash
# SSH into your EC2 instance
ssh -i your-key.pem ec2-user@your-instance-ip

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Clone repository
git clone https://github.com/your-username/ngo-hrms.git
cd ngo-hrms

# Install and build
npm ci
npm run build

# Start with PM2
sudo npm install -g pm2
pm2 start npm --name "ngo-hrms" -- start
pm2 save
pm2 startup
```

---

## Self-Hosted Deployment

### System Requirements

- **OS**: Ubuntu 20.04+ / Debian 11+ / CentOS 8+
- **RAM**: 2GB minimum, 4GB recommended
- **Storage**: 20GB minimum
- **Node.js**: 18.17+

### Installation Steps

```bash
# 1. Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# 2. Clone the repository
git clone https://github.com/your-username/ngo-hrms.git
cd ngo-hrms

# 3. Install dependencies
npm ci

# 4. Set up environment
cp .env.example .env.local
# Edit .env.local with your Supabase credentials
nano .env.local

# 5. Build for production
npm run build

# 6. Start the server
npm start
```

### Using Nginx as Reverse Proxy

```nginx
# /etc/nginx/sites-available/ngo-hrms
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable the site
sudo ln -s /etc/nginx/sites-available/ngo-hrms /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d your-domain.com

# Auto-renewal is set up automatically
sudo certbot renew --dry-run
```

---

## Environment Variables

| Variable | Required | Description | Example |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL | `https://abc.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | No | Admin key (server only) | `eyJhbGciOi...` |

### Setting Variables by Platform

**Vercel:**
- Dashboard → Project → Settings → Environment Variables
- Or CLI: `vercel env add VARIABLE_NAME`

**Docker:**
- `.env` file or `docker-compose.yml` environment section

**AWS:**
- Amplify: App → Environment Variables
- EC2: `.env` file or systemd service file

---

## Custom Domain

### Vercel

1. Go to Project → Settings → Domains
2. Add your domain
3. Configure DNS:
   - Type: `CNAME`
   - Name: `www` (or `@`)
   - Value: `cname.vercel-dns.com`

### Other Platforms

1. Point your domain's DNS A record to your server IP
2. Configure SSL (see Let's Encrypt section above)
3. Update `NEXT_PUBLIC_APP_URL` environment variable

---

## Post-Deployment Checklist

After deploying, verify:

- [ ] **Homepage loads** — Dashboard displays correctly
- [ ] **Navigation works** — All sidebar links functional
- [ ] **Search works** — Staff search returns results
- [ ] **Filters work** — Status and department filters
- [ ] **Charts render** — All visualizations display
- [ ] **Mobile responsive** — Test on phone/tablet
- [ ] **SSL active** — HTTPS works with valid certificate
- [ ] **Environment variables set** — Supabase connection works
- [ ] **Database connected** — Data loads from Supabase (if connected)
- [ ] **Auth works** — Login/signup flow functional (if configured)

---

## Monitoring

### Health Check Endpoint

Create a simple health check:

```typescript
// src/app/api/health/route.ts
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString() 
  })
}
```

### Uptime Monitoring

Use a service like:
- [UptimeRobot](https://uptimerobot.com) (free tier)
- [Pingdom](https://pingdom.com)
- [Better Uptime](https://betteruptime.com)

Monitor: `https://your-domain.com/api/health`

---

## Troubleshooting

### Build Failures

```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm ci
npm run build
```

### Database Connection Issues

1. Verify Supabase URL and key in environment variables
2. Check Supabase project is active (not paused)
3. Verify RLS policies allow your requests
4. Check Supabase dashboard for error logs

### Performance Issues

1. Enable caching in Next.js config
2. Use Supabase connection pooling for high traffic
3. Consider CDN for static assets
4. Monitor with Vercel Analytics or similar

---

## Rollback

### Vercel
- Go to Deployments → find previous deployment → Promote to Production

### Docker
```bash
docker-compose down
docker-compose up -d --build
```

### Manual
```bash
git revert HEAD
npm run build
# Restart your process manager
pm2 restart ngo-hrms
```

---

For additional help, see the [main README](../README.md) or open an issue on GitHub.