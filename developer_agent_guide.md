# Developer Agent Blueprint: Building Web Presentation Sites with React, Vite & GitHub Pages

This guide outlines the exact technology stack, design system, component architecture, and deployment pipeline used in this project so another AI developer agent or developer can replicate this style for new projects.

---

## 1. Technology Stack Summary

| Layer | Technology | Purpose / Details |
|---|---|---|
| **Core Language** | **TypeScript** (`.ts`, `.tsx`) | Type-safe code, props interfaces, and state typing |
| **UI Framework** | **React 18** | Functional components with Hooks (`useState`, `useRef`, `useEffect`, `useContext`) |
| **Build Tool & Bundler** | **Vite 6** | Lightning-fast HMR, ES modules, fast bundling |
| **Styling** | **Tailwind CSS v3** + **Vanilla CSS** | Utility-first layout combined with custom glassmorphic & scroll-snap CSS rules |
| **Icons** | **Lucide React** (`lucide-react`) | Clean, modern vector icon set |
| **Animations** | **Framer Motion** (`framer-motion`) | Micro-interactions, slide fade/scale transitions, layout animations |
| **Hosting & Deployment**| **GitHub Pages** (`gh-pages`) | Static deployment hosting built directly from `dist/` |

---

## 2. Project Architecture Blueprint

```
project-root/
├── public/                 # Static public assets (images, favicon, etc.)
├── src/
│   ├── components/         # Global UI & layout components
│   │   ├── Navigation.tsx  # Header/Progress bar & slide navigation
│   │   └── SlideWrapper.tsx# Animation wrapper for individual slides
│   ├── hooks/
│   │   └── useSlideNavigation.ts # Scroll-snap & slide tracking hook
│   ├── sections/           # Fullscreen slide section components
│   │   ├── HeroSection.tsx
│   │   ├── WorkingPrincipleSection.tsx
│   │   └── ...
│   ├── i18n.tsx            # Bilingual (EN/AR) context provider & dictionary
│   ├── index.css           # Global reset, glassmorphism, scroll-snap CSS
│   ├── App.tsx             # Main container assembling slides & navigation
│   ├── main.tsx            # React root entrypoint
│   └── vite-env.d.ts
├── index.html              # HTML entrypoint with web fonts (Inter, Cairo)
├── tailwind.config.js      # Custom theme colors, keyframes, font families
├── vite.config.ts          # Vite configuration (base path for gh-pages)
└── package.json            # Scripts & dependencies
```

---

## 3. Design System & CSS Recipe

### A. Core Color Palette & Theme Tokens
Configure these custom tokens inside `tailwind.config.js`:

```javascript
// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0A1628', // Deep background
          800: '#0F2035', // Dark card surface
          700: '#1E3A5F', // Accent dark blue
          600: '#254A78',
        },
        medical: {
          blue: '#2563EB', // Primary brand color
          light: '#60A5FA', // Subtle highlights
          cyan: '#38BDF8',  // Glowing elements
        },
        accent: {
          green: '#10B981', // Status / Success
          red: '#EF4444',   // Alerts / Warning
          orange: '#F59E0B',
        },
        surface: {
          light: '#F8FAFC', // Light section background
          card: '#FFFFFF',
          muted: '#F1F5F9',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        arabic: ['Cairo', 'system-ui', 'sans-serif'],
      },
    },
  },
};
```

### B. Vertical Scroll-Snap Slide Layout
In `src/index.css`, enforce strict `100dvh` slide viewport snapping:

```css
/* Container holding all full-screen slides */
.slide-container {
  height: 100vh;
  width: 100vw;
  scroll-snap-type: y mandatory;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: none;
}
.slide-container::-webkit-scrollbar {
  display: none;
}

/* Individual Slide Component */
.slide {
  height: 100dvh;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  position: relative;
  overflow-y: auto;
  scrollbar-width: none;
}
```

### C. Glassmorphism Card Utility Classes
Add high-end backdrop blur cards to `src/index.css`:

```css
/* Light Glassmorphism Card */
.glass-card {
  background: rgba(255, 255, 255, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.glass-card:hover {
  box-shadow: 0 12px 48px rgba(37, 99, 235, 0.12);
  transform: translateY(-4px);
}

/* Dark Glassmorphism Card */
.glass-card-dark {
  background: rgba(15, 32, 53, 0.85);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
}

/* Vibrant Gradient Text */
.gradient-text {
  background: linear-gradient(135deg, #2563EB, #60A5FA, #38BDF8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 4. Key Custom Hooks & Context Patterns

### A. Navigation & Scroll State Hook (`useSlideNavigation.ts`)
Tracks active slide index based on scroll position and provides programatic navigation (`goNext`, `goPrev`):

```typescript
import { useState, useEffect, useRef } from 'react';

export function useSlideNavigation(totalSlides: number) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const slideHeight = window.innerHeight;
      const index = Math.round(container.scrollTop / slideHeight);
      setCurrentSlide(index);
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSlide = (index: number) => {
    if (!containerRef.current) return;
    const target = Math.max(0, Math.min(index, totalSlides - 1));
    containerRef.current.scrollTo({
      top: target * window.innerHeight,
      behavior: 'smooth',
    });
  };

  return {
    currentSlide,
    progress: ((currentSlide + 1) / totalSlides) * 100,
    goNext: () => scrollToSlide(currentSlide + 1),
    goPrev: () => scrollToSlide(currentSlide - 1),
    scrollToSlide,
    containerRef,
  };
}
```

### B. Bilingual (EN / AR) Context (`i18n.tsx`)
Enables instant switching between English (LTR) and Arabic (RTL):

```typescript
import React, { createContext, useContext, useState } from 'react';

type Lang = 'en' | 'ar';
interface LanguageContextType {
  language: Lang;
  setLanguage: (l: Lang) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | null>(null);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Lang>('en');

  const t = (key: string) => {
    // Return key or translation dictionary lookup
    return key;
  };

  const isRTL = language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      <div dir={isRTL ? 'rtl' : 'ltr'} className={isRTL ? 'font-arabic' : 'font-sans'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};
```

---

## 5. GitHub Pages Deployment Pipeline

### Step 1: Install `gh-pages`
```bash
npm install -D gh-pages
```

### Step 2: Update `package.json` Scripts
```json
"scripts": {
  "dev": "vite",
  "build": "tsc -b && vite build",
  "preview": "vite preview",
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

### Step 3: Configure `vite.config.ts` Base URL
Ensure the repository path matches your GitHub repo name:
```typescript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/YOUR_REPOSITORY_NAME/', // Set to './' for custom domains or root paths
});
```

### Step 4: Deploy Command
```bash
npm run deploy
```

---

## Summary Checklist for Developer Agents
1. **Initialize Project**: `npm create vite@latest my-app -- --template react-ts`
2. **Install Dependencies**: `npm i lucide-react framer-motion` & `npm i -D tailwindcss postcss autoprefixer gh-pages`
3. **Configure Tailwind & Web Fonts**: Add Inter & Cairo fonts to `index.html`, set up extended colors in `tailwind.config.js`.
4. **Implement Global CSS**: Add `.slide-container`, `.slide`, `.glass-card`, and CSS gradient rules into `src/index.css`.
5. **Build Slide Architecture**: Wrap sections in full-height slide wrappers and control navigation via `useSlideNavigation`.
6. **Deploy**: Run `npm run deploy` to publish automatically to GitHub Pages.
