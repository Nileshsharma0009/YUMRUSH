# 🚀 YumRush - Quick Start Guide

## ⚡ Get Started in 2 Minutes

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Code editor (VS Code recommended)

---

## 🎯 Step 1: Install Dependencies

```bash
cd frontend
npm install
```

**What happens:**
- Downloads all required packages (React, Vite, GSAP, etc.)
- Creates `node_modules` folder
- Ready for development!

**Time**: ~1-2 minutes

---

## 🎨 Step 2: Start Development Server

```bash
npm run dev
```

**Output:**
```
  VITE v4.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

**What to do:**
- Open `http://localhost:5173/` in your browser
- You should see the YumRush landing page
- It auto-refreshes when you save files

**Time**: ~5 seconds

---

## 🎬 Step 3: Explore the Frontend

### What You'll See
```
┌─────────────────────────────────┐
│        NAVBAR                   │  ← Sticky header
│  YumRush  | Shop Features...    │
├─────────────────────────────────┤
│                                 │
│     HERO SECTION                │  ← Animated intro
│   • Title: "YumRush"            │
│   • Subtitle & CTA buttons      │
│   • 3 stat cards                │
│   • Floating visual elements    │
│                                 │
├─────────────────────────────────┤
│    FEATURED MENU SECTION        │  ← Grid of items
│   ┌────────┐ ┌────────┐         │
│   │ Butter │ │ Paneer │ ...     │
│   │Chicken │ │ Tikka  │         │
│   └────────┘ └────────┘         │
│                                 │
├─────────────────────────────────┤
│        FOOTER                   │  ← Links & info
│   YumRush  | Quick Links | ... │
└─────────────────────────────────┘
```

### Key Features Visible
- ✅ Smooth animations on scroll
- ✅ Hover effects on buttons and cards
- ✅ Responsive layout (resize to test)
- ✅ White background, orange accents
- ✅ Professional, clean design

---

## 📁 File Structure (Key Files)

```
frontend/
├── src/
│   ├── App.jsx              ← Main component (Navbar + Home + Footer)
│   ├── index.jsx            ← Entry point
│   │
│   ├── pages/Home/
│   │   ├── Home.jsx         ← Home page
│   │   ├── HeroSection.jsx  ← Hero banner
│   │   ├── FeaturedMenu.jsx ← Menu grid
│   │   └── home.css         ← ALL ANIMATIONS HERE
│   │
│   ├── components/
│   │   ├── common/          ← Reusable components (Button, Card, Modal, Loader)
│   │   └── layout/          ← Layout (Navbar, Footer, MainLayout)
│   │
│   └── styles.css/          ← Global styles
│
└── package.json             ← Dependencies config
```

---

## 🎓 Try These First

### 1. Change a Color
```bash
# Open: frontend/src/styles.css/global.css
# Find: --primary-color
# Or change #ff6b00 to any hex color
# Save (auto-refreshes!)
```

### 2. Modify Hero Title
```bash
# Open: frontend/src/pages/Home/HeroSection.jsx
# Change: <h1 className="hero-title">YumRush</h1>
# To: <h1 className="hero-title">Your Restaurant Name</h1>
# Save (auto-refreshes!)
```

### 3. Add a Button
```jsx
// Open: frontend/src/pages/Home/HeroSection.jsx
// In JSX, add:
<Button variant="primary" size="lg">
  Try This!
</Button>

// Save and see it appear!
```

### 4. Change Animation Speed
```bash
# Open: frontend/src/pages/Home/home.css
# Find: @keyframes fadeInUp
# Change: animation-duration from 0.8s to 2s
# Save and watch it slow down!
```

---

## 🎯 Common Tasks

### View Mobile Version
```
Press F12 to open DevTools
Click device toggle icon (⌨️ Ctrl+Shift+M)
See how it adapts!
```

### Edit Navbar Items
```bash
# File: frontend/src/components/layout/Navbar.jsx
# Find: <li className="nav-item">Shop</li>
# Change items as needed
```

### Add New Page
```bash
1. Create folder: src/pages/NewPage/
2. Create file: NewPage.jsx
3. Import in App.jsx:
   import NewPage from "./pages/NewPage/NewPage"
4. Add to navbar or routes
5. Save and test!
```

---

## 🔧 Command Reference

```bash
# Start development
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests (when configured)
npm test

# Format code (when configured)
npm run format

# Lint code (when configured)
npm run lint
```

