# Deployment Guide

## Prerequisites

This project requires **Node.js >= 18.17.0**.

### Check Your Node Version

```bash
node --version
```

If you have Node.js 14.x, you'll need to upgrade.

### Upgrade Node.js

**Option 1: Using nvm (Recommended)**

```bash
# Install nvm from https://github.com/nvm-sh/nvm (Linux/Mac)
# or https://github.com/coreybutler/nvm-windows (Windows)

# Install and use Node 18
nvm install 18
nvm use 18
```

**Option 2: Direct Download**

Download Node.js 18 LTS from [nodejs.org](https://nodejs.org/)

## Local Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Visit http://localhost:3000

## Production Build

```bash
# Build the application
npm run build

# Start production server
npm start
```

## Deploy to Vercel (1-Click)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Click the button above or go to [vercel.com](https://vercel.com)
2. Import your Git repository
3. Vercel will automatically detect Next.js
4. Click "Deploy"

**Environment Variables**: None required (all data is mock)

## Deploy to Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

Or use the Netlify UI:
1. Connect your Git repository
2. Build command: `npm run build`
3. Publish directory: `.next`
4. Click "Deploy"

## Deploy to Other Platforms

### Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up
```

### Render

1. Create a new Web Service
2. Connect your Git repository
3. Build command: `npm run build`
4. Start command: `npm start`
5. Deploy

### AWS Amplify

1. Connect your Git repository
2. Build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Deploy

## Docker Deployment

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

CMD ["node", "server.js"]
```

Build and run:

```bash
docker build -t metrics-hub .
docker run -p 3000:3000 metrics-hub
```

## Performance Optimization

### Vercel (Automatic)

Vercel automatically optimizes:
- Edge caching
- Image optimization
- Compression
- CDN distribution

### Self-Hosted

Add these to your server config:

**Nginx**:

```nginx
server {
    listen 80;
    server_name yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # Enable gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
}
```

## Troubleshooting

### Build Fails

**Error**: "Node.js version >= v18.17.0 is required"

**Solution**: Upgrade Node.js to version 18 or higher

```bash
nvm install 18
nvm use 18
```

### Missing Dependencies

**Error**: "Cannot find module..."

**Solution**: Clear node_modules and reinstall

```bash
rm -rf node_modules package-lock.json
npm install
```

### Memory Issues

**Error**: "JavaScript heap out of memory"

**Solution**: Increase Node.js memory limit

```bash
export NODE_OPTIONS="--max-old-space-size=4096"
npm run build
```

### Port Already in Use

**Error**: "Port 3000 is already in use"

**Solution**: Use a different port

```bash
PORT=3001 npm run dev
```

## Custom Domain

### Vercel

1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed
4. Vercel handles SSL automatically

### Netlify

1. Go to Domain Settings
2. Add custom domain
3. Update DNS records
4. SSL is automatic

## Monitoring

### Vercel Analytics (Free)

Add to `next.config.js`:

```javascript
module.exports = {
  // ... other config
  experimental: {
    webVitalsAttribution: ['CLS', 'LCP'],
  },
}
```

### Google Analytics

Add to `app/layout.tsx`:

```typescript
import Script from 'next/script'

// Add inside <head>
<Script
  src={`https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID`}
  strategy="afterInteractive"
/>
```

## Environment Variables

This demo doesn't require any environment variables, but for production with real data:

```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.yourapp.com
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
```

## Security

1. Keep dependencies updated: `npm audit fix`
2. Use HTTPS in production
3. Set security headers in `next.config.js`
4. Enable CORS protection
5. Rate limit API routes

## Support

Need help deploying?

- Next.js Docs: [nextjs.org/docs/deployment](https://nextjs.org/docs/deployment)
- Vercel Support: [vercel.com/support](https://vercel.com/support)
- Contact: roberto@mazzotta.dev
