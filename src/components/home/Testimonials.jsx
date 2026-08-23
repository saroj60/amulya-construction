import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import TestimonialCard from '../ui/TestimonialCard';
import { TESTIMONIALS, COMPANY } from '@/data';
import { api } from '@/services/api';

export default function Testimonials() {
  const [list, setList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCards, setVisibleCards] = useState(3);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    api.getTestimonials()
      .then(data => {
        if (data && data.length > 0) {
          setList(data);
        } else {
          setList(TESTIMONIALS);
        }
      })
      .catch(() => {
        setList(TESTIMONIALS);
      });
  }, []);

  // Update visible cards based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setVisibleCards(3);
      } else if (window.innerWidth >= 768) {
        setVisibleCards(2);
      } else {
        setVisibleCards(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxIndex = Math.max(0, list.length - visibleCards);

  // Auto-slide every 5 seconds
  useEffect(() => {
    if (isPaused || list.length <= visibleCards) return;
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [isPaused, maxIndex, list.length, visibleCards]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev >= maxIndex ? 0 : prev + 1));
  };

  return (
    <section
      className="section-padding bg-slate-50/50 border-t border-gray-150/50 overflow-hidden"
      aria-label="Client testimonials"
    >
      <div className="container-custom">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest block mb-2">TESTIMONIALS</span>
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tight leading-tight">
            What Our <span className="text-orange-500">Clients Say</span>
          </h2>
          <div className="w-12 h-1 bg-orange-500 rounded-full mx-auto mt-4" />
          <p className="text-gray-505 text-xs md:text-sm mt-4 leading-relaxed max-w-2xl mx-auto">
            Real feedback from homeowners, businesses, and institutions we've built across Kathmandu and Kathmandu District.
          </p>
        </div>

        {/* Carousel Slider */}
        {list.length > 0 && (
          <div 
            className="relative group/carousel px-4"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Viewport wrapper */}
            <div className="overflow-hidden w-full relative py-2">
              <div 
                className="flex transition-transform duration-500 ease-out" 
                style={{ transform: `translateX(-${currentIndex * (100 / visibleCards)}%)` }}
              >
                {list.map((t, i) => (
                  <div 
                    key={t.id || i} 
                    className="flex-shrink-0 px-3 transition-all duration-300"
                    style={{ width: `${100 / visibleCards}%` }}
                  >
                    <TestimonialCard 
                      testimonial={t} 
                      index={i} 
                      isFeatured={i === 0} 
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {list.length > visibleCards && (
              <>
                <button
                  onClick={handlePrev}
                  className="absolute top-1/2 -left-2 md:-left-6 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-150 shadow-md rounded-full flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Previous testimonials"
                >
                  <Icons.ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="absolute top-1/2 -right-2 md:-right-6 -translate-y-1/2 z-10 w-10 h-10 bg-white border border-gray-150 shadow-md rounded-full flex items-center justify-center text-slate-700 hover:text-orange-500 hover:border-orange-500/30 transition-all cursor-pointer hover:scale-105 active:scale-95"
                  aria-label="Next testimonials"
                >
                  <Icons.ChevronRight className="w-5 h-5" />
                </button>
              </>
            )}
          </div>
        )}

        {/* Pagination Dots */}
        {list.length > visibleCards && (
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: list.length - visibleCards + 1 }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === idx ? 'bg-orange-500 w-5' : 'bg-gray-300 hover:bg-gray-450'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}

        {/* Trust Indicator Strip */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-y-2.5 gap-x-6 px-6 py-3.5 bg-white border border-gray-150/60 shadow-sm rounded-full text-[10px] font-black text-slate-400 uppercase tracking-widest">
            <div className="flex items-center gap-1.5">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Icons.Star key={i} className="w-3.5 h-3.5 text-orange-500 fill-orange-500" />
                ))}
              </div>
              <span className="text-slate-800">5.0 Average Rating</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-1.5">
              <Icons.ShieldCheck className="w-4 h-4 text-orange-500" />
              <span>Trusted by Homeowners & Businesses</span>
            </div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 hidden md:block" />
            
            <div className="flex items-center gap-1.5">
              <Icons.Award className="w-4 h-4 text-orange-500" />
              <span>{COMPANY.stats.yearsExperience} of Experience</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
