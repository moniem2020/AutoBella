"use client";

import React from 'react';
import { Check, Quote } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const services = [
  {
    name: 'Standard Wash',
    subtitle: 'Quick Exterior (غسيل خارجي سريع)',
    price: '150',
    features: [
      'Pre-washing Foam (رغوة ما قبل الغسيل)',
      'Specialized Shampoo wash (غسيل بشامبو مخصص)',
      'Rinsing (شطف بالمياه)',
      'Car Drying (تجفيف السيارة)',
      'Tire Shine (تلميع الكاوتش)'
    ],
    isFeatured: false,
  },
  {
    name: 'Premium Wash',
    subtitle: 'Inside & Out (غسيل داخلي وخارجي)',
    price: '250',
    features: [
      'Pre-washing Foam (رغوة ما قبل الغسيل)',
      'Specialized Shampoo wash (غسيل بشامبو مخصص)',
      'Rinsing (شطف بالمياه)',
      'Car Drying (تجفيف السيارة)',
      'Interior Vacuum & Wipe Down (تنظيف داخلي و شفط)',
      'Tire Shine (تلميع الكاوتش)',
      'Car Trunk Cleaning (تنظيف شنطة السيارة)'
    ],
    isFeatured: true,
  },
];

const testimonials = [
  {
    name: 'أحمد محمد',
    review: 'خدمة ممتازة وسريعة! العربية بقت لامعة زي الجديدة. شكراً أوتوبيلا',
  },
  {
    name: 'سارة علي',
    review: 'أفضل غسيل عربيات جربته. الفريق محترف جداً والنتيجة رائعة',
  },
  {
    name: 'محمود حسن',
    review: 'الخدمة في البيت وفرت عليا وقت كتير. جودة عالية وسعر مناسب',
  },
  {
    name: 'نور الدين',
    review: 'عربيتي بقت نضيفة من جوا وبرة. شغل احترافي ١٠٠٪',
  },
  {
    name: 'ياسمين خالد',
    review: 'التعامل راقي والنتيجة فوق التوقعات. هستخدم الخدمة تاني أكيد',
  },
  {
    name: 'سيد علي',
    review: 'جميل جدا',
  },
  {
    name: 'سامي شاكر',
    review: 'خدمة ممتازة',
  },
];

const ServicesDetailSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = React.useState(0);

  React.useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 5000); // Change testimonial every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-black overflow-hidden">
      {/* Decorative car logo */}
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={600}
          height={600}
          className="w-[600px] h-auto"
        />
      </div>

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12 py-24 z-10">
        <div className="text-center mb-16">
          <h2 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none mb-4">
            Services
          </h2>
          <p className="font-body text-xl text-white/80 max-w-2xl mx-auto">
            Professional car wash services at your doorstep
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-24">
          {services.map((service) => (
            <div
              key={service.name}
              className={`relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A961]/40 ${service.isFeatured ? 'border-t-4 border-t-[#C9A961] md:scale-105 z-10 bg-white/10' : ''}`}
            >
              {service.isFeatured && (
                <div className="absolute -top-px right-8 bg-[#C9A961] text-black text-xs font-bold px-5 py-2 rounded-b-lg shadow-lg uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="text-center pt-4">
                <h3 className="font-display text-4xl text-white mb-2">{service.name}</h3>
                <p className="text-white/60 text-lg mb-6 font-medium">{service.subtitle}</p>
                <div className="my-6">
                  <span className="text-xl text-white/60 align-top">EGP</span>
                  <span className="text-6xl md:text-7xl font-bold text-[#C9A961] align-middle mx-2">{service.price}</span>
                </div>
              </div>

              <ul className="space-y-4 my-8 flex-grow text-left">
                {service.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                    <span className="text-white/90 font-body text-base leading-relaxed">{feature}</span>
                  </li>
                ))}
              </ul>

              <Link href="/booking" className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 rounded-full mt-auto uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center">
                Book Now
              </Link>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h3 className="font-display text-[#C9A961] text-4xl md:text-5xl leading-none mb-4">
              More Services
            </h3>
            <p className="font-body text-lg text-white/70">
              Explore our membership plans and business solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1200px] mx-auto">
            {/* Client Memberships */}
            <div className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A961]/40">
              <div className="text-center mb-6">
                <h3 className="font-display text-4xl text-white mb-4">Client Memberships</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Subscribe to our monthly membership plans and enjoy regular washes at discounted rates. Choose from Basic, Plus, or Elite plans.
                </p>
                <p className="text-[#C9A961] text-xl font-semibold mb-2" dir="rtl">
                  اشتراكات العملاء
                </p>
                <p className="text-white/70 text-base" dir="rtl">
                  اشترك في خطط العضوية الشهرية واستمتع بغسيل منتظم بأسعار مخفضة
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow text-left">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">3-6 washes per month</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Standard & Premium options</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Starting from EGP 450/month</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Flexible scheduling</span>
                </div>
              </div>

              <Link href="/client-memberships" className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center">
                View Plans
              </Link>
            </div>

            {/* B2B Services */}
            <div className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A961]/40">
              <div className="text-center mb-6">
                <h3 className="font-display text-4xl text-white mb-4">B2B Solutions</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Custom car wash solutions for businesses, residential compounds, companies, and malls. Get a personalized quote based on your needs.
                </p>
                <p className="text-[#C9A961] text-xl font-semibold mb-2" dir="rtl">
                  حلول الأعمال
                </p>
                <p className="text-white/70 text-base" dir="rtl">
                  حلول غسيل سيارات مخصصة للشركات والمجمعات السكنية
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow text-left">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Residential Compounds</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Corporate Solutions</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Shopping Malls</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Custom pricing</span>
                </div>
              </div>

              <Link href="/b2b-request" className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center">
                Request Quote
              </Link>
            </div>

            {/* Ultimate Car Care */}
            <div className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A961]/40">
              <div className="text-center mb-6">
                <h3 className="font-display text-4xl text-white mb-4">Ultimate Car Care</h3>
                <p className="text-white/80 text-lg leading-relaxed mb-4">
                  Professional car detailing, polishing, and restoration services. From paint correction to stain removal, we bring your car back to life.
                </p>
                <p className="text-[#C9A961] text-xl font-semibold mb-2" dir="rtl">
                  العناية الفائقة بالسيارة
                </p>
                <p className="text-white/70 text-base" dir="rtl">
                  خدمات تجميل وتلميع وإصلاح السيارات الاحترافية
                </p>
              </div>

              <div className="space-y-3 mb-6 flex-grow text-left">
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Polish Section (قسم البوليش)</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Car Care Section (قسم الكار كير)</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Removal Section (قسم الازالات)</span>
                </div>
                <div className="flex items-start">
                  <Check className="h-5 w-5 text-[#C9A961] mr-3 mt-1 flex-shrink-0" />
                  <span className="text-white/90 font-body text-base">Starting from 650 EGP</span>
                </div>
              </div>

              <Link href="/ultimate-care" className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center">
                Book Now
              </Link>
            </div>
          </div>
        </div>

        {/* Testimonials Slider */}
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="font-display text-[#C9A961] text-4xl md:text-5xl leading-none mb-4">
              آراء عملائنا
            </h3>
            <p className="font-body text-lg text-white/70">
              Customer Testimonials
            </p>
          </div>

          <div className="relative bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.3)] min-h-[250px] flex flex-col justify-center">
            <Quote className="absolute top-6 left-6 h-12 w-12 text-[#C9A961]/30" fill="currentColor" />

            <div className="relative z-10 transition-all duration-500 ease-in-out" key={currentTestimonial}>
              <p className="text-white text-2xl md:text-3xl leading-relaxed mb-6 text-center font-body" dir="rtl">
                "{testimonials[currentTestimonial].review}"
              </p>
              <p className="text-[#C9A961] text-xl font-semibold text-center">
                — {testimonials[currentTestimonial].name}
              </p>
            </div>

            {/* Dots indicator */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentTestimonial(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentTestimonial
                    ? 'w-8 bg-[#C9A961]'
                    : 'w-2 bg-white/30 hover:bg-white/50'
                    }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesDetailSection;