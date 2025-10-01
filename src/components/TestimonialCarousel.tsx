import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
}

const TestimonialCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const intervalRef = useRef<number | null>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Marcus Rodriguez",
      location: "San Francisco, CA",
      avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "Gambeta completely changed how I play soccer. I've met amazing people and found games every week. The community is incredible!",
      rating: 5
    },
    {
      id: 2,
      name: "Sarah Chen",
      location: "Austin, TX",
      avatar: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "As someone new to the city, Gambeta helped me find my soccer family. The skill matching feature is spot-on!",
      rating: 5
    },
    {
      id: 3,
      name: "David Thompson",
      location: "Miami, FL",
      avatar: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "The app makes organizing games so easy. No more endless group chats trying to coordinate 20 people!",
      rating: 5
    },
    {
      id: 4,
      name: "Elena Vasquez",
      location: "Los Angeles, CA",
      avatar: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "I love how I can track my progress and connect with players who share my passion for the beautiful game.",
      rating: 5
    },
    {
      id: 5,
      name: "James Wilson",
      location: "Seattle, WA",
      avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "Gambeta brought back my love for soccer. Finding quality games and great people has never been easier.",
      rating: 5
    },
    {
      id: 6,
      name: "Priya Patel",
      location: "Chicago, IL",
      avatar: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop&crop=face",
      quote: "The community features are amazing. I've made lifelong friends through this app!",
      rating: 5
    }
  ];

  const itemsPerView = {
    mobile: 1,
    desktop: 3
  };

  const maxIndex = Math.max(0, testimonials.length - itemsPerView.desktop);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, maxIndex]);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, maxIndex)));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    } else if (isRightSwipe) {
      prevSlide();
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-lg ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            What Our <span className="text-green-500">Community</span> Says
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Join thousands of soccer enthusiasts who have found their perfect game through Gambeta.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Buttons - Desktop */}
          <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-0 right-0 justify-between pointer-events-none z-10">
            <button
              onClick={prevSlide}
              className="pointer-events-auto bg-slate-800/90 hover:bg-slate-700 shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 -translate-x-4"
              aria-label="Previous testimonials"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextSlide}
              className="pointer-events-auto bg-slate-800/90 hover:bg-slate-700 shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 transform hover:scale-110 translate-x-4"
              aria-label="Next testimonials"
            >
              <ChevronRight className="w-6 h-6 text-gray-700" />
            </button>
          </div>

          {/* Testimonials Container */}
          <div
            className="overflow-hidden"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / itemsPerView.desktop)}%)`
              }}
            >
              {testimonials.map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="w-full md:w-1/3 flex-shrink-0 px-4"
                >
                  <div className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 backdrop-blur-sm p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-emerald-500/20 hover:border-emerald-400/40 h-full">
                    {/* Rating Stars */}
                    <div className="flex justify-center mb-4">
                      {renderStars(testimonial.rating)}
                    </div>
                    
                    {/* Quote */}
                    <blockquote className="text-gray-300 text-lg leading-relaxed mb-6 text-center italic">
                      "{testimonial.quote}"
                    </blockquote>
                    
                    {/* User Info */}
                    <div className="flex items-center justify-center">
                      <img
                        src={testimonial.avatar}
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full object-cover mr-4 border-2 border-emerald-400/50"
                      />
                      <div className="text-center">
                        <div className="font-semibold text-white">
                          {testimonial.name}
                        </div>
                        <div className="text-sm text-gray-400">
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile Navigation Dots */}
          <div className="flex md:hidden justify-center mt-8 space-x-2">
            {Array.from({ length: testimonials.length }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-green-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${i + 1}`}
              />
            ))}
          </div>

          {/* Desktop Navigation Dots */}
          <div className="hidden md:flex justify-center mt-8 space-x-2">
            {Array.from({ length: maxIndex + 1 }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-green-500 scale-125'
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Control */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-300 text-sm font-medium text-gray-700"
            >
              {isAutoPlaying ? (
                <>
                  <Pause className="w-4 h-4" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  Play
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialCarousel;
