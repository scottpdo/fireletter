# PWA Setup Guide

The app is now configured as a Progressive Web App (PWA) that will hide the browser URL bar when added to the home screen on Android and iOS devices.

## What's Been Configured

✅ **Manifest file** (`/public/manifest.json`) with:
- `display: "standalone"` - Hides browser UI
- `orientation: "landscape"` - Locks to horizontal mode
- Theme colors matching the game design
- App name and description

✅ **Meta tags** in the HTML head for:
- Android Chrome
- iOS Safari
- Theme colors
- Status bar styling

## Required: Add App Icons

You need to create two icon files and place them in the `/public/` directory:

### Icon Files Needed

1. **`icon-192.png`** - 192x192 pixels
2. **`icon-512.png`** - 512x512 pixels

### Icon Design Recommendations

- Use a fire truck 🚒 or firefighter theme
- Simple, recognizable design
- High contrast colors
- Works well at small sizes
- Square with rounded corners optional

### Creating Icons

**Option 1: Use an emoji-based icon**
1. Visit [favicon.io](https://favicon.io/emoji-favicons/fire-engine/)
2. Search for "fire truck" or use 🚒 emoji
3. Download and rename to `icon-192.png` and `icon-512.png`

**Option 2: Create custom icons**
1. Use [Canva](https://www.canva.com/) or similar tool
2. Create 512x512px square image
3. Use fire truck/firefighter theme with "FireLetter" text
4. Export as PNG
5. Resize to 192x192 for the smaller version

**Option 3: Use a design tool**
- Figma, Sketch, or Photoshop
- Export in both sizes

### Quick Placeholder

For testing, you can temporarily use any 192x192 and 512x512 PNG images named accordingly.

## Testing the PWA

### On Android (Chrome)
1. Open the app in Chrome
2. Tap the menu (⋮) 
3. Select "Add to Home Screen"
4. Tap "Add"
5. Launch from home screen - URL bar should be hidden!

### On iOS (Safari)
1. Open the app in Safari
2. Tap the Share button
3. Scroll and tap "Add to Home Screen"
4. Tap "Add"
5. Launch from home screen - runs in fullscreen!

## PWA Features

Once icons are added, users will get:
- ✅ Full-screen experience (no browser UI)
- ✅ Landscape orientation lock
- ✅ App icon on home screen
- ✅ Splash screen (auto-generated from manifest)
- ✅ Native-like experience

## Verification

After adding icons, you can verify PWA setup:

1. **Chrome DevTools**:
   - Open DevTools (F12)
   - Go to "Application" tab
   - Check "Manifest" section
   - Verify icons are loaded

2. **Lighthouse**:
   - Run Lighthouse audit
   - Check PWA score
   - Should pass all PWA requirements

## Optional: Service Worker

For offline functionality and caching, you can add a service worker. This is optional but recommended for production:

```javascript
// public/sw.js
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open('fireletter-v1').then((cache) => {
      return cache.addAll([
        '/',
        '/audio/welcome.wav',
        // Add other audio files
      ])
    })
  )
})
```

Then register it in your layout or a component.

## Troubleshooting

**"Add to Home Screen" not appearing?**
- Ensure you're using HTTPS (required for PWA)
- Check that manifest.json is accessible at `/manifest.json`
- Verify icons exist and are the correct size
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Icons not showing?**
- Check file names match manifest.json exactly
- Verify files are in `/public/` directory
- Clear browser cache
- Check file format is PNG

**Still shows URL bar?**
- Verify `display: "standalone"` in manifest
- Close and reopen the PWA from home screen
- Reinstall by removing and re-adding to home screen

---

Once you add the icon files, the app will be fully PWA-ready! 🚒

