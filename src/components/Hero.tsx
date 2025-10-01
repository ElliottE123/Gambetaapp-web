import React, { useState, useEffect } from 'react';
import { ChevronDown, Instagram, Bell } from 'lucide-react';
import SignupModal from './SignupModal';

interface HeroProps {
  onNavigateToTournament?: () => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigateToTournament }) => {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  // Monitor scroll position to determine if we're at the top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY < 100); // Consider "at top" if within 100px of top
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToAnnouncements = () => {
    // Target the tournament announcement section specifically
    const announcementSection = document.getElementById('tournament-announcement');
    if (announcementSection) {
      const navHeight = 80; // Account for fixed navigation height only
      const offsetTop = announcementSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 pt-24">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000 ease-out"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/274506/pexels-photo-274506.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
          }}
        />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        {/* Content Container */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            <span className="block">Play Soccer.</span>
            <span className="block text-emerald-400">Find Your Community.</span>
            <span className="block">Get Gambeta.</span>
          </h1>
          
          {/* Subheading */}
          <p className="text-xl md:text-2xl mb-10 max-w-4xl mx-auto leading-relaxed text-gray-200 animate-fade-in-up animation-delay-300">
            The ultimate mobile platform for local soccer enthusiasts to organize games, 
            build player profiles, and connect with their community.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-fade-in-up animation-delay-600">
            {/* Coming Soon Button */}
            <button 
              onClick={() => setIsSignupModalOpen(true)}
              className="group bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border border-gray-700"
            >
              <Bell className="w-6 h-6" />
              <div className="text-left">
                <div className="text-xs text-gray-300">App Coming Soon to the DMV</div>
                <div className="text-base font-bold">Sign up for notifications</div>
              </div>
            </button>
            
            {/* Instagram Button */}
            <button 
              onClick={() => window.open('https://insta.gambetaapp.com', '_blank')}
              className="group bg-white/10 hover:bg-white/20 text-white px-8 py-4 rounded-2xl flex items-center gap-3 text-lg font-semibold backdrop-blur-sm border border-white/30 transition-all duration-300 transform hover:scale-105"
            >
              <Instagram className="w-6 h-6" />
              Follow on Instagram
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator - Dynamic behavior based on scroll position */}
        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          isAtTop ? 'opacity-100' : 'opacity-60'
        }`}>
          <button 
            onClick={handleScrollToAnnouncements}
            className={`flex flex-col items-center text-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl p-3 sm:p-4 bg-transparent hover:bg-white/10 border-transparent hover:border-white/20 shadow-none hover:shadow-lg ${
              isAtTop 
                ? 'animate-bounce hover:animate-bounce' 
                : 'hover:animate-none opacity-80 hover:opacity-100'
            }`}
            aria-label="Scroll to announcements section"
          >
            <span className={`text-xs sm:text-sm mb-1 sm:mb-2 font-medium tracking-wide transition-all duration-300 ${
              isAtTop 
                ? 'text-white/90 hover:text-white' 
                : 'text-white hover:text-white'
            }`}>
              Announcements and Big Updates!
            </span>
            <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
              isAtTop 
                ? 'animate-pulse text-white/90 hover:text-white' 
                : 'text-white/80 hover:text-white'
            }`} />
          </button>
        </div>
      </section>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </>
  );
};

export default Hero;
