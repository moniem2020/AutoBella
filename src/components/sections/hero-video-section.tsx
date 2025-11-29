'use client';

import React from 'react';
import { Droplets, Sparkles, Zap, Star } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const customStyles = `
  @keyframes fade-in-slide-up {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
  }

  @keyframes pulse-glow {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 0.8; }
  }

  @keyframes slide-in-left {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes bounce-in {
    0% {
      opacity: 0;
      transform: scale(0.8) translateY(20px);
    }
    60% {
      opacity: 1;
      transform: scale(1.05) translateY(-5px);
    }
    100% {
      opacity: 1;
      transform: scale(1) translateY(0);
    }
  }

  @keyframes gradient-shift {
    0%, 100% { 
      background-position: 0% 50%;
    }
    50% { 
      background-position: 100% 50%;
    }
  }

  @keyframes particle-float {
    0% {
      transform: translateY(0) translateX(0) scale(1);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    90% {
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) translateX(50px) scale(0.5);
      opacity: 0;
    }
  }

  @keyframes rotate-slow {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }

  @keyframes foam-rise {
    0% {
      transform: translateY(100vh) translateX(0) scale(0.5);
      opacity: 0;
    }
    10% {
      opacity: 0.7;
    }
    50% {
      transform: translateY(50vh) translateX(var(--foam-move-x, 30px)) scale(1);
      opacity: 0.9;
    }
    100% {
      transform: translateY(-20vh) translateX(var(--foam-move-x, 50px)) scale(0.3);
      opacity: 0;
    }
  }

  @keyframes bubble-float {
    0% {
      transform: translateY(0) scale(1);
      opacity: 0.8;
    }
    50% {
      transform: translateY(-30px) scale(1.1);
      opacity: 1;
    }
    100% {
      transform: translateY(-60px) scale(0.8);
      opacity: 0;
    }
  }

  @keyframes water-drip {
    0% {
      transform: translateY(-100px);
      opacity: 0;
    }
    20% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(100vh);
      opacity: 0;
    }
  }
  
  .animate-text-reveal {
    animation: fade-in-slide-up 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-slide-left {
    animation: slide-in-left 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  }

  .animate-bounce-in {
    animation: bounce-in 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  .float-icon {
    animation: float 3s ease-in-out infinite;
  }

  .pulse-glow {
    animation: pulse-glow 2s ease-in-out infinite;
  }

  .gradient-mesh {
    animation: gradient-shift 15s ease infinite;
    background-size: 200% 200%;
  }

  .particle {
    animation: particle-float linear infinite;
  }

  .rotate-slow {
    animation: rotate-slow 20s linear infinite;
  }

  .foam-bubble {
    animation: foam-rise linear infinite;
  }

  .floating-bubble {
    animation: bubble-float ease-in-out infinite;
  }

  .water-drop {
    animation: water-drip linear infinite;
  }
`;

const HeroVideoSection = () => {
  return (
    <>
      <style>{customStyles}</style>
      <section className="relative h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-black">

        {/* Animated Gradient Mesh Background */}
        <div
          className="absolute inset-0 z-0 gradient-mesh opacity-30"
          style={{
            background: 'linear-gradient(45deg, #C9A961 0%, #000000 25%, #5FA8A8 50%, #000000 75%, #C9A961 100%)',
          }}
        />

        {/* Radial Gradient Overlays */}
        <div className="absolute inset-0 z-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-[#C9A961]/20 via-transparent to-transparent blur-3xl" />
          <div className="absolute bottom-0 right-0 w-full h-full bg-gradient-radial from-[#5FA8A8]/15 via-transparent to-transparent blur-3xl" />
        </div>

        {/* Foam Bubbles - Car Wash Effect */}
        <div className="absolute inset-0 z-12 pointer-events-none overflow-hidden">
          {[...Array(25)].map((_, i) => (
            <div
              key={`foam-${i}`}
              className="foam-bubble absolute"
              style={{
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 80}px`,
                height: `${20 + Math.random() * 80}px`,
                animationDuration: `${8 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 8}s`,
                bottom: '-100px',
                '--foam-move-x': `${(Math.random() - 0.5) * 100}px`,
              } as React.CSSProperties}
            >
              <div
                className="w-full h-full rounded-full bg-white/30 backdrop-blur-sm border border-white/40"
                style={{
                  background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.6), rgba(255,255,255,0.2))',
                  boxShadow: 'inset 0 0 20px rgba(255,255,255,0.3), 0 0 20px rgba(201,169,97,0.2)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Smaller Floating Bubbles */}
        <div className="absolute inset-0 z-13 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={`bubble-${i}`}
              className="floating-bubble absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${10 + Math.random() * 30}px`,
                height: `${10 + Math.random() * 30}px`,
                animationDuration: `${3 + Math.random() * 3}s`,
                animationDelay: `${Math.random() * 3}s`,
              }}
            >
              <div
                className="w-full h-full rounded-full bg-white/40 backdrop-blur-sm"
                style={{
                  background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.7), rgba(255,255,255,0.1))',
                  boxShadow: 'inset 0 0 15px rgba(255,255,255,0.4)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Water Droplets */}
        <div className="absolute inset-0 z-11 pointer-events-none overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <div
              key={`drop-${i}`}
              className="water-drop absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${2 + Math.random() * 2}s`,
                animationDelay: `${Math.random() * 4}s`,
                top: '-100px',
              }}
            >
              <div
                className="w-1 h-3 rounded-full bg-gradient-to-b from-white/60 to-blue-300/40"
                style={{
                  boxShadow: '0 0 8px rgba(255,255,255,0.5)',
                }}
              />
            </div>
          ))}
        </div>

        {/* Decorative Car Logo - Large Background with Rotation */}
        <div className="absolute inset-0 z-10 flex items-center justify-center opacity-10 pointer-events-none">
          <div className="rotate-slow">
            <Image
              src="/autobella-logo-car.png"
              alt=""
              width={800}
              height={800}
              className="w-[600px] md:w-[800px] h-auto"
            />
          </div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 z-15 pointer-events-none overflow-hidden">
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="particle absolute"
              style={{
                left: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`,
                bottom: '-10px',
              }}
            >
              {i % 3 === 0 ? (
                <Droplets className="w-4 h-4 text-[#5FA8A8]" style={{ opacity: 0.3 }} />
              ) : i % 3 === 1 ? (
                <Sparkles className="w-3 h-3 text-[#C9A961]" style={{ opacity: 0.4 }} />
              ) : (
                <Star className="w-3 h-3 text-[#C9A961]" style={{ opacity: 0.3 }} />
              )}
            </div>
          ))}
        </div>

        {/* Floating Decorative Icons - Enhanced */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <div className="absolute top-20 left-10 float-icon" style={{ animationDelay: '0s' }}>
            <Droplets className="w-12 h-12 md:w-16 md:h-16 text-[#5FA8A8] opacity-30" />
          </div>

          <div className="absolute top-32 right-16 float-icon" style={{ animationDelay: '1s' }}>
            <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-[#C9A961] opacity-40" />
          </div>

          <div className="absolute bottom-32 left-20 float-icon" style={{ animationDelay: '0.5s' }}>
            <Zap className="w-14 h-14 md:w-20 md:h-20 text-[#C9A961] opacity-25" />
          </div>

          <div className="absolute bottom-24 right-12 float-icon" style={{ animationDelay: '1.5s' }}>
            <Droplets className="w-10 h-10 md:w-14 md:h-14 text-[#5FA8A8] opacity-35" />
          </div>

          <div className="absolute top-1/4 left-1/4 pulse-glow" style={{ animationDelay: '0.3s' }}>
            <Star className="w-6 h-6 md:w-8 md:h-8 text-[#C9A961] opacity-50" />
          </div>

          <div className="absolute bottom-1/3 right-1/4 pulse-glow" style={{ animationDelay: '0.8s' }}>
            <Sparkles className="w-8 h-8 md:w-10 md:h-10 text-[#C9A961] opacity-40" />
          </div>

          <div className="absolute top-1/2 right-1/3 pulse-glow" style={{ animationDelay: '1.2s' }}>
            <Zap className="w-7 h-7 md:w-9 md:h-9 text-[#5FA8A8] opacity-35" />
          </div>
        </div>

        {/* Glowing Orbs */}
        <div className="absolute inset-0 z-8 pointer-events-none">
          <div className="absolute top-1/4 left-1/3 w-64 h-64 bg-[#C9A961] rounded-full blur-[120px] opacity-20 pulse-glow" />
          <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[#5FA8A8] rounded-full blur-[140px] opacity-15 pulse-glow" style={{ animationDelay: '1s' }} />
          <div className="absolute top-1/2 left-1/4 w-48 h-48 bg-[#C9A961] rounded-full blur-[100px] opacity-25 pulse-glow" style={{ animationDelay: '0.5s' }} />
        </div>

        {/* Main Content */}
        <div className="relative z-30 text-center px-4 max-w-6xl mx-auto">
          {/* Main Headlines */}
          <h1
            className="font-display text-[3rem] md:text-[4.5rem] lg:text-[6rem] leading-none tracking-tight text-white animate-text-reveal drop-shadow-[0_0_30px_rgba(201,169,97,0.3)]"
          >
            Welcome to
          </h1>
          <h1
            className="font-display text-[3rem] md:text-[4.5rem] lg:text-[6rem] leading-none tracking-tight mt-4 text-white animate-text-reveal drop-shadow-[0_0_30px_rgba(201,169,97,0.3)]"
            style={{ animationDelay: '200ms' }}
          >
            AutoBella
          </h1>

          {/* Subtitle */}
          <p className="font-body text-lg md:text-xl lg:text-2xl mt-8 mb-12 max-w-3xl mx-auto leading-relaxed text-white/90 opacity-0 animate-text-reveal drop-shadow-lg" style={{ animationDelay: '400ms' }}>
            Premium mobile car wash service that comes to you. Professional quality, eco-friendly products, and exceptional care, delivered right to your doorstep.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8 opacity-0 animate-bounce-in" style={{ animationDelay: '600ms' }}>
            <Link
              href="/booking"
              className="bg-[#C9A961] hover:bg-[#b89850] text-black px-8 py-4 rounded-full font-semibold text-base md:text-lg tracking-wide shadow-[0_0_30px_rgba(201,169,97,0.4)] hover:shadow-[0_0_40px_rgba(201,169,97,0.6)] transition-all duration-300 hover:scale-105 flex items-center gap-2"
            >
              <Droplets className="w-5 h-5" />
              Book A Wash
            </Link>
            <Link
              href="/client-memberships"
              className="bg-transparent border-2 border-white/80 hover:bg-white hover:text-black text-white px-8 py-4 rounded-full font-semibold text-base md:text-lg tracking-wide shadow-lg hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 hover:scale-105"
            >
              Book As A Member
            </Link>
          </div>

          {/* Feature Badges */}
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 mt-12 opacity-0 animate-slide-left" style={{ animationDelay: '800ms' }}>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A961]/30 shadow-lg">
              <Sparkles className="w-5 h-5 text-[#C9A961]" />
              <span className="text-sm md:text-base font-medium text-white/90">Eco-Friendly</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A961]/30 shadow-lg">
              <Image src="/autobella-logo-car.png" alt="" width={20} height={20} className="w-5 h-5" />
              <span className="text-sm md:text-base font-medium text-white/90">Mobile Service</span>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-[#C9A961]/30 shadow-lg">
              <Droplets className="w-5 h-5 text-[#C9A961]" />
              <span className="text-sm md:text-base font-medium text-white/90">Premium Quality</span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
};

export default HeroVideoSection;