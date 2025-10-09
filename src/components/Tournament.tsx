import { useState, useEffect } from 'react';
import { Trophy, Calendar, MapPin, Users, Star, ChevronRight, Mail, Bell, ChevronDown } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import SignupModal from './SignupModal';

const Tournament = () => {
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [detailsRef, detailsInView] = useInView({ threshold: 0.1 });
  const [registrationRef, registrationInView] = useInView({ threshold: 0.1 });
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);

  // Monitor scroll position to determine if we're at the top
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsAtTop(scrollY < 100); // Consider "at top" if within 100px of top
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const tournamentDetails = [
    {
      icon: Calendar,
      title: "Tournament Date",
      value: "TBD",
      description: "single day event"
    },
    {
      icon: MapPin,
      title: "Location",
      value: "University of Maryland",
      description: "College Park campus fields"
    },
    {
      icon: Users,
      title: "Team Capacity",
      value: "16 Teams Maximum",
      description: "8 players minimum per team"
    },
    {
      icon: Trophy,
      title: "Prize Pool",
      value: "$1,000",
      description: "Big Check/Cash prize to winning team"
    }
  ];

  const highlights = [
    "Official referees for all matches",
    "Big Board displaying live bracket progression and winners",
    "Team and individual awards ceremony",
    "Meet the Gambeta founders - exclusive networking opportunity",
    "Progress your player ranking directly through the app",
    "7v7 format with 4 guaranteed 25-minute round robin games",
    "Sudden death elimination tournament for championship",
    "Organized in collaboration with UMD Club Soccer",
    "Unlimited spectators welcome - bring your supporters!",
    "Pre-organized fields - no setup hassles",
    "Competitive yet fun atmosphere for all skill levels",
    // SUGGESTED ADDITIONS (not explicitly mentioned):
    "Professional photography of tournament highlights", // Suggested addition
    "Live tournament updates via the Gambeta app", // Suggested addition
    "Post-game team photos with trophies", // Suggested addition
    "Tournament merchandise and Gambeta swag", // Suggested addition
    "Food trucks and refreshment stations", // Suggested addition
    "Dedicated parking areas for participants" // Suggested addition
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900">
      {/* Hero Section - Full viewport like other pages */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pb-20 pt-24">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-600/10"></div>
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative px-4 md:px-6">
          <div 
            ref={heroRef as any}
            className={`text-center transition-all duration-1000 ${
              heroInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Tournament Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-6">
              <Trophy className="w-5 h-5 text-emerald-400" />
              <span className="text-emerald-300 font-medium">Inaugural Championship</span>
            </div>

            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-6 leading-tight">
              Gambeta{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Cup 2025
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              University of Maryland's premier 7v7 soccer tournament - organized in collaboration with UMD Club Soccer
            </p>

            {/* Tournament Key Info */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-emerald-500/20 rounded-2xl">
                <Calendar className="w-5 h-5 text-emerald-400" />
                <span className="text-white font-semibold">TBD • 12pm-8pm</span>
              </div>
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-emerald-500/20 rounded-2xl">
                <span className="text-emerald-400 font-semibold">$20</span>
                <span className="text-white font-semibold">per player</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25"
              >
                <Bell className="w-5 h-5" />
                <span className="font-semibold">Get Notified</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              
              <button
                onClick={() => {
                  const detailsSection = document.getElementById('details');
                  if (detailsSection) {
                    const navHeight = 80;
                    const offsetTop = detailsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    window.scrollTo({
                      top: offsetTop,
                      behavior: 'smooth'
                    });
                  }
                }}
                className="group flex items-center gap-3 px-8 py-4 bg-slate-800/50 text-white border-2 border-slate-600 rounded-xl hover:border-emerald-500 transition-all duration-300 transform hover:scale-105"
              >
                <span className="font-semibold">Learn More</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator - Similar to main page */}
        <div className={`absolute bottom-6 sm:bottom-8 left-1/2 transform -translate-x-1/2 z-20 transition-all duration-500 ${
          isAtTop ? 'opacity-100' : 'opacity-60'
        }`}>
          <button 
            onClick={() => {
              const detailsSection = document.getElementById('details');
              if (detailsSection) {
                const navHeight = 80;
                const offsetTop = detailsSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                window.scrollTo({
                  top: offsetTop,
                  behavior: 'smooth'
                });
              }
            }}
            className={`flex flex-col items-center text-white transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-transparent rounded-xl p-3 sm:p-4 bg-transparent hover:bg-white/10 border-transparent hover:border-white/20 shadow-none hover:shadow-lg ${
              isAtTop 
                ? 'animate-bounce hover:animate-bounce' 
                : 'hover:animate-none opacity-80 hover:opacity-100'
            }`}
            aria-label="Scroll to tournament details"
          >
            <span className={`text-xs sm:text-sm mb-1 sm:mb-2 font-medium tracking-wide transition-all duration-300 ${
              isAtTop 
                ? 'text-white/90 hover:text-white' 
                : 'text-white hover:text-white'
            }`}>
              Tournament Details
            </span>
            <ChevronDown className={`w-5 h-5 sm:w-6 sm:h-6 transition-all duration-300 ${
              isAtTop 
                ? 'animate-pulse text-white/90 hover:text-white' 
                : 'text-white/80 hover:text-white'
            }`} />
          </button>
        </div>
      </section>

      {/* Tournament Details */}
      <section id="details" className="py-20 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <div 
            ref={detailsRef as any}
            className={`transition-all duration-1000 ${
              detailsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Tournament{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  Details
                </span>
              </h2>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
                Get ready for the most exciting soccer tournament of the year, exclusively for Gambeta community members
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {tournamentDetails.map((detail, index) => {
                const Icon = detail.icon;
                return (
                  <div 
                    key={index}
                    className="group p-6 bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-slate-700 rounded-2xl hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="text-white font-semibold">{detail.title}</h3>
                    </div>
                    <p className="text-2xl font-bold text-emerald-400 mb-2">{detail.value}</p>
                    <p className="text-slate-400 text-sm">{detail.description}</p>
                  </div>
                );
              })}
            </div>

            {/* Tournament Highlights */}
            <div className="bg-gradient-to-br from-slate-800/30 to-slate-900/30 border border-slate-700 rounded-3xl p-8 md:p-12 mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Tournament Highlights
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full flex-shrink-0"></div>
                    <p className={`text-slate-300 ${highlight.includes('SUGGESTED') ? 'text-slate-400 italic' : ''}`}>
                      {highlight.replace(' // Suggested addition', '')}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Tournament Format Section */}
            <div className="bg-gradient-to-br from-emerald-500/5 to-teal-600/5 border border-emerald-500/20 rounded-3xl p-8 md:p-12">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
                Tournament Format & Registration
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Format Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">7v7</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Game Format</h4>
                      <p className="text-slate-300">7 vs 7 matches with 25-minute games in round robin format</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">4</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Guaranteed Games</h4>
                      <p className="text-slate-300">Every team gets 3 round robin games, then elimination tournament</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Trophy className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Championship Format</h4>
                      <p className="text-slate-300">Sudden death elimination tournament determines the overall winner</p>
                    </div>
                  </div>
                </div>

                {/* Registration Details */}
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Team Requirements</h4>
                      <p className="text-slate-300">Minimum 8 players per team, maximum 16 teams total</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white font-bold text-sm">$20</span>
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Entry Fee</h4>
                      <p className="text-slate-300">$20 per player - sign up and create teams through the Gambeta App</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                      <Star className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg mb-2">Player Ranking</h4>
                      <p className="text-slate-300">Tournament performance can update/boost your player ranking in the app</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Section - Hero Style */}
      <section id="registration" className="relative min-h-screen flex items-center justify-center overflow-hidden py-20">
        {/* Background with gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-slate-900/60 to-teal-900/40"></div>
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative px-4 md:px-6">
          <div 
            ref={registrationRef as any}
            className={`text-center transition-all duration-1000 ${
              registrationInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-8">
              <Trophy className="w-6 h-6 text-emerald-400 animate-pulse" />
              <span className="text-emerald-300 font-semibold text-lg">Tournament Registration</span>
            </div>

            {/* Main Title */}
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
              Be the First to{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
                Join the Action
              </span>
            </h2>

            {/* Subtitle */}
            <p className="text-xl md:text-2xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Tournament registration will be available exclusively through the Gambeta App. 
              Get notified when the app launches and tournament sign-ups go live!
            </p>
            
            {/* CTA Button */}
            <div className="flex justify-center mb-8">
              <button
                onClick={() => setIsSignupModalOpen(true)}
                className="group px-10 py-5 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-2xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 font-bold shadow-2xl flex items-center justify-center gap-4 text-xl"
              >
                <Mail className="w-6 h-6" />
                Sign Up for Early Access
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center text-slate-400 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>No spam, quality updates only</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Unsubscribe anytime</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                <span>Exclusive tournament access</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        SUGGESTED ADDITIONAL FEATURES (not explicitly mentioned but could enhance tournament experience):
        
        1. LIVE STREAMING & MEDIA
        - Professional cameras for championship matches
        - Live commentary team for finals
        - Real-time score updates on social media
        - Drone footage for aerial tournament highlights
        
        2. ENHANCED APP INTEGRATION
        - Live bracket updates in real-time
        - Team chat features for coordination during tournament
        - Photo sharing capabilities for team memories
        - Post-tournament player statistics and performance analytics
        - QR code check-ins for teams and spectators
        
        3. EXPANDED AMENITIES & SERVICES
        - First aid station with certified medical personnel
        - Equipment rental booth (cleats, shin guards, water bottles)
        - Tournament program with team profiles and player bios
        - Silent auction or raffle for local charity
        - Professional massage therapy station for players
        
        4. NETWORKING & DEVELOPMENT OPPORTUNITIES
        - College soccer coach and scout attendance
        - Local club team recruitment information booth
        - Post-tournament social mixer with refreshments
        - Skills clinic sessions with UMD coaching staff
        - Panel discussion on college soccer opportunities
        
        5. SUSTAINABILITY & COMMUNITY INITIATIVES
        - Recycling and composting stations throughout venue
        - Digital-only tournament materials to reduce waste
        - Carpooling coordination through Gambeta app
        - Local vendor partnerships for food and beverages
        - Tree planting initiative for each team registered
        
        6. ENHANCED AWARDS & RECOGNITION
        - Top scorer award with custom trophy
        - Best goalkeeper award with specialized recognition
        - Sportsmanship award voted by players
        - Team spirit award for best fan support
        - Tournament MVP award with special ceremony
        - All-tournament team selection
        
        7. TECHNOLOGY ENHANCEMENTS
        - Electronic scoreboard displays throughout venue
        - WiFi hotspots for spectator connectivity
        - Mobile charging stations
        - Digital photo booth with tournament branding
        - Live tournament statistics dashboard
      */}

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </div>
  );
};

export default Tournament;
