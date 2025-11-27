import Image from 'next/image';
import { Star, Clock, Leaf, CalendarCheck, Truck, ShowerHead, Car, Quote } from 'lucide-react';

const AboutPageSection = () => {
  const values = [
    {
      icon: Star,
      title: "Quality Service",
      description: "We are committed to delivering a flawless finish every time, using only the best products and techniques.",
    },
    {
      icon: Clock,
      title: "Convenience",
      description: "Your time is precious. We come to you, on your schedule, making car care completely effortless.",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "We protect your car and our planet by using water-saving methods and biodegradable supplies.",
    },
  ];

  const howItWorksSteps = [
    {
      icon: CalendarCheck,
      title: "Book Online",
      description: "Pick a service and a time that works for you through our simple online platform.",
    },
    {
      icon: Truck,
      title: "We Arrive",
      description: "Our expert team arrives at your location with everything needed for the job.",
    },
    {
      icon: ShowerHead,
      title: "We Wash",
      description: "Sit back and relax while we give your car a professional, detailed clean.",
    },
    {
      icon: Car,
      title: "You Drive",
      description: "Enjoy your sparkling clean car, ready for the road ahead. It's that simple.",
    },
  ];



  return (
    <div className="relative isolate bg-black text-white">
      {/* Decorative background */}
      <div
        className="absolute inset-0 -z-10 h-full w-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 50% 0%, rgba(201,169,97,0.15) 0%, rgba(0,0,0,0) 50%)'
        }}
      ></div>

      <main>
        {/* Hero Section */}
        <section className="relative py-24 sm:py-32 overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
                <h1 className="font-display text-5xl md:text-7xl lg:text-8xl text-[#C9A961] mb-6">
                  About AutoBella
                </h1>
                <p className="text-xl text-white/80 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                  Redefining car care with premium mobile service that respects your time and the environment.
                </p>
              </div>
              <div className='flex justify-center relative'>
                {/* Decorative glow */}
                <div className="absolute inset-0 bg-[#C9A961]/20 blur-[100px] rounded-full pointer-events-none" />
                <Image
                  src="/autobella-logo-car.png"
                  alt="AutoBella car wash service illustration"
                  width={500}
                  height={500}
                  className="mx-auto relative z-10 drop-shadow-2xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="bg-[#1a1a1a] py-24 sm:py-32 relative overflow-hidden">
          {/* Decorative car logo */}
          <div className="absolute top-10 left-10 opacity-5 pointer-events-none">
            <Image
              src="/autobella-logo-car.png"
              alt=""
              width={300}
              height={300}
              className="w-[300px] h-auto"
            />
          </div>

          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="mx-auto max-w-3xl text-center">
              <p className="font-body text-lg md:text-xl text-white/90 leading-[1.8]">
                Founded with a vision to revolutionize car care, AutoBella brings premium washing services directly to your doorstep. We believe that a clean car reflects a clear mind, and our mission is to make that experience convenient, exceptional, and environmentally conscious.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-black py-24 sm:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-6xl text-[#C9A961]">Our Values</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <div key={index} className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 p-8 rounded-2xl text-center shadow-lg transform hover:-translate-y-2 transition-all duration-300 hover:border-[#C9A961]/40 hover:bg-white/10">
                    <Icon className="mx-auto h-12 w-12 text-[#C9A961] mb-6" strokeWidth={1.5} />
                    <h3 className="font-body text-2xl font-semibold text-white mb-4">{value.title}</h3>
                    <p className="text-white/70 leading-relaxed">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>


        {/* How It Works Section */}
        <section className="bg-black py-24 sm:py-32">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="text-center mb-20">
              <h2 className="font-display text-4xl md:text-6xl text-[#C9A961]">How It Works</h2>
            </div>
            <div className="relative">
              <div className="hidden md:block absolute top-[5.5rem] left-0 w-full h-0.5 bg-[#C9A961]/20" aria-hidden="true"></div>
              <div className="relative grid grid-cols-1 md:grid-cols-4 gap-x-8 gap-y-16">
                {howItWorksSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <div key={index} className="text-center flex flex-col items-center group">
                      <div className="relative z-10 w-28 h-28 mb-6 flex items-center justify-center rounded-full bg-black border-2 border-[#C9A961] group-hover:scale-110 transition-transform duration-300 shadow-[0_0_20px_rgba(201,169,97,0.2)]">
                        <span className="font-display text-5xl text-[#C9A961]">{index + 1}</span>
                      </div>
                      <Icon className="h-10 w-10 text-white mb-4 group-hover:text-[#C9A961] transition-colors" strokeWidth={1.5} />
                      <h3 className="font-body text-xl font-semibold text-white mb-2">{step.title}</h3>
                      <p className="text-white/60 text-sm max-w-xs">{step.description}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement Section */}
        <section className="bg-[#1a1a1a] py-24 sm:py-32 relative overflow-hidden">
          <div className="container mx-auto px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              <Quote className="mx-auto h-16 w-16 text-[#C9A961]/50 mb-8" fill="currentColor" />
              <blockquote className="font-display text-3xl md:text-5xl text-white leading-tight">
                To provide a seamless and superior car care experience that combines quality, convenience, and sustainability for every client.
              </blockquote>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AboutPageSection;