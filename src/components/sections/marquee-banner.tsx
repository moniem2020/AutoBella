import React from 'react';
import { Sparkles, Clock, Shield, Award } from 'lucide-react';
import Image from 'next/image';

const MarqueeBanner = () => {
  const marqueeItems = [
    { icon: <Sparkles className="w-5 h-5 inline-block" />, text: "Fast Car Wash, Delivers to Your Doorstep" },
    { icon: <Clock className="w-5 h-5 inline-block" />, text: "Book Online in Minutes" },
    { icon: <Shield className="w-5 h-5 inline-block" />, text: "100% Eco-Friendly Products" },
    { icon: <Award className="w-5 h-5 inline-block" />, text: "Premium Quality Service" },
    { icon: <Image src="/autobella-logo-car.png" alt="" width={20} height={20} className="w-5 h-5 inline-block" />, text: "Follow us @AutoBella" },
  ];

  const keyframes = `
    @keyframes marquee-scroll {
      0% { transform: translateX(0%); }
      100% { transform: translateX(-50%); }
    }
  `;

  const goldColor = '#C9A961';
  const darkColor = '#1a1a1a';

  const borderStyles: React.CSSProperties = {
    backgroundImage: `
      repeating-linear-gradient(to right, ${goldColor} 0, ${goldColor} 30px, ${darkColor} 30px, ${darkColor} 60px),
      repeating-linear-gradient(to right, ${darkColor} 0, ${darkColor} 30px, ${goldColor} 30px, ${goldColor} 60px)
    `,
    backgroundSize: '60px 10px, 60px 10px',
    backgroundPosition: '0 0, 30px 10px',
    height: '20px',
    flexShrink: 0,
  };

  const textContent = (
    <>
      {marqueeItems.map((item, index) => (
        <span key={index} className="font-body font-semibold text-[#C9A961] text-[1.1rem] md:text-[1.4rem] tracking-wide px-6 md:px-8 whitespace-nowrap inline-flex items-center gap-2">
          {item.icon && <span className="text-[#C9A961]">{item.icon}</span>}
          {item.text}
          <span className="text-[#C9A961] mx-2">•</span>
        </span>
      ))}
    </>
  );

  return (
    <>
      <style>{keyframes}</style>
      <section className="w-full overflow-hidden bg-black h-[70px] md:h-[90px] flex flex-col">
        <div style={borderStyles} />
        <div className="flex-grow group flex items-center overflow-hidden">
          <div className="flex animate-[marquee-scroll_60s_linear_infinite] group-hover:[animation-play-state:paused] whitespace-nowrap">
            {textContent}
            {textContent}
            {textContent}
          </div>
        </div>
        <div style={borderStyles} />
      </section>
    </>
  );
};

export default MarqueeBanner;