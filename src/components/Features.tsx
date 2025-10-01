import React from 'react';
import { Users, Calendar, Trophy, MapPin, MessageCircle, Target } from 'lucide-react';
import { useInView } from '../hooks/useInView';

const Features = () => {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const features = [
    {
      icon: Calendar,
      title: "Easy Game Organization",
      description: "Create and join local soccer games with just a few taps. Set location, time, and skill level preferences.",
      delay: "0ms"
    },
    {
      icon: Users,
      title: "Build Your Network",
      description: "Connect with fellow soccer enthusiasts in your area. Build lasting friendships through the beautiful game.",
      delay: "200ms"
    },
    {
      icon: Trophy,
      title: "Player Profiles",
      description: "Showcase your skills, track your stats, and build your reputation in the local soccer community.",
      delay: "400ms"
    },
    {
      icon: MapPin,
      title: "Find Local Fields",
      description: "Discover soccer fields and courts near you. Get directions and field information at your fingertips.",
      delay: "600ms"
    },
    {
      icon: MessageCircle,
      title: "Community Chat",
      description: "Stay connected with your soccer community through group chats, game discussions, and event coordination.",
      delay: "800ms"
    },
    {
      icon: Target,
      title: "Skill Matching",
      description: "Get matched with players of similar skill levels for balanced, competitive, and enjoyable games.",
      delay: "1000ms"
    }
  ];

  return (
    <section ref={ref} className="features-section py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className={`text-center mb-16 transition-all duration-1000 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Everything You Need to
            <span className="text-green-500"> Play Together</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Gambeta brings soccer communities together with powerful features designed 
            to make organizing and playing easier than ever.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className={`bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-700 transform hover:-translate-y-2 border border-emerald-500/20 hover:border-emerald-400/40 ${
                isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: isInView ? feature.delay : '0ms'
              }}
            >
              <div className="bg-gradient-to-br from-emerald-400/20 to-teal-600/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="w-8 h-8 text-emerald-400 transition-transform duration-300 hover:scale-110" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4 leading-tight">
                {feature.title}
              </h3>
              <p className="text-gray-300 leading-relaxed text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
