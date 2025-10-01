import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Users } from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onPageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();

  // Debounced scroll handler for better performance
  const handleScroll = useCallback(() => {
    const scrollThreshold = 100;
    setIsScrolled(window.scrollY > scrollThreshold);
  }, []);

  useEffect(() => {
    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    return () => window.removeEventListener('scroll', throttledScroll);
  }, [handleScroll]);

  // Enhanced navigation items with new sections
  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'tournament', label: 'Tournament' },
    { id: 'about', label: 'About Us' },
    { id: 'app', label: 'Mobile App' },
    { id: 'contact', label: 'Contact' }
  ];

  // Handle page changes with smooth scrolling
  const handlePageChange = (pageId: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Always push a route so URL updates
    const path = pageId === 'home' ? '/' : `/${pageId}`;
    navigate(path);
    // Also call parent callback for any local state needs
    try { onPageChange(pageId); } catch { /* noop */ }
    setIsMenuOpen(false); // Close mobile menu on navigation
  };

  // Close mobile menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <nav 
        className="fixed top-0 left-0 right-0 z-50 p-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className={`w-full transition-all duration-700 ease-out ${
          isScrolled 
            ? 'bg-gradient-to-r from-emerald-900/95 to-teal-900/95 backdrop-blur-xl shadow-2xl border border-emerald-700/50 rounded-full' 
            : 'bg-gradient-to-r from-emerald-800/20 to-teal-800/20 backdrop-blur-md border border-emerald-500/30 rounded-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6">
            {/* Logo - Clickable to home */}
            <button
              onClick={() => handlePageChange('home')}
              className="flex items-center space-x-2 group"
              aria-label="Gambeta home"
            >
              <Users className={`w-8 h-8 transition-all duration-300 group-hover:scale-110 ${
                isScrolled ? 'text-emerald-400' : 'text-emerald-300'
              }`} />
              <span className="text-xl font-bold text-white">
                Gambeta
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {/* Navigation Links */}
              <div className="flex items-center space-x-1">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`relative font-medium transition-all duration-300 px-4 py-2 rounded-full hover:bg-emerald-500/20 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      currentPage === item.id
                        ? 'text-emerald-300 bg-emerald-500/20 shadow-lg'
                        : 'text-white hover:text-emerald-300'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Coming Soon Button */}
              <button
                onClick={() => {
                  console.log('Coming Soon clicked');
                }}
                className="inline-flex items-center space-x-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-105 bg-gradient-to-r from-emerald-500 to-teal-600 text-white hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl"
                aria-label="Coming soon - Gambeta mobile app"
              >
                <span>Coming Soon</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 text-white hover:bg-emerald-500/20"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mobile-menu-container md:hidden mt-2">
            <div className={`w-full transition-all duration-300 ${
              isScrolled 
                ? 'bg-gradient-to-r from-emerald-900/95 to-teal-900/95 backdrop-blur-xl border border-emerald-700/50 rounded-2xl' 
                : 'bg-gradient-to-r from-emerald-800/30 to-teal-800/30 backdrop-blur-md border border-emerald-500/30 rounded-2xl'
            }`}>
              <div className="p-6 space-y-4">
                {/* Mobile Navigation Links */}
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handlePageChange(item.id)}
                    className={`block w-full text-left px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-400 ${
                      currentPage === item.id
                        ? 'text-emerald-300 bg-emerald-500/20 shadow-md'
                        : 'text-white hover:text-emerald-300 hover:bg-emerald-500/10'
                    }`}
                    aria-current={currentPage === item.id ? 'page' : undefined}
                  >
                    {item.label}
                  </button>
                ))}

                    {/* Legal Links */}
                    <a
                      href="/privacy"
                      className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-emerald-300"
                    >
                      Privacy
                    </a>
                    <a
                      href="/terms"
                      className="block w-full text-left px-4 py-3 text-sm text-slate-300 hover:text-emerald-300"
                    >
                      Terms
                    </a>
                
                {/* Mobile Coming Soon Button */}
                <button
                  onClick={() => {
                    console.log('Coming Soon clicked');
                    setIsMenuOpen(false);
                  }}
                  className="w-full mt-4 inline-flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:from-emerald-600 hover:to-teal-700 focus:outline-none focus:ring-2 focus:ring-emerald-400 transform hover:scale-105 shadow-lg"
                  aria-label="Coming soon - Gambeta mobile app"
                >
                  <span>Coming Soon</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navigation;
