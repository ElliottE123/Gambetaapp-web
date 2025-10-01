import { useState, useEffect, useRef } from 'react';
import { Apple, Smartphone, Users, MapPin, Calendar, MessageCircle, Trophy, Star, Heart, Zap, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { IMAGES } from '../utils/images';

const AppShowcase = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeFeature, setActiveFeature] = useState(0);
  const featuresRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLDivElement>(null);

  // App features with corresponding screenshots and detailed descriptions
  const appFeatures = [
    {
      id: 0,
      title: "Welcome & Sign In",
      description: "Your soccer community starts here. Create your profile, set your preferences, and get ready to discover amazing games and players in your area.",
      detailedDescription: "The onboarding experience guides new users through setting up their profile, selecting their skill level, and choosing their preferred playing positions and locations.",
      image: IMAGES.appPreviewFinal.screen1,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: Heart,
      color: "from-emerald-500 to-teal-600"
    },
    {
      id: 1,
      title: "Discover Local Games",
      description: "Browse soccer games happening near you with an intuitive map view. Filter by distance, skill level, time, and game type to find your perfect match.",
      detailedDescription: "Interactive map showing nearby games with real-time availability, detailed venue information, and easy filtering options to help players find exactly what they're looking for.",
      image: IMAGES.appPreviewFinal.screen2,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: MapPin,
      color: "from-blue-500 to-indigo-600"
    },
    {
      id: 2,
      title: "Find & Sign Up",
      description: "Get comprehensive information about each game including location, time, skill level, and current players. RSVP instantly and see who else is joining.",
      detailedDescription: "Detailed game pages show venue photos, player lists, skill requirements, equipment needs, and weather conditions to help players make informed decisions.",
      image: IMAGES.appPreviewFinal.screen3,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: Calendar,
      color: "from-purple-500 to-pink-600"
    },
    {
      id: 3,
      title: "Connect with Players", 
      description: "Build your soccer network by viewing player profiles, checking their stats, and connecting with like-minded players in your community.",
      detailedDescription: "Comprehensive player profiles showing playing history, skill ratings, preferred positions, and mutual connections to help build trust within the community.",
      image: IMAGES.appPreviewFinal.screen4,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: Users,
      color: "from-orange-500 to-red-600"
    },
    {
      id: 4,
      title: "Real-time Chat",
      description: "Stay connected through in-app messaging. Coordinate with your team, discuss game plans, and build lasting friendships through soccer.",
      detailedDescription: "Group and individual chat features with game-specific channels, photo sharing, and push notifications to keep players connected and informed.",
      image: IMAGES.appPreviewFinal.screen5,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: MessageCircle,
      color: "from-yellow-500 to-orange-600"
    },
    {
      id: 5,
      title: "Create & Organize",
      description: "Host your own games with powerful organization tools. Set recurring events, manage teams, and keep everyone updated with real-time notifications.",
      detailedDescription: "Comprehensive event creation with recurring game options, team management, automatic reminders, and weather monitoring for seamless organization.",
      image: IMAGES.appPreviewFinal.screen6,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: Zap,
      color: "from-green-500 to-emerald-600"
    },
    {
      id: 6,
      title: "Tournaments & Rankings",
      description: "Monitor your soccer progress with detailed statistics, achievements, and performance tracking. See your growth and celebrate milestones.",
      detailedDescription: "Personal dashboard with game history, performance metrics, skill progression tracking, and achievement badges to gamify the soccer experience.",
      image: IMAGES.appPreviewFinal.screen7,
      // image: IMAGES.appPreviewTemp.screen10,
      icon: Trophy,
      color: "from-indigo-500 to-purple-600"
    },
    {
      id: 7,
      title: "Event Types & Filters",
      description: "Share your experiences and help build a trusted community. Rate games, venues, and players to maintain high-quality experiences.",
      detailedDescription: "Community-driven options help you explore different game types, formats, and levels so you can quickly find the right match.",
      image: IMAGES.appPreviewFinal.screen8,
      icon: Star,
      color: "from-pink-500 to-rose-600"
    }
  ];

  // Handle scroll-triggered feature changes with improved centering
  useEffect(() => {
    let scrollTimeout: number;
    let autoCorrectionTimeout: number;

    const smoothScrollTo = (element: HTMLElement, targetY: number, duration: number = 800) => {
      const startY = element.scrollTop;
      const distance = targetY - startY;
      const startTime = performance.now();

      const easeOutCubic = (t: number): number => {
        return 1 - Math.pow(1 - t, 3);
      };

      const animateScroll = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        
        element.scrollTop = startY + (distance * easedProgress);
        
        if (progress < 1) {
          requestAnimationFrame(animateScroll);
        }
      };

      requestAnimationFrame(animateScroll);
    };

    const handleScroll = () => {
      if (!featuresRef.current) return;

      const features = featuresRef.current.querySelectorAll('.feature-block');
      const rightSide = featuresRef.current.closest('.lg\\:overflow-y-auto') as HTMLElement;
      
      // Only apply auto-scroll behavior on desktop, not mobile
      if (window.innerWidth >= 1024) {
        // Use right side scroll for desktop
        const scrollY = rightSide ? rightSide.scrollTop : 0;
        const containerHeight = rightSide ? rightSide.clientHeight : window.innerHeight;
        const containerCenter = scrollY + containerHeight / 2;

        let closestFeature = 0;
        let minDistance = Infinity;

        features.forEach((feature, index) => {
          const rect = feature.getBoundingClientRect();
          const featureTop = rect.top + scrollY - rightSide.getBoundingClientRect().top;
          const featureCenter = featureTop + rect.height / 2;
          const distance = Math.abs(featureCenter - containerCenter);

          // Find the feature closest to container center
          if (distance < minDistance) {
            minDistance = distance;
            closestFeature = index;
          }
        });

        setActiveFeature(closestFeature);

        // Clear any existing timeouts
        clearTimeout(scrollTimeout);
        clearTimeout(autoCorrectionTimeout);
        
        // First timeout - wait for initial scroll settling
        scrollTimeout = window.setTimeout(() => {
          // Second timeout - additional delay before auto-correction
          autoCorrectionTimeout = window.setTimeout(() => {
            const targetFeature = features[closestFeature];
            
            if (targetFeature && rightSide) {
              const rect = targetFeature.getBoundingClientRect();
              const featureTop = rect.top + rightSide.scrollTop - rightSide.getBoundingClientRect().top;
              const featureCenter = featureTop + rect.height / 2;
              const targetScrollY = featureCenter - containerHeight / 2;
              const currentCenter = rightSide.scrollTop + containerHeight / 2;
              
              // Only auto-center if not already well-centered
              if (Math.abs(currentCenter - featureCenter) > 80) {
                smoothScrollTo(rightSide, Math.max(0, targetScrollY), 800);
              }
            }
          }, 150);
        }, 250);
      } else {
        // On mobile, just update the active feature based on scroll position
        // but don't attempt to auto-scroll
        const visibleFeatures = Array.from(document.querySelectorAll('.lg\\:hidden .feature-block'));
        const windowCenter = window.scrollY + window.innerHeight / 2;
        
        let closestFeature = 0;
        let minDistance = Infinity;
        
        visibleFeatures.forEach((feature, index) => {
          const rect = feature.getBoundingClientRect();
          const featureCenter = rect.top + window.scrollY + rect.height / 2;
          const distance = Math.abs(featureCenter - windowCenter);
          
          if (distance < minDistance) {
            minDistance = distance;
            closestFeature = index;
          }
        });
        
        setActiveFeature(closestFeature);
      }
    };

    const throttledScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    // Add scroll listeners to both window and right side container
    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    const rightSide = document.querySelector('.lg\\:overflow-y-auto') as HTMLElement;
    if (rightSide) {
      rightSide.addEventListener('scroll', throttledScroll, { passive: true });
    }
    
    return () => {
      window.removeEventListener('scroll', throttledScroll);
      if (rightSide) {
        rightSide.removeEventListener('scroll', throttledScroll);
      }
      clearTimeout(scrollTimeout);
      clearTimeout(autoCorrectionTimeout);
    };
  }, []);

  return (
    <div ref={ref as any} className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 lg:overflow-hidden overflow-x-hidden">
      <style dangerouslySetInnerHTML={{
        __html: `
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          @media (max-width: 1023px) {
            .feature-block {
              scroll-snap-align: center;
            }
            .snap-container {
              scroll-snap-type: y proximity;
              overflow-y: auto;
            }
          }
        `
      }} />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24 pb-20">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-slate-900/40 to-teal-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-4 sm:left-10 w-64 sm:w-96 h-64 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-4 sm:right-10 w-48 sm:w-80 h-48 sm:h-80 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-72 h-48 sm:h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative px-4 md:px-6 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-6 sm:mb-8">
            <Smartphone className="w-5 sm:w-6 h-5 sm:h-6 text-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-semibold text-base sm:text-lg">Mobile App Preview</span>
          </div>

          {/* Main Title */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Experience the Future of{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Local Soccer
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
            Discover how Gambeta transforms the way soccer players connect, organize games, 
            and build communities through innovative mobile technology.
          </p>

          {/* Key Features Quick Preview - Mobile Optimized */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-4xl mx-auto px-2">
            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <MapPin className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-400 mb-2 sm:mb-3" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Find Games Nearby</h3>
              <p className="text-slate-400 text-xs sm:text-sm text-center">Discover local soccer matches with interactive maps</p>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-teal-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Users className="w-6 sm:w-8 h-6 sm:h-8 text-teal-400 mb-2 sm:mb-3" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Build Your Team</h3>
              <p className="text-slate-400 text-xs sm:text-sm text-center">Connect with players and form lasting teams</p>
            </div>
            <div className="flex flex-col items-center p-4 sm:p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-500/20 rounded-xl sm:rounded-2xl backdrop-blur-sm">
              <Trophy className="w-6 sm:w-8 h-6 sm:h-8 text-emerald-400 mb-2 sm:mb-3" />
              <h3 className="text-white font-semibold mb-1 sm:mb-2 text-sm sm:text-base">Track Progress</h3>
              <p className="text-slate-400 text-xs sm:text-sm text-center">Monitor your stats and achievements</p>
            </div>
          </div>

          {/* CTA - Mobile Optimized */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-4 mb-12 sm:mb-0">
            <button className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
              <Apple className="w-4 sm:w-5 h-4 sm:h-5" />
              <span className="text-sm sm:text-base">Coming Soon to iOS</span>
            </button>
            
            <button
              onClick={() => {
                const appPreviewSection = document.querySelector('#app-preview');
                if (appPreviewSection) {
                  const navHeight = 80;
                  const offsetTop = appPreviewSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                  window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                  });
                }
              }}
              className="group px-6 sm:px-8 py-3 sm:py-4 bg-slate-800/50 text-white border-2 border-slate-600 rounded-lg sm:rounded-xl hover:border-emerald-500 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center gap-2 sm:gap-3 w-full sm:w-auto"
            >
              <span className="text-sm sm:text-base">Explore Features</span>
              <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-y-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Scroll Indicator - Mobile Optimized */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <button 
            onClick={() => {
              const appPreviewSection = document.querySelector('#app-preview');
              if (appPreviewSection) {
                const navHeight = 80;
                const offsetTop = appPreviewSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
            className="flex flex-col items-center text-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl p-2 sm:p-4 bg-transparent hover:bg-white/10 border-transparent hover:border-white/20 shadow-none hover:shadow-lg animate-bounce hover:animate-bounce"
            aria-label="Scroll to app features"
          >
            <span className="text-xs sm:text-sm mb-1 font-medium tracking-wide text-white/90 hover:text-white">
              Explore App Features
            </span>
            <ChevronDown className="w-4 sm:w-6 h-4 sm:h-6 animate-pulse text-white/90 hover:text-white" />
          </button>
        </div>
      </section>

      {/* Middle Hero Section - Used in App Overview Page*/}
      {/* <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-16 sm:py-20"> */}
        {/* Background Effects */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 via-slate-900/60 to-emerald-900/20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 right-4 sm:right-10 w-64 sm:w-96 h-64 sm:h-96 bg-teal-500/8 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-4 sm:left-10 w-48 sm:w-80 h-48 sm:h-80 bg-emerald-600/8 rounded-full blur-3xl"></div>
        </div> */}
        
        {/* <div className="max-w-6xl mx-auto relative px-4 md:px-6 text-center"> */}
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-teal-500/20 to-emerald-600/20 border border-teal-500/30 rounded-full mb-6 sm:mb-8">
            <Star className="w-5 sm:w-6 h-5 sm:h-6 text-teal-400 animate-pulse" />
            <span className="text-teal-300 font-semibold text-base sm:text-lg">App Overview</span>
          </div> */}

          {/* Main Title */}
          {/* <h2 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight px-2">
            Every Feature{' '}
            <span className="bg-gradient-to-r from-teal-400 to-emerald-500 bg-clip-text text-transparent">
              Built for You
            </span>
          </h2> */}

          {/* Subtitle */}
          {/* <p className="text-lg sm:text-xl md:text-2xl text-slate-300 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-2">
            From discovering local games to building lasting friendships, explore the comprehensive features 
            that make Gambeta the ultimate soccer community platform.
          </p> */}

          {/* Feature Count Stats */}
          {/* <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-teal-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-teal-400 mb-1">10+</div>
              <div className="text-xs sm:text-sm text-slate-400">Core Features</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-emerald-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">24/7</div>
              <div className="text-xs sm:text-sm text-slate-400">Game Discovery</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-teal-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-teal-400 mb-1">∞</div>
              <div className="text-xs sm:text-sm text-slate-400">Connections</div>
            </div>
            <div className="text-center p-3 sm:p-4 bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-emerald-500/20 rounded-lg sm:rounded-xl backdrop-blur-sm">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 mb-1">100%</div>
              <div className="text-xs sm:text-sm text-slate-400">Free to Use</div>
            </div>
          </div> */}

          {/* CTA */}
          {/* <button
            onClick={() => {
              const appPreviewSection = document.querySelector('#app-preview');
              if (appPreviewSection) {
                const navHeight = 80;
                const offsetTop = appPreviewSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
            className="group px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-teal-500 to-emerald-600 text-white rounded-lg sm:rounded-xl hover:from-teal-600 hover:to-emerald-700 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg flex items-center gap-2 sm:gap-3 mx-auto"
          >
            <span className="text-sm sm:text-base">Discover All Features</span>
            <ChevronDown className="w-3 sm:w-4 h-3 sm:h-4 group-hover:translate-y-1 transition-transform" />
          </button>
        </div> */}

        {/* Scroll Indicator */}
        {/* <div className="absolute bottom-4 sm:bottom-6 left-1/2 transform -translate-x-1/2 z-20">
          <button 
            onClick={() => {
              const appPreviewSection = document.querySelector('#app-preview');
              if (appPreviewSection) {
                const navHeight = 80;
                const offsetTop = appPreviewSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
            className="flex flex-col items-center text-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl p-2 sm:p-3 bg-transparent hover:bg-white/10 border-transparent hover:border-white/20 shadow-none hover:shadow-lg animate-bounce hover:animate-bounce"
            aria-label="Scroll to detailed features"
          >
            <span className="text-xs font-medium tracking-wide text-white/90 hover:text-white mb-1">
              See Details
            </span>
            <ChevronDown className="w-4 sm:w-5 h-4 sm:h-5 animate-pulse text-white/90 hover:text-white" />
          </button>
        </div> */}
      {/* </section> */}

      {/* App Preview Section */}
      <section id="app-preview" className="relative">
        <div className="lg:flex">
          
          {/* Left Side - App Screen View - Desktop Only */}
          <div className="hidden lg:block lg:w-1/2">
            <div className="lg:sticky lg:top-0 lg:h-screen lg:flex lg:items-center lg:justify-center lg:p-16">
              <div ref={phoneRef} className="relative">
                {/* Desktop: Direct Screenshot Display */}
                <div className="hidden lg:block w-80 xl:w-96">
                  <div className="relative">
                    {/* Clean Screenshot Display */}
                    <div className="relative overflow-hidden rounded-[2rem] shadow-2xl">
                      {appFeatures.map((feature, index) => (
                        <img
                          key={feature.id}
                          src={feature.image}
                          alt={feature.title}
                          className={`w-full h-auto object-cover transition-all duration-700 ${
                            activeFeature === index 
                              ? 'opacity-100 transform scale-100' 
                              : 'opacity-0 transform scale-105 absolute inset-0'
                          }`}
                        />
                      ))}
                    </div>
                    
                    {/* Floating elements */}
                    <div className="absolute -top-4 -right-4 w-6 h-6 bg-emerald-500 rounded-full animate-pulse"></div>
                    <div className="absolute -bottom-4 -left-4 w-4 h-4 bg-teal-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Description and Progress - DESKTOP ONLY */}
          <div className="hidden lg:block lg:w-1/2 relative lg:h-screen lg:overflow-y-auto hide-scrollbar">
            
            {/* Descriptions Container */}
            <div ref={featuresRef} className="flex-1">
              <div className="lg:px-8 xl:px-16">
                {appFeatures.map((feature) => {
                  const Icon = feature.icon;
                  
                  return (
                    <div 
                      key={feature.id}
                      className="feature-block min-h-[60vh] flex items-center py-8"
                    >
                      <div className="w-full max-w-2xl">
                        <div 
                          className={`transition-all duration-1000 ${
                            activeFeature === feature.id
                              ? 'opacity-100 translate-y-0' 
                              : 'opacity-30 translate-y-8'
                          }`}
                        >
                          {/* Feature Icon */}
                          <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} mb-6 shadow-lg transition-all duration-700`}>
                            <Icon className="w-8 h-8 text-white" />
                          </div>

                          {/* Feature Number */}
                          <div className="text-sm text-slate-400 mb-2 font-medium">
                            {String(feature.id + 1).padStart(2, '0')} / {String(appFeatures.length).padStart(2, '0')}
                          </div>

                          {/* Feature Title */}
                          <h3 className="text-3xl xl:text-4xl font-bold text-white mb-6 leading-tight">
                            {feature.title}
                          </h3>

                          {/* Feature Description */}
                          <p className="text-lg xl:text-xl text-slate-300 leading-relaxed mb-6">
                            {feature.description}
                          </p>

                          {/* Detailed Description */}
                          <p className="text-base text-slate-400 leading-relaxed">
                            {feature.detailedDescription}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar - Fixed to Right Side */}
            <div className="hidden lg:block fixed right-4 xl:right-8 top-1/2 transform -translate-y-1/2">
              <div className="flex flex-col items-center">
                {/* Progress Track */}
                <div className="w-1 h-80 bg-slate-700 rounded-full relative overflow-hidden">
                  {/* Progress Fill - Accurate to white dot position */}
                  <div 
                    className="w-full bg-gradient-to-t from-emerald-500 to-teal-500 rounded-full transition-all duration-500 ease-out"
                    style={{
                      height: `${(activeFeature / Math.max(1, appFeatures.length - 1)) * 100}%`
                    }}
                  ></div>
                  
                  {/* Active Indicator - Main white dot */}
                  <div 
                    className="absolute w-3 h-3 bg-white rounded-full left-1/2 shadow-lg transition-all duration-500 ease-out z-10"
                    style={{
                      top: `${(activeFeature / Math.max(1, appFeatures.length - 1)) * 100}%`,
                      transform: 'translate(-50%, -50%)'
                    }}
                  ></div>

                  {/* Feature Markers - Small dots for each section */}
                  {appFeatures.map((_, index) => (
                    <div
                      key={index}
                      className={`absolute w-1.5 h-1.5 rounded-full left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
                        index === activeFeature 
                          ? 'opacity-0' // Hide marker when white dot is on it
                          : 'bg-slate-500'
                      }`}
                      style={{
                        top: `${(index / Math.max(1, appFeatures.length - 1)) * 100}%`,
                        transform: 'translate(-50%, -50%)'
                      }}
                    />
                  ))}
                </div>

                {/* Progress Text */}
                <div className="mt-4 text-center">
                  <div className="text-xs text-slate-400 mb-1">Section</div>
                  <div className="text-sm font-semibold text-white">
                    {activeFeature + 1} / {appFeatures.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Features - Stacked below with better spacing */}
          <div className="lg:hidden px-4 py-8 sm:py-12">
            {appFeatures.map((feature) => {
              const Icon = feature.icon;
              const [featureRef, featureInView] = useInView({ threshold: 0.1, triggerOnce: true });
              
              return (
                <div 
                  key={feature.id}
                  ref={featureRef as any}
                  className="feature-block min-h-[90vh] sm:min-h-[70vh] flex flex-col justify-center py-8 sm:py-12"
                >
                  <div 
                    className={`text-center transition-all duration-700 ${
                      featureInView 
                        ? 'opacity-100 translate-y-0' 
                        : 'opacity-30 translate-y-4'
                    }`}
                  >
                    {/* Mobile Screenshot for this feature */}
                    <div className="w-56 sm:w-64 md:w-72 mx-auto mb-6 sm:mb-8">
                      <div className="relative">
                        <img
                          src={feature.image}
                          alt={feature.title}
                          className="w-full h-auto rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl"
                          loading="lazy"
                        />
                        {/* Floating elements - Mobile optimized */}
                        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-emerald-500 rounded-full animate-pulse"></div>
                        <div className="absolute -bottom-1 sm:-bottom-2 -left-1 sm:-left-2 w-2 sm:w-3 h-2 sm:h-3 bg-teal-500 rounded-full animate-bounce"></div>
                      </div>
                    </div>

                    {/* Feature Icon */}
                    <div className={`inline-flex items-center justify-center w-10 sm:w-12 h-10 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-r ${feature.color} mb-3 sm:mb-4 shadow-lg`}>
                      <Icon className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                    </div>

                    {/* Feature Number */}
                    <div className="text-xs sm:text-sm text-slate-400 mb-2">
                      {String(feature.id + 1).padStart(2, '0')} / {String(appFeatures.length).padStart(2, '0')}
                    </div>

                    {/* Feature Title */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
                      {feature.title}
                    </h3>

                    {/* Feature Description */}
                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed mb-3 sm:mb-4 max-w-xs sm:max-w-md mx-auto px-2">
                      {feature.description}
                    </p>

                    {/* Detailed Description */}
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm sm:max-w-lg mx-auto px-2">
                      {feature.detailedDescription}
                    </p>

                    {/* Mobile Progress Indicator */}
                    <div className="flex items-center justify-center mt-6 sm:mt-8 gap-1 sm:gap-1.5">
                      {appFeatures.map((_, index) => (
                        <div
                          key={index}
                          className={`h-1 rounded-full transition-all duration-300 ${
                            index === feature.id 
                              ? `w-4 sm:w-6 bg-gradient-to-r ${feature.color}` 
                              : 'w-1 sm:w-1.5 bg-slate-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
            
            {/* Mobile Call to Action - Hero Style */}
            <div className="min-h-[60vh] sm:min-h-[50vh] flex items-center justify-center py-12 sm:py-16">
              <div className="text-center relative">
                {/* Background Effects for Mobile CTA */}
                <div className="absolute inset-0 -m-8 bg-gradient-to-br from-emerald-500/5 to-teal-600/5 rounded-3xl blur-xl"></div>
                
                <div className="relative">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-6 sm:mb-8">
                    <Heart className="w-4 sm:w-5 h-4 sm:h-5 text-emerald-400 animate-pulse" />
                    <span className="text-emerald-300 font-semibold text-sm sm:text-base">Join the Community</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3 sm:mb-4 leading-tight px-2">
                    Ready to{' '}
                    <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                      Connect?
                    </span>
                  </h2>
                  
                  <p className="text-sm sm:text-base md:text-lg text-slate-300 mb-6 sm:mb-8 max-w-xs sm:max-w-md mx-auto leading-relaxed px-2">
                    Join thousands of soccer players who are already using Gambeta to find games, make friends, and build stronger communities.
                  </p>
                  
                  {/* Download Buttons - Mobile Optimized */}
                  <div className="flex flex-col gap-3 max-w-xs sm:max-w-sm mx-auto px-4">
                    <button className="group flex items-center gap-3 px-4 sm:px-5 py-3 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-lg sm:rounded-xl border-2 border-slate-600 hover:border-emerald-500 transition-all duration-300 transform active:scale-95">
                      <Apple className="w-5 sm:w-6 h-5 sm:h-6 transition-transform duration-300 flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-xs text-slate-400">Coming Soon to</div>
                        <div className="text-sm font-semibold">App Store</div>
                      </div>
                    </button>
                    
                    <button className="group flex items-center gap-3 px-4 sm:px-5 py-3 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-lg sm:rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform active:scale-95">
                      <Smartphone className="w-5 sm:w-6 h-5 sm:h-6 transition-transform duration-300 flex-shrink-0" />
                      <div className="text-left">
                        <div className="text-xs opacity-90">Get Early Access</div>
                        <div className="text-sm font-semibold">Join Beta</div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Hero Section - Call to Action - All Devices */}
      <section className="hidden lg:block relative min-h-screen flex items-center justify-center overflow-hidden py-16 md:py-24 lg:py-32">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/30 via-slate-900/50 to-teal-900/30"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-indigo-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>
        
        <div className="max-w-6xl mx-auto text-center relative px-4 md:px-6">
          <div 
            className={`transition-all duration-1000 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-8 lg:mb-12">
              <Heart className="w-6 h-6 text-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold text-lg">Ready to Start?</span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 md:mb-8 lg:mb-12 leading-tight">
              Ready to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Connect?
              </span>
            </h2>
            
            <p className="text-lg md:text-xl lg:text-2xl xl:text-3xl text-slate-300 mb-8 md:mb-12 lg:mb-16 max-w-5xl mx-auto leading-relaxed">
              Join thousands of soccer players who are already using Gambeta to find games, make friends, and build stronger communities.
            </p>
            
            {/* Download Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6 lg:gap-8 justify-center items-center max-w-2xl mx-auto">
              <button className="group flex items-center gap-4 lg:gap-6 px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 bg-gradient-to-r from-slate-800 to-slate-900 text-white rounded-xl lg:rounded-2xl border-2 border-slate-600 hover:border-emerald-500 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/20 w-full sm:w-auto">
                <Apple className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-sm md:text-base text-slate-400">Coming Soon to</div>
                  <div className="text-lg md:text-xl lg:text-2xl font-semibold">App Store</div>
                </div>
              </button>
              
              <button className="group flex items-center gap-4 lg:gap-6 px-6 md:px-8 lg:px-10 py-4 md:py-5 lg:py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl lg:rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-emerald-500/25 w-full sm:w-auto">
                <Smartphone className="w-8 md:w-10 lg:w-12 h-8 md:h-10 lg:h-12 group-hover:scale-110 transition-transform duration-300 flex-shrink-0" />
                <div className="text-left">
                  <div className="text-sm md:text-base opacity-90">Get Early Access</div>
                  <div className="text-lg md:text-xl lg:text-2xl font-semibold">Join Beta</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AppShowcase;
