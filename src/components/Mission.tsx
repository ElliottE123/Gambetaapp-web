import { useInView } from '../hooks/useInView';

interface MissionProps {
  onNavigateToContact?: () => void;
}

const Mission = ({ onNavigateToContact }: MissionProps = {}) => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  const [quoteRef, quoteInView] = useInView({ threshold: 0.1 });
  const [paragraphRef, paragraphInView] = useInView({ threshold: 0.1 });
  const [decorativeRef, decorativeInView] = useInView({ threshold: 0.1 });

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.pexels.com/photos/1171084/pexels-photo-1171084.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop)'
        }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-900/70 to-emerald-800/80" />
      
      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center text-white">
        {/* Page Title */}
        <div 
          ref={headerRef as any} 
          className={`transition-all duration-800 ease-out mb-8 ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-bold text-emerald-400 mb-4">Our Mission</h1>
        </div>

        {/* Mission Quote */}
        <div 
          ref={quoteRef as any}
          className={`transition-all duration-1000 ease-out delay-200 ${
            quoteInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <blockquote className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight mb-12 italic">
            "Our mission is to unite the global soccer community, 
            <span className="text-emerald-400"> one local game at a time.</span>"
          </blockquote>
        </div>
        
        {/* Supporting Paragraph */}
        <div 
          ref={paragraphRef as any}
          className={`transition-all duration-1000 ease-out delay-400 ${
            paragraphInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <p className="text-lg md:text-xl lg:text-2xl leading-relaxed max-w-4xl mx-auto text-gray-200">
            In a world where digital connections often replace real ones, Gambeta bridges the gap 
            between online convenience and authentic, in-person soccer experiences. We believe that 
            the beautiful game has the power to bring people together, create lasting friendships, 
            and build stronger communities. Our platform makes it effortless for soccer enthusiasts 
            to find their tribe, organize meaningful games, and celebrate the sport they love.
          </p>
        </div>
        
        {/* Decorative Elements */}
        <div 
          ref={decorativeRef as any}
          className={`flex justify-center mt-12 transition-all duration-800 ease-out delay-600 ${
            decorativeInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}
        >
          <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full" />
        </div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-emerald-400/30 rounded-full animate-pulse" />
      <div className="absolute bottom-32 right-16 w-6 h-6 bg-teal-400/20 rounded-full animate-bounce" />
      <div className="absolute top-1/3 right-8 w-3 h-3 bg-white/20 rounded-full animate-pulse" />
    </section>
  );
};

export default Mission;
