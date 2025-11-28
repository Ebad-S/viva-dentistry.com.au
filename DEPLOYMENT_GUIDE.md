# 🚀 Deployment Guide for Coolify

## 🔍 Color Scheme Issue Analysis

### Root Cause Identified
The color scheme reverting to "first iteration" on Vercel is likely due to:

1. **CSS Build Caching**: Tailwind CSS purging may not be working correctly in production
2. **Environment Variables**: Missing `NODE_ENV=production` or other build-time variables
3. **CSS Order**: Potential CSS loading order issues in production builds

### ✅ Fixes Applied

1. **Enhanced Next.js Config**: Added `output: 'standalone'` and CSS optimization
2. **Webpack Configuration**: Proper CSS chunking and cache busting
3. **Environment Variables**: Comprehensive `.env.example` template
4. **Docker Configuration**: Production-ready containerization

## 🐳 Docker Deployment Setup

### Files Created:
- `Dockerfile` - Multi-stage build for optimal production image
- `docker-compose.yml` - Service orchestration with environment variables
- `.dockerignore` - Exclude unnecessary files from build context
- `src/app/api/health/route.ts` - Health check endpoint

## 🔧 Environment Variables Setup

### Required Variables for Production:

```env
# Email Service
RESEND_API_KEY=re_your_actual_resend_api_key_here

# reCAPTCHA (Client-side visible)
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key_here

# reCAPTCHA (Server-side only)
RECAPTCHA_SECRET_KEY=your_secret_key_here
RECAPTCHA_PROJECT_ID=your_project_id
RECAPTCHA_API_KEY=your_api_key

# Build Environment
NODE_ENV=production
```

### ⚠️ Critical Notes:
- `NEXT_PUBLIC_*` variables are embedded in the client bundle
- Server-side variables remain secure and are not exposed to browsers
- Missing `NODE_ENV=production` can cause styling issues

## 🚀 Coolify Deployment Steps

### 1. Repository Setup
```bash
# Ensure all files are committed
git add .
git commit -m "Add Docker and deployment configuration"
git push origin main
```

### 2. Coolify Configuration

#### A. Create New Service
1. Go to your Coolify dashboard
2. Click "New Service" → "Docker Compose"
3. Connect your Git repository

#### B. Environment Variables
Add these in Coolify's environment section:
```env
RESEND_API_KEY=your_resend_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key
RECAPTCHA_PROJECT_ID=your_project_id
RECAPTCHA_API_KEY=your_api_key
NODE_ENV=production
```

#### C. Build Configuration
- **Build Command**: `npm run build`
- **Start Command**: `npm start`
- **Port**: `3000`
- **Health Check**: `/api/health`

### 3. Domain Setup
1. Configure your domain in Coolify
2. Enable SSL/TLS certificates
3. Set up proper DNS records

## 🔧 Troubleshooting Color Scheme Issues

### If Colors Still Revert:

#### 1. Clear Build Cache
```bash
# In Coolify, trigger a fresh build
# Or manually clear cache:
rm -rf .next
npm run build
```

#### 2. Verify CSS Loading
Check browser DevTools:
- Ensure `globals.css` is loaded
- Verify Tailwind classes are applied
- Check for CSS conflicts

#### 3. Environment Variable Check
```bash
# Verify in production container:
docker exec -it container_name env | grep NODE_ENV
```

#### 4. Force CSS Regeneration
```bash
# Clear Tailwind cache
npx tailwindcss build -i ./src/styles/globals.css -o ./dist/output.css --watch
```

## 📊 Monitoring & Health Checks

### Health Check Endpoint
- **URL**: `https://yourdomain.com/api/health`
- **Response**: 
```json
{
  "status": "healthy",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "version": "1.0.0"
}
```

### Performance Monitoring
- Monitor build times in Coolify logs
- Check CSS bundle sizes
- Verify image optimization

## 🔒 Security Considerations

### Environment Variables:
- ✅ Server-side variables are secure
- ✅ Client-side variables are properly prefixed
- ✅ No sensitive data in client bundle

### Docker Security:
- ✅ Non-root user in container
- ✅ Minimal attack surface
- ✅ Health checks enabled

## 🚀 Performance Optimizations

### Applied Optimizations:
1. **Multi-stage Docker build** - Smaller production image
2. **CSS chunking** - Better caching and loading
3. **Static file optimization** - Proper caching headers
4. **Bundle splitting** - Faster page loads

### Expected Results:
- ✅ Consistent color scheme across environments
- ✅ Faster build times
- ✅ Better caching
- ✅ Improved SEO scores

## 📞 Support

If you encounter issues:
1. Check Coolify deployment logs
2. Verify environment variables are set
3. Test health check endpoint
4. Compare with local development build

The deployment is now optimized for production with proper CSS handling and environment variable management! 🎉
