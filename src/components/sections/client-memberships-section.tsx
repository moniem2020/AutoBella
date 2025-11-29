import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const plans = [
  {
    id: 'basic',
    name: 'Basic Plan',
    washes: '8 washes/month (2 per week)',
    descriptionAr: 'حافظ على نظافة عربيتك بسهولة.',
    descriptionEn: 'Keep your car clean easily.',
    note: 'Standard Wash Only',
    price: 650,
    isFeatured: false,
  },
  {
    id: 'plus',
    name: 'Plus Plan',
    washes: '12 washes/month',
    descriptionAr: 'خلي عربيتك دايمًا نظيفة ولامعة كل أسبوع.',
    descriptionEn: 'Stay fresh and shiny every week.',
    note: '10 Standard + 2 Premium Washes',
    price: 850,
    isFeatured: true,
  },
  {
    id: 'elite',
    name: 'Elite Plan',
    washes: '20 Washes/month',
    descriptionAr: 'العناية المثالية بعربيتك طول السنة.',
    descriptionEn: 'Premium care for your car, all year round.',
    note: '18 Standard + 2 Premium Washes',
    price: 1350,
    isFeatured: false,
  },
];

const CheckeredBorder = () => (
  <div
    className="h-16 w-full"
    style={{
      backgroundColor: '#1a1a1a',
      backgroundImage: 'linear-gradient(45deg, #C9A961 25%, transparent 25%, transparent 75%, #C9A961 75%, #C9A961), linear-gradient(45deg, #C9A961 25%, transparent 25%, transparent 75%, #C9A961 75%, #C9A961)',
      backgroundSize: '64px 64px',
      backgroundPosition: '0 0, 32px 32px',
      opacity: 0.1
    }}
  />
);

const ClientMembershipsSection = () => {
  return (
    <section className="relative bg-black overflow-hidden">
      {/* Decorative car logo */}
      <div className="absolute top-0 left-0 opacity-5 pointer-events-none">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={500}
          height={500}
          className="w-[500px] h-auto"
        />
      </div>

      <CheckeredBorder />

      <div className="relative max-w-[1300px] mx-auto px-6 lg:px-12 py-24 z-10">
        <div className="text-center mb-12">
          <h2 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none">
            Client Memberships
          </h2>
          <p className="font-body text-xl text-white/80 mt-4 max-w-2xl mx-auto">
            Monthly plans for regular car care
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-end">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 hover:border-[#C9A961]/40 ${plan.isFeatured ? 'border-t-4 border-t-[#C9A961] lg:scale-105 z-10 bg-white/10' : 'lg:scale-95'}`}
            >
              {plan.isFeatured && (
                <div className="absolute -top-px right-8 bg-[#C9A961] text-black text-xs font-bold px-5 py-2 rounded-b-lg shadow-lg uppercase tracking-wider">
                  Most Popular
                </div>
              )}
              <div className="text-center pt-4">
                <h3 className="font-display text-4xl text-white mb-3">{plan.name}</h3>
                <p className="text-[#C9A961] text-2xl font-semibold mb-6">{plan.washes}</p>

                <div className="my-6 space-y-2">
                  <p className="text-white/70 text-lg leading-relaxed" dir="rtl">{plan.descriptionAr}</p>
                  <p className="text-white/70 text-lg leading-relaxed italic">{plan.descriptionEn}</p>
                </div>

                <p className="text-white/50 text-sm mb-6 leading-relaxed">{plan.note}</p>

                <div className="my-6">
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-xl text-white/60 align-top">EGP</span>
                    <span className="text-5xl md:text-6xl font-bold text-[#C9A961] align-middle">{plan.price}</span>
                    <span className="text-base text-white/60 self-end mb-2">/month</span>
                  </div>
                </div>
              </div>

              <Link
                href={`/client-memberships/${plan.id}`}
                className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 rounded-full mt-auto uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center"
              >
                Select Plan
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-16 max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm border border-[#C9A961] rounded-[20px] p-8 shadow-[0_0_30px_rgba(201,169,97,0.1)] relative overflow-hidden group hover:bg-white/10 transition-colors duration-300">
            {/* Decorative corner accent */}
            <div className="absolute top-0 right-0 w-20 h-20 bg-[#C9A961]/10 rounded-bl-[100px] -mr-10 -mt-10 transition-transform group-hover:scale-110 duration-500"></div>
            <div className="absolute bottom-0 left-0 w-20 h-20 bg-[#C9A961]/10 rounded-tr-[100px] -ml-10 -mb-10 transition-transform group-hover:scale-110 duration-500"></div>

            <h4 className="text-[#C9A961] font-display text-2xl mb-4 flex items-center justify-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-[#C9A961]"></span>
              Special Offer
              <span className="inline-block w-2 h-2 rounded-full bg-[#C9A961]"></span>
            </h4>

            <p className="text-white/90 text-lg font-body mb-3">
              Special offers for each villa vary depending on the number of participating cars
            </p>
            <p className="text-white/80 text-lg font-body" dir="rtl">
              عروض خاصه للفيلا الواحده تختلف حسب عدد عربيات المشتركه
            </p>
          </div>

          <p className="text-sm text-white/50 mt-8">
            All plans include eco-friendly products and doorstep service.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ClientMembershipsSection;