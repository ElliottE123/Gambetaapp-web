import { Linkedin, Instagram, Mail } from 'lucide-react';
import { useInView } from '../hooks/useInView';
import { IMAGES } from '../utils/images';

interface FoundersProps {
  onNavigateToContact?: () => void;
}

const Founders = ({ onNavigateToContact }: FoundersProps = {}) => {
  const [headerRef, headerInView] = useInView({ threshold: 0.1 });
  
  // Create individual hooks for each founder to enable incremental loading
  const [founder1Ref, founder1InView] = useInView({ threshold: 0.1 });
  const [founder2Ref, founder2InView] = useInView({ threshold: 0.1 });
  const [ctaRef, ctaInView] = useInView({ threshold: 0.1 });

  const founders = [
    {
      id: 1,
      name: "Santiago Peralta",
      title: "Co-Founder, CEO & Product Strategist",
      image: IMAGES.founders.founder1,
      bio: "Santiago's soccer journey spans from youth leagues to adult recreational play, where he discovered that the sport's true magic lies in the communities it creates. With his background in product design and user experience, he understands that great products solve real problems elegantly. Santiago leads Gambeta's product strategy with a focus on creating features that enhance rather than replace the authentic social connections that make soccer special.",
      social: {
        linkedin: "https://www.linkedin.com/in/santiagoperaltamarin/",
        instagram: "https://www.instagram.com/santi.pera/",
        email: "Sanyi14@outlook.com"
      }
    },
    
    {
      id: 2,
      name: "Elliott Eager",
      title: "Co-Founder, CTO & Lead Engineer",
      image: IMAGES.founders.founder2,
      bio: "Elliott's passion for soccer began on local fields where he learned that the best games happen when diverse groups of players come together. As an experienced software engineer with expertise in mobile development and backend systems, he witnessed how technology could eliminate barriers between people. His technical vision for Gambeta focuses on creating seamless, intuitive experiences that make organizing and joining soccer games as natural as kicking a ball.",
      social: {
        linkedin: "https://www.linkedin.com/in/elliott-eager-99582b82",
        instagram:  "https://www.instagram.com/elliotteager/",
        email: "Elliotte123@icloud.com"
      }
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div 
          ref={headerRef as any}
          className={`text-center mb-20 transition-all duration-800 ease-out ${
            headerInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Meet the <span className="text-emerald-400">Founders</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Two soccer enthusiasts who turned their shared passion into a solution 
            that's bringing communities together worldwide.
          </p>
        </div>

        {/* Founders Grid */}
        <div className="space-y-16 md:space-y-20">
          {founders.map((founder, index) => {
            // Get the appropriate ref and inView state for each founder
            const founderRefs = [founder1Ref, founder2Ref];
            const founderInViews = [founder1InView, founder2InView];
            const currentRef = founderRefs[index];
            const currentInView = founderInViews[index];
            
            return (
              <div 
                key={founder.id}
                ref={currentRef as any}
                className={`flex flex-col ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                } items-center gap-8 md:gap-12 lg:gap-16 transition-all duration-1000 ease-out ${
                  currentInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
              {/* Image Column */}
              <div className="flex-1 w-full max-w-xs sm:max-w-sm lg:max-w-md xl:max-w-lg">
                <div className="relative group mx-auto">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                  <div className="relative bg-slate-800 p-2 rounded-2xl shadow-xl group-hover:shadow-2xl transition-all duration-300 transform group-hover:-translate-y-2">
                    <div className="aspect-square overflow-hidden rounded-xl">
                      <img
                        src={founder.image}
                        alt={founder.name}
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content Column */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {founder.name}
                </h3>
                <p className="text-xl text-emerald-400 font-semibold mb-6">
                  {founder.title}
                </p>
                <p className="text-lg text-gray-300 leading-relaxed mb-8">
                  {founder.bio}
                </p>
                
                {/* Social Links */}
                <div className="flex justify-center lg:justify-start space-x-4">
                  <a
                    href={founder.social.linkedin || "#"}
                    className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={`${founder.name}'s LinkedIn`}
                    onClick={!founder.social.linkedin ? (e) => e.preventDefault() : undefined}
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.social.instagram || "#"}
                    className="bg-pink-500 hover:bg-pink-600 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={`${founder.name}'s Instagram`}
                    onClick={!founder.social.instagram ? (e) => e.preventDefault() : undefined}
                  >
                    <Instagram className="w-5 h-5" />
                  </a>
                  <a
                    href={founder.social.email ? `mailto:${founder.social.email}` : "#"}
                    className="bg-gray-600 hover:bg-gray-700 text-white p-3 rounded-full transition-all duration-300 transform hover:scale-110 hover:shadow-lg"
                    aria-label={`Email ${founder.name}`}
                    onClick={!founder.social.email ? (e) => e.preventDefault() : undefined}
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div 
          ref={ctaRef as any}
          className={`text-center mt-20 transition-all duration-800 ease-out ${
            ctaInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="bg-gradient-to-r from-slate-800/50 to-slate-700/50 border border-emerald-500/20 rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Connect?
            </h3>
            <p className="text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
              We'd love to hear from you! Whether you have questions, feedback, or just want to 
              chat about soccer, don't hesitate to reach out.
            </p>
            <button
              onClick={onNavigateToContact}
              className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Founders;
