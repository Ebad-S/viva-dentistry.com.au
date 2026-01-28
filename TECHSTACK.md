# Technology Stack

## Overview
Viva Dentistry Website is a modern, high-performance Single Page Application (SPA) built with cutting-edge web technologies, focusing on performance, accessibility, and user experience.

---

## 🎯 Core Technologies

### Frontend Framework
- **[Next.js](https://nextjs.org/) 14.2.15**
  - React framework with Server-Side Rendering (SSR)
  - App Router architecture
  - Built-in optimization and performance features
  - Image optimization with Next/Image component
  - API Routes for serverless functions

### JavaScript/TypeScript
- **[React](https://react.dev/) 18.3.1**
  - Component-based UI library
  - Hooks for state management
  - Server and Client Components
  
- **[TypeScript](https://www.typescriptlang.org/) 5.9.2**
  - Static type checking
  - Enhanced IDE support
  - Improved code quality and maintainability
  - ES5 target for maximum browser compatibility

---

## 🎨 Styling & UI

### CSS Framework
- **[Tailwind CSS](https://tailwindcss.com/) 3.4.17**
  - Utility-first CSS framework
  - Custom color palette (luxe theme)
  - Dark mode support via `class` strategy
  - Responsive design utilities
  - Custom animations and keyframes
  
**Custom Color Themes:**
```javascript
Primary Palette: Luxe cream, pearl, sand, taupe, wine, charcoal
Secondary Palette: Grayscale (50-950)
Accent Palette: Pink/Rose tones
```

### Fonts
- **[Google Fonts](https://fonts.google.com/)**
  - **Inter**: Primary sans-serif font
  - **Poppins**: Display font for headings
  - Optimized loading with `next/font`

### Animation
- **[Framer Motion](https://www.framer.com/motion/) 11.11.17**
  - Declarative animations
  - Page transitions
  - Scroll-triggered animations
  - Gesture animations
  - Exit animations

### Icons
- **[React Icons](https://react-icons.github.io/react-icons/) 5.5.0**
  - 30,000+ icons from popular icon packs
  - Font Awesome icons used throughout
  - Tree-shakeable imports

---

## 🔧 Development Tools

### Build Tools
- **[PostCSS](https://postcss.org/) 8.5.6**
  - CSS transformations
  - Plugin: `postcss-import` for @import resolution
  
- **[Autoprefixer](https://github.com/postcss/autoprefixer) 10.4.21**
  - Automatic vendor prefixes
  - Cross-browser CSS compatibility

### Code Quality
- **[ESLint](https://eslint.org/) 9.35.0**
  - Code linting and style enforcement
  - Next.js specific rules via `eslint-config-next`
  - TypeScript support

### Image Optimization
- **[Sharp](https://sharp.pixelplumbing.com/) 0.34.3**
  - High-performance image processing
  - Automatic format conversion
  - Responsive image generation

---

## 📦 Key Libraries

### Form Management
- **[React Hook Form](https://react-hook-form.com/) 7.62.0**
  - Performant form validation
  - Reduced re-renders
  - Easy integration with UI libraries
  - Client-side validation

### Theme Management
- **[next-themes](https://github.com/pacocoursey/next-themes) 0.3.0**
  - Dark/Light mode toggle
  - System preference detection
  - No flash on page load
  - LocalStorage persistence

### Scroll & Intersection
- **[react-intersection-observer](https://github.com/thebuilder/react-intersection-observer) 9.16.0**
  - Lazy loading components
  - Scroll-triggered animations
  - Performance optimization
  - Viewport detection

### Email Service
- **[Resend](https://resend.com/) 6.1.0**
  - Transactional email API
  - Contact form submissions
  - Email templates
  - Delivery tracking

---

## 🐳 Deployment & Infrastructure

### Containerization
- **[Docker](https://www.docker.com/)**
  - Multi-stage build process
  - Node.js 18 Alpine base image
  - Optimized image size
  - Health checks included
  - Production-ready configuration

### Docker Configuration
```dockerfile
Base Image: node:18-alpine
Build Stages: deps → builder → runner
Port: 3000
User: nextjs (non-root)
Health Check: Every 30s
```

### Docker Compose
- Service orchestration
- Environment variable management
- Port mapping (3000:3000)
- Volume management

---

## 🔒 Security Features

### HTTP Security Headers
Configured in `next.config.js`:
- **Content-Security-Policy**: HTTPS upgrade enforcement
- **Strict-Transport-Security**: HSTS with 1-year max-age
- **X-Frame-Options**: Clickjacking protection (DENY)
- **X-Content-Type-Options**: MIME-type sniffing prevention
- **Referrer-Policy**: Privacy protection

### Best Practices
- Environment variables for sensitive data
- Server-side validation
- CSRF protection
- Sanitized user inputs
- Secure API endpoints

---

## 🌐 Browser Support

### Target Browsers
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

### Compatibility Features
- Progressive enhancement
- Polyfills via Next.js
- Responsive design
- Touch-friendly interfaces
- Cross-browser tested

---

## 📊 Performance Optimizations

### Built-in Optimizations
- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next/Image with Sharp
- **Font Optimization**: Automatic font subsetting
- **CSS Purging**: Unused CSS removal in production
- **Static Generation**: Pre-rendered pages where possible
- **Lazy Loading**: Components and images
- **Tree Shaking**: Dead code elimination

### Caching Strategy
- Static assets cached with proper headers
- API route caching
- Browser caching optimization
- CDN-ready architecture

---

## 🎯 SEO & Metadata

### SEO Features
- **Structured Data** (JSON-LD):
  - Local Business schema
  - Dentist schema
  - Review schema
  - Breadcrumb schema
  
- **Meta Tags**:
  - OpenGraph tags for social sharing
  - Twitter Card metadata
  - Canonical URLs
  - Viewport configuration
  
- **Sitemap**: XML sitemap generation
- **Robots.txt**: Search engine directives

---

## 📱 Progressive Web App (PWA) Ready

### PWA Features
- Responsive design
- Mobile-optimized UI
- Touch gestures
- Sticky mobile CTA bar
- Offline-ready architecture (future enhancement)

---

## 🛠️ Development Environment

### Requirements
- **Node.js**: >= 18.0.0
- **Package Manager**: npm (lockfile v3)
- **Editor**: VS Code recommended

### Scripts
```bash
npm run dev      # Development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 📐 Architecture

### Project Structure
```
src/
├── app/              # Next.js App Router
│   ├── api/          # API routes
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Home page
├── components/       # React components
├── styles/           # Global styles
└── middleware.ts     # Next.js middleware

public/
├── images/           # Static images
└── policies/         # PDF documents
```

### Design Patterns
- **Component-Based Architecture**: Reusable UI components
- **Server/Client Components**: Optimized rendering strategy
- **API Routes**: Serverless backend functions
- **Custom Hooks**: Reusable logic
- **TypeScript Interfaces**: Type-safe props

---

## 🚀 Deployment Platforms

### Compatible Platforms
- **Vercel** (Recommended for Next.js)
- **Docker** (Self-hosted)
- **AWS** (EC2, ECS, Amplify)
- **Google Cloud Platform**
- **Azure**
- **DigitalOcean**
- **Railway**
- **Fly.io**

---

## 📈 Monitoring & Analytics

### Recommended Tools
- Google Analytics 4
- Google Search Console
- Sentry (error tracking)
- Vercel Analytics
- Lighthouse (performance auditing)

---

## 🔄 Version Control

- **Git**: Version control system
- **GitHub**: Repository hosting
- **.gitignore**: Configured for Next.js projects

---

## 📚 Documentation

### Additional Documentation
- [README.md](./README.md) - Project overview
- [SETUP_GUIDE.md](./SETUP_GUIDE.md) - Setup instructions
- [LLMO_IMPLEMENTATION.md](./LLMO_IMPLEMENTATION.md) - Local marketing optimization
- [IMPROVEMENTS_IMPLEMENTED.md](./IMPROVEMENTS_IMPLEMENTED.md) - Feature changelog

---

## 🤝 Contributing

### Development Guidelines
- Follow TypeScript strict mode
- Use ESLint recommended rules
- Write semantic HTML
- Follow accessibility standards (WCAG 2.1)
- Test across browsers
- Optimize images before committing

---

## 📝 License

- **Code**: MIT License
- **Content**: Apache License 2.0
- **Compliance**: AHPRA guidelines

---

## 🏗️ Future Enhancements

### Potential Additions
- [ ] PWA with offline support
- [ ] Internationalization (i18n)
- [ ] Content Management System (CMS)
- [ ] A/B testing framework
- [ ] Advanced analytics dashboard
- [ ] Chatbot integration
- [ ] Online booking system
- [ ] Payment processing

---

## 📞 Support

For technical inquiries or contributions:
- **Website**: [viva-dentistry.com.au](https://viva-dentistry.com.au/)
- **Developer**: Serenity Webcrafts

---

**Last Updated**: January 2025  
**Tech Stack Version**: 1.0.0