---

## 📖 Documentation Files

Read these to learn more:

1. **QUICK_REFERENCE.md** - Copy-paste code snippets
2. **FRONTEND_DEVELOPMENT_GUIDE.md** - Deep dive documentation
3. **BUILD_SUMMARY.md** - What's been built
4. **DEVELOPMENT_CHECKLIST.md** - Next features to build
5. **VISUAL_ARCHITECTURE_GUIDE.md** - Design specifications

---

## 🐛 Troubleshooting

### "npm command not found"
```bash
# Install Node.js from nodejs.org
# Then retry: npm install
```

### Port 5173 already in use
```bash
# Vite will automatically use next port (5174, 5175...)
# Or kill the process using that port
```

### Styles not applying
```bash
# Make sure CSS is imported:
# In src/index.jsx:
import "./styles.css/global.css";
import "./components/common/common.css";
```

### Changes not showing
```bash
# 1. Hard refresh: Ctrl+Shift+R
# 2. Clear node_modules: rm -rf node_modules && npm install
# 3. Check browser console for errors: F12
```

---

## 🎨 Customization Quick Start

### Change Primary Color
```css
/* File: src/styles.css/global.css */
/* Or search and replace all #ff6b00 */

Old: #ff6b00
New: #your-color-hex
```

### Change Font Family
```css
/* File: src/styles.css/global.css */

body {
  font-family: 'Your Font Name', sans-serif;
}
```

### Change Spacing
```css
/* File: src/styles.css/global.css */

Increase padding from 48px to 60px
Increase gaps from 40px to 50px
Edit individual breakpoints
```

### Adjust Animation Speed
```css
/* File: src/pages/Home/home.css */

.hero-title {
  animation: fadeInDown 0.8s ease-out 0.1s both;
  /* Change 0.8s to 0.5s for faster */
  /* Change 0.1s to 0.3s for more delay */
}
```

---

## 🚀 Next Steps

### Week 1
- [ ] Customize colors and branding
- [ ] Edit content (Hero title, Featured items)
- [ ] Add your restaurant info
- [ ] Test on mobile

### Week 2
- [ ] Create Menu page
- [ ] Create Booking page
- [ ] Create About page
- [ ] Create Contact page

### Week 3
- [ ] Setup backend API
- [ ] Connect cart functionality
- [ ] Implement filtering
- [ ] Add search

### Week 4
- [ ] Admin panel
- [ ] User authentication
- [ ] Payment integration
- [ ] Deploy to server

---

## 💡 Pro Tips

1. **Use DevTools**: F12 to inspect, debug, test responsive
2. **Check Console**: Any errors show in DevTools console
3. **Auto-refresh**: Edit → Save → Browser refreshes automatically
4. **Component Reuse**: Copy-paste components to save time
5. **Mobile First**: Design mobile, then enhance for desktop
6. **Test Animations**: Slow down in DevTools for testing
7. **Use Comments**: Add comments in code for clarity
8. **Git Commits**: Commit after each feature
9. **Keep Backup**: Backup important changes
10. **Read Documentation**: QUICK_REFERENCE.md has code snippets

---

## 📞 Getting Help

### Check Documentation First
- FRONTEND_DEVELOPMENT_GUIDE.md (complete reference)
- QUICK_REFERENCE.md (code snippets)

### Common Issues
- Check browser console (F12) for errors
- Verify file paths in imports
- Ensure CSS files are imported
- Clear browser cache (Ctrl+Shift+Del)

### Debug Mode
```bash
# Run with verbose logging
npm run dev -- --debug

# Build with source maps
npm run build -- --sourcemap
```

---

## ✅ Checklist - You're Ready When:

- [ ] `npm install` completed successfully
- [ ] `npm run dev` runs without errors
- [ ] Landing page loads in browser
- [ ] You can see hero section and menu cards
- [ ] Animations are smooth
- [ ] Page is responsive (resize browser)
- [ ] You can edit and save files
- [ ] Changes auto-refresh in browser

---

## 🎉 You're All Set!

Everything is configured and ready to use. Start building features, don't worry about setup!

**Time to first page load**: ~2 seconds  
**Ready for development**: ✅ Yes!  
**Time to add a feature**: ~5 minutes  

Happy coding! 🚀

---

**Version**: 1.0.0  
**Last Updated**: January 2026  
**Status**: ✅ Ready to Use
