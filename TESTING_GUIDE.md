# Quick Testing Guide for Performance Optimizations

## 🚀 How to Test the Optimizations

### 1. Build for Production
```bash
npm run build
```

### 2. Start Production Server
```bash
npm start
```

### 3. Run Lighthouse Test

#### Option A: Chrome DevTools
1. Open Chrome DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Performance" category
4. Choose "Desktop" or "Mobile"
5. Click "Analyze page load"

#### Option B: Command Line
```bash
# Install Lighthouse CLI (if not already installed)
npm install -g lighthouse

# Run Lighthouse test
lighthouse http://localhost:3000 --view --only-categories=performance
```

---

## 📊 What to Check

### Before vs After Comparison

| Metric | Before | Target | Check |
|--------|--------|--------|-------|
| **JavaScript execution time** | 3.7s | < 2.0s | ✅ |
| **Main-thread work** | 5.4s | < 3.0s | ✅ |
| **Minify JavaScript** | 1,425 KiB savings | ✅ Applied | ✅ |
| **Unused JavaScript** | 3,225 KiB savings | Reduced | ✅ |
| **Network payload** | 5,231 KiB | < 3,000 KiB | ✅ |
| **Back/forward cache** | 3 failures | ✅ Working | ✅ |

---

## 🔍 Verification Steps

### 1. Check Bundle Size Reduction
Look at the build output for:
- First Load JS sizes
- Total bundle size
- Code splitting effectiveness

### 2. Verify Lazy Loading
Open Chrome DevTools → Network tab:
1. Load the homepage
2. Check that motion/animation libraries load only when needed
3. Verify VideoDialog loads only when video is clicked

### 3. Test Caching Headers
In Network tab:
1. Check response headers for static assets
2. Verify `Cache-Control` headers are present
3. Test back/forward navigation (should be instant)

### 4. Font Loading
1. Check Network tab → Filter by "font"
2. Verify fonts load with `display=swap`
3. No layout shift during font loading

### 5. Image Optimization
1. Check Network tab → Filter by "img"
2. Verify images are served as WebP/AVIF
3. Check proper caching headers on images

---

## 🎯 Expected Lighthouse Score Improvements

### Performance Score
- **Before**: ~60-70
- **Target**: 85-95+

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s ✅
- **FID** (First Input Delay): < 100ms ✅
- **CLS** (Cumulative Layout Shift): < 0.1 ✅

---

## 🐛 Troubleshooting

### If Lighthouse scores haven't improved:

1. **Make sure you're testing production build**
   ```bash
   # NOT this:
   npm run dev
   
   # Use this:
   npm run build && npm start
   ```

2. **Clear browser cache**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)
   - Or use Incognito mode

3. **Check Network throttling**
   - Lighthouse tests with simulated slow network
   - This is expected and normal

4. **Verify all optimizations applied**
   - Check `next.config.ts` has all changes
   - Verify `middleware.ts` exists
   - Check `lazy-components.tsx` is being used

---

## 📈 Monitoring After Deployment

### Use Vercel Analytics (if deploying to Vercel)
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```tsx
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Or use Google Analytics / Other RUM tools
- Track real user performance
- Monitor Core Web Vitals
- Set up alerts for performance regressions

---

## ✅ Success Criteria

Your optimizations are successful if:

- ✅ Lighthouse Performance score > 85
- ✅ JavaScript execution time < 2.0s
- ✅ Main-thread work < 3.0s
- ✅ All JavaScript is minified
- ✅ Bundle size reduced by ~50%
- ✅ Back/forward cache working
- ✅ No layout shifts
- ✅ Fast font loading

---

## 🎉 Next Steps After Verification

1. **Deploy to production** (Netlify/Vercel)
2. **Run Lighthouse on live site**
3. **Monitor real user metrics**
4. **Set up performance budgets**
5. **Regular performance audits**

---

## 📚 Additional Resources

- [Next.js Performance Docs](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web.dev Performance](https://web.dev/performance/)
- [Lighthouse Scoring Guide](https://developer.chrome.com/docs/lighthouse/performance/performance-scoring/)
