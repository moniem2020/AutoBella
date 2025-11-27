import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, User, CalendarDays, FileText, Leaf, CheckCircle2 } from 'lucide-react';
import Image from 'next/image';

const benefits = [
  { icon: Briefcase, text: 'Flexible fleet packages' },
  { icon: User, text: 'Dedicated account manager' },
  { icon: CalendarDays, text: 'Priority scheduling' },
  { icon: FileText, text: 'Custom billing solutions' },
  { icon: Leaf, text: 'Eco-friendly options' },
];

const companyLogos = ['FleetCo', 'LogistiX', 'DriveNow', 'CorpCars', 'GreenVan', 'BizMove'];

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
            Fleet solutions for businesses
          </p>
        </div>

        <div className="grid lg:grid-cols-10 gap-12 lg:gap-16 items-start">

          <div className="lg:col-span-6 space-y-16">
            <div>
              <h2 className="font-display text-4xl text-white mb-8">Corporate Benefits</h2>
              <ul className="space-y-6">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-6">
                    <benefit.icon className="h-10 w-10 text-[#C9A961] shrink-0" />
                    <span className="text-[1.125rem] leading-tight text-white/90 font-medium">{benefit.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-center text-white/60 font-semibold mb-6">Trusted by 50+ companies</p>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-4 items-center">
                {companyLogos.map((logo, index) => (
                  <div key={index} className="flex justify-center items-center p-4 bg-white/5 rounded-lg h-20 transition-all duration-300 hover:bg-white/10 hover:shadow-md border border-white/10">
                    <span className="text-sm font-bold text-white/50">{logo}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-lg shadow-sm backdrop-blur-sm border border-[#C9A961]/20">
              <blockquote className="text-center">
                <p className="text-lg italic text-white/90 leading-relaxed">"AutoBella's B2B service has streamlined our fleet management. Their reliability and quality are unmatched."</p>
                <footer className="mt-4 text-sm font-semibold text-[#C9A961]">— Alex Rivera, Operations at FleetCo</footer>
              </blockquote>
            </div>

          </div>

          <div className="lg:col-span-4 lg:sticky lg:top-24">
            <Card className="bg-black/50 backdrop-blur-md rounded-lg shadow-lg border border-[#C9A961]/20">
              <CardHeader>
                <CardTitle className="font-display text-3xl text-center text-white">Custom Quote</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/70 text-center mb-6">Let's build a plan that's perfect for your fleet's needs.</p>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A961] mr-3 mt-1 shrink-0" />
                    <span className="text-white/90">Access to all corporate benefits</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A961] mr-3 mt-1 shrink-0" />
                    <span className="text-white/90">Personalized pricing based on fleet size & frequency</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A961] mr-3 mt-1 shrink-0" />
                    <span className="text-white/90">Volume discounts and special offers</span>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-[#C9A961] mr-3 mt-1 shrink-0" />
                    <span className="text-white/90">Detailed service reports and analytics</span>
                  </li>
                </ul>
                <Button className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold tracking-wide" size="lg">Request Proposal</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default B2bMembershipsSection;