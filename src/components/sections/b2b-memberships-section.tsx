import React from 'react';
import { Button } from '@/components/ui/button';
import { Building2, Users, ShoppingBag, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const plans = [
  {
    icon: Building2,
    name: 'Residential Compound',
    description: 'Complete car care solutions for residential communities',
    features: [
      'Regular scheduled visits',
      'Discounted rates for residents',
      'Dedicated service team',
      'Flexible monthly packages',
    ],
  },
  {
    icon: Users,
    name: 'Company Fleet',
    description: 'Professional fleet management for corporate vehicles',
    features: [
      'Volume-based pricing',
      'Priority scheduling',
      'Detailed service reports',
      'Account manager support',
    ],
  },
  {
    icon: ShoppingBag,
    name: 'Mall Services',
    description: 'Premium car wash services for shopping mall visitors',
    features: [
      'On-site service stations',
      'Quick turnaround times',
      'Premium service packages',
      'Partnership opportunities',
    ],
  },
];

const B2bMembershipsSection = () => {
  const checkerboardPattern = `url("data:image/svg+xml,%3csvg width='64' height='64' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='32' height='32' x='0' y='0' fill='%23C9A961' fill-opacity='0.1' /%3e%3crect width='32' height='32' x='32' y='0' fill='transparent' /%3e%3crect width='32' height='32' x='0' y='32' fill='transparent' /%3e%3crect width='32' height='32' x='32' y='32' fill='%23C9A961' fill-opacity='0.1' /%3e%3c/svg%3e")`;

  return (
    <section
      className="relative bg-[#1a1a1a] text-white font-body overflow-hidden"
    >
      {/* Decorative car logo */}
      <div className="absolute bottom-0 right-0 opacity-5 pointer-events-none">
        <Image
          src="/autobella-logo-car.png"
          alt=""
          width={400}
          height={400}
          className="w-[400px] h-auto"
        />
      </div>

      <div
        className="h-16 w-full bg-repeat-x opacity-20"
        style={{
          backgroundImage: checkerboardPattern,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="max-w-[1300px] mx-auto px-6 md:px-12 py-16 md:py-24 relative z-10">
        <div className="text-center mb-16">
          <h1
            className="font-display text-5xl md:text-7xl text-[#C9A961]"
          >
            B2B Memberships
          </h1>
          <p className="text-lg md:text-xl text-white/70 mt-4 font-body">
            Custom fleet solutions for businesses and communities
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10"
            >
              <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-6 border border-[#C9A961]/30">
                <plan.icon className="w-8 h-8 text-[#C9A961]" />
              </div>

              <h3 className="font-display text-3xl text-white mb-4">{plan.name}</h3>
              <p className="text-white/70 text-base mb-6 leading-relaxed">{plan.description}</p>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                    <span className="text-white/80 text-sm">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Custom Quote CTA */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-black/50 backdrop-blur-md rounded-[20px] shadow-lg border border-[#C9A961]/30 p-8 md:p-12 text-center">
            <h2 className="font-display text-3xl md:text-4xl text-white mb-4">Get Your Custom Quote</h2>
            <p className="text-white/70 text-lg mb-8">
              Each business has unique needs. Let us create a tailored plan with custom pricing that works for you.
            </p>
            <p className="text-white/60 text-base mb-8">
              Our sales team will discuss your requirements and provide personalized pricing based on your fleet size, service frequency, and specific needs.
            </p>
            <Link
              href="/b2b-request"
              className="inline-block bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold px-12 py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg"
            >
              Request Custom Quote
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2bMembershipsSection;