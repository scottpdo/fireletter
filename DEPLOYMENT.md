# 🚀 Deployment Guide

## Deploying to Vercel

Vercel is the recommended platform for deploying this Next.js application.

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign up or log in
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

### Environment Variables

No environment variables are required for the base game.

If you add features that require environment variables:
1. Go to your project settings in Vercel
2. Navigate to "Environment Variables"
3. Add your variables

### Custom Domain

To add a custom domain:
1. Go to your project settings in Vercel
2. Navigate to "Domains"
3. Add your domain and follow DNS instructions

### Preview Deployments

Every push to a branch creates a preview deployment:
- Main branch → Production
- Other branches → Preview URLs

## Alternative: Self-Hosting

### Using Node.js

1. Build the application:
   ```bash
   npm run build
   ```

2. Start the production server:
   ```bash
   npm start
   ```

3. The app runs on port 3000 by default

### Using Docker

Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t fireletter .
docker run -p 3000:3000 fireletter
```

### Static Export (Limited Functionality)

Note: Static export won't support some dynamic features.

```bash
# Add to next.config.js:
# output: 'export'

npm run build
# Deploy the 'out' directory to any static host
```

## Performance Optimization

### Before Deploying

1. **Optimize Images**: If using custom sprites, ensure they're optimized
2. **Compress Audio**: Use compressed audio formats (MP3, OGG)
3. **Test on Mobile**: Verify performance on target devices

### Vercel Configuration

The app automatically benefits from:
- Edge caching
- Automatic HTTPS
- Global CDN distribution
- Compression

## Monitoring

After deployment, monitor:
- Browser console for errors
- Text-to-speech compatibility across devices
- Touch interaction performance on mobile

## Troubleshooting

### Audio Not Playing
- Some browsers block autoplay - user interaction required
- Check browser console for audio errors
- Verify audio file paths

### Deployment Fails
- Check Node.js version (requires 18+)
- Verify all dependencies are in package.json
- Check build logs for specific errors

### Performance Issues
- Reduce animation complexity
- Optimize asset file sizes
- Test on target devices

---

For more help, visit [Vercel Documentation](https://vercel.com/docs)

