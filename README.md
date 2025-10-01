# Gambeta Web

A modern, responsive landing page for Gambeta - the ultimate mobile platform for local soccer enthusiasts. Built with React, TypeScript, Vite, and Tailwind CSS, ready for GitHub Pages deployment.

## 🚀 Features

- **Modern Stack**: React 18 + TypeScript + Vite + Tailwind CSS
- **Responsive Design**: Mobile-first responsive layout with smooth animations
- **GitHub Pages Ready**: Automatic deployment workflow included
- **Component Architecture**: Modular component structure with advanced features
- **Interactive Elements**: Testimonial carousel, modal video player, navigation
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML
- **Performance**: Optimized images, lazy loading, and efficient bundling

## 📁 Project Structure

```
src/
├── components/
│   ├── Navigation.tsx          # Dynamic navigation with mobile menu
│   ├── Hero.tsx               # Hero section with video modal
│   ├── Features.tsx           # Feature showcase with animations
│   ├── Home.tsx               # Home page layout
│   ├── AboutUs.tsx            # About page layout
│   ├── Mission.tsx            # Mission statement section
│   ├── Founders.tsx           # Founders profiles with social links
│   ├── TestimonialCarousel.tsx # Advanced carousel with touch support
│   └── Modal.tsx              # Video modal component
├── hooks/
│   └── useInView.ts           # Custom hook for scroll animations
├── App.tsx                    # Main App component with routing
├── main.tsx                   # App entry point
└── index.css                  # Global styles with Tailwind CSS
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/justin-dele0n/Gambeta_Web.git
cd Gambeta_Web
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
```

5. Preview production build:
```bash
npm run preview
```

## 🚀 Deployment to GitHub Pages

This project is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Setup Steps:

1. **Enable GitHub Pages**:
   - Go to your repository Settings
   - Navigate to Pages section
   - Set Source to "GitHub Actions"

2. **Push to main branch**:
   - The workflow will automatically trigger
   - Your site will be available at: `https://justin-dele0n.github.io/Gambeta_Web/`

### Manual Deployment (Alternative):

```bash
npm run deploy
```

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run deploy` - Deploy to GitHub Pages (manual)

## 🔧 Configuration

### Vite Configuration

The `vite.config.ts` is pre-configured for GitHub Pages with the correct base path:

```typescript
export default defineConfig({
  base: '/Gambeta_Web/',
  // ...
})
```

### Tailwind CSS

The project uses Tailwind CSS for styling with custom animations and responsive design. Configuration is in `tailwind.config.js`.

### GitHub Actions

The deployment workflow is located at `.github/workflows/deploy.yml` and runs automatically on pushes to the main branch.

## 🎨 Key Features

### Components
- **Dynamic Navigation**: Responsive navigation with mobile menu and scroll effects
- **Hero Section**: Full-screen hero with background video and call-to-action buttons
- **Features Grid**: Animated feature cards with Lucide React icons
- **Mission Statement**: Full-screen mission section with parallax background
- **Founders Profiles**: Detailed founder profiles with social media links
- **Testimonial Carousel**: Advanced carousel with touch/swipe support and auto-play
- **Video Modal**: YouTube video integration with keyboard controls

### Animations & Interactions
- Scroll-triggered animations using Intersection Observer
- Smooth transitions and hover effects
- Touch/swipe gestures for mobile carousel navigation
- Auto-playing carousel with manual controls
- Responsive design breakpoints

### Performance Optimizations
- Optimized images from Pexels
- Efficient icon loading with Lucide React
- CSS optimizations with Tailwind
- Vite's fast development and production builds

## 📱 Responsive Design

The website is fully responsive and optimized for:
- Desktop (1024px+)
- Tablet (768px - 1023px) 
- Mobile (320px - 767px)

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🎯 About Gambeta

Gambeta is a mobile platform designed to connect local soccer enthusiasts. Our mission is to unite the global soccer community, one local game at a time, by making it easy to:

- Organize and join local soccer games
- Build player profiles and track progress
- Connect with soccer communities
- Find local fields and venues
- Match players by skill level

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ for the soccer community using React + TypeScript + Vite + Tailwind CSS**
