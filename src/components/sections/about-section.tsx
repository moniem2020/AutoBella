'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Sparkles, Award, Clock } from 'lucide-react';

const AboutSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = sectionRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black py-20 md:py-32 overflow-hidden"
    >
      {/* Decorative car logo background */}
      <div className="absolute top-20 right-0 opacity-5 pointer-events-none">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={400}
          height={400}
          className="w-[400px] h-auto"
        />
      </div>

      <div className="mx-auto max-w-[1300px] px-6 md:px-12 lg:px-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Text Column */}
          <div
            className={`space-y-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >
            <div className="inline-flex items-center gap-2 bg-[#C9A961]/10 px-4 py-2 rounded-full border border-[#C9A961]/30">
              <Sparkles className="w-4 h-4 text-[#C9A961]" />
              <span className="text-[#C9A961] uppercase text-sm tracking-wider font-semibold">
                About Us
              </span>
            </div>

            <h2 className="font-display text-white text-5xl md:text-6xl lg:text-7xl leading-tight">
              AutoBella
            </h2>

            <p className="font-body text-white/80 text-lg md:text-xl leading-relaxed">
              With AutoBella, car care becomes effortless. Our teams reach you wherever you are and whenever you need us delivering quick, smooth service, trusted quality, and an experience that stays with you.
            </p>

            {/* Feature Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all">
                <Award className="w-8 h-8 text-[#C9A961] mb-2" />
                <h3 className="font-body font-semibold text-white mb-1">Premium Quality</h3>
                <p className="font-body text-sm text-white/60">Eco-friendly products & expert care</p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm p-4 rounded-xl border border-[#C9A961]/20 hover:border-[#C9A961]/40 hover:bg-white/10 transition-all">
                <Clock className="w-8 h-8 text-[#C9A961] mb-2" />
                <h3 className="font-body font-semibold text-white mb-1">Fast Service</h3>
                <p className="font-body text-sm text-white/60">We come to you in minutes</p>
              </div>
            </div>

            <Link
              href="/services"
              className="inline-flex items-center gap-2 bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 px-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-lg"
            >
              Book A Wash
              <Sparkles className="w-5 h-5" />
            </Link>
          </div>

          {/* Image Column */}
          <div
            className={`relative transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
              }`}
          >
            <div className="relative">
              {/* Decorative background circles */}
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#5FA8A8]/10 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-64 h-64 bg-[#C9A961]/10 rounded-full blur-3xl" />

              <div className="relative">
                <Image
                  src="/autobella-logo-car.png"
                  alt="AutoBella car"
                  width={600}
                  height={600}
                  className="w-full h-auto max-w-[500px] mx-auto drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;