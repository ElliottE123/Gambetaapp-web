import { useState } from 'react';
import { Trophy, Calendar, ArrowRight, Bell, Star, Users, MapPin } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import SignupModal from './SignupModal';

interface TournamentAnnouncementProps {
  onNavigateToTournament: () => void;
  onNavigateToTournamentDetails?: () => void;
}

const TournamentAnnouncement: React.FC<TournamentAnnouncementProps> = ({ 
  onNavigateToTournament, 
  onNavigateToTournamentDetails 
}) => {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [detailsRef, detailsInView] = useInView({ threshold: 0.1 });
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);

  const quickStats = [
    { icon: Users, label: "16 Teams Max", value: "8+ Players Each" },
    { icon: MapPin, label: "UMD College Park", value: "Pre-organized Fields" },
    { icon: Trophy, label: "$1,000 Prize", value: "To Winning Team" }
  ];

  return (
    <section id="tournament-announcement" className="py-20 md:py-32 px-4 md:px-6 bg-gradient-to-b from-slate-900 to-slate-800 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-10 w-80 h-80 bg-teal-600/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        {/* Main Announcement */}
        <div 
          ref={ref as any}
          className={`text-center mb-20 transition-all duration-1000 ${
            isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Tournament Badge */}
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500/20 to-teal-600/20 border border-emerald-500/30 rounded-full mb-8">
            <Trophy className="w-6 h-6 text-emerald-400 animate-pulse" />
            <span className="text-emerald-300 font-semibold text-lg">Tournament Announcement</span>
          </div>

          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight">
            Introducing the{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-500 bg-clip-text text-transparent">
              Gambeta Cup
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl lg:text-3xl text-slate-300 mb-12 max-w-4xl mx-auto leading-relaxed">
            University of Maryland's inaugural 7v7 soccer tournament in collaboration with UMD Club Soccer
          </p>

          {/* Date Announcement */}
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-800/80 to-slate-900/80 border border-emerald-500/20 rounded-2xl mb-8">
            <Calendar className="w-6 h-6 text-emerald-400" />
            <span className="text-white font-semibold text-lg">TBD • 12pm-8pm</span>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button
              onClick={() => setIsSignupModalOpen(true)}
              className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-xl hover:from-emerald-600 hover:to-teal-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-emerald-500/25 font-semibold text-lg"
            >
              <Bell className="w-5 h-5" />
              <span>Get Notified</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            
            <button
              onClick={onNavigateToTournamentDetails || onNavigateToTournament}
              className="group flex items-center gap-3 px-8 py-4 bg-slate-800/50 text-white border-2 border-slate-600 rounded-xl hover:border-emerald-500 transition-all duration-300 transform hover:scale-105 font-semibold text-lg"
            >
              <span>Learn More</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Tournament Details Preview */}
        <div 
          ref={detailsRef as any}
          className={`transition-all duration-1000 delay-300 ${
            detailsInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {quickStats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={index}
                  className="group p-8 bg-gradient-to-br from-slate-800/40 to-slate-900/40 border border-slate-700/50 rounded-3xl hover:border-emerald-500/50 transition-all duration-500 hover:shadow-xl hover:shadow-emerald-500/10 text-center"
                >
                  <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-emerald-400 mb-2">{stat.label}</h3>
                  <p className="text-slate-300 font-medium text-lg">{stat.value}</p>
                </div>
              );
            })}
          </div>

          {/* Additional Info */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-2xl">
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="text-slate-300 font-medium">
                Sign up through the Gambeta App • $20 per player • Unlimited spectators welcome!
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Signup Modal */}
      <SignupModal 
        isOpen={isSignupModalOpen} 
        onClose={() => setIsSignupModalOpen(false)} 
      />
    </section>
  );
};

export default TournamentAnnouncement;
