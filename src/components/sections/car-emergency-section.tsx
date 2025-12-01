'use client';

import React from 'react';
import { Battery, Disc, Wrench } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        icon: Battery,
        title: 'Battery Issue',
        arabicTitle: 'عطل بطارية',
        description: 'Dead battery? We will jump-start or replace it on the spot.',
        price: 'Price on Inspection',
        priceAr: 'يحدد في الموقع',
    },
    {
        icon: Disc,
        title: 'Tire Issue',
        arabicTitle: 'عطل كاوتش',
        description: 'Flat tire? We will change it or repair it quickly.',
        price: 'Price on Inspection',
        priceAr: 'يحدد في الموقع',
    },
    {
        icon: Wrench,
        title: 'Tow Truck',
        arabicTitle: 'ونش إنقاذ',
        description: 'Stuck on the road? Our tow trucks are ready to help.',
        price: 'Price on Inspection',
        priceAr: 'يحدد في الموقع',
    },
];

const CarEmergencySection = ({ onBookNow }: { onBookNow?: () => void }) => {
    return (
        <section className="relative bg-black text-white pt-32 pb-16 overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center justify-center p-3 bg-[#dc2626]/10 rounded-full mb-6 border border-[#dc2626]/20">
                        <span className="text-[#dc2626] font-semibold tracking-wider uppercase text-sm">24/7 Emergency Service</span>
                    </div>
                    <h1 className="font-display text-5xl md:text-7xl text-white mb-6">
                        Car <span className="text-[#dc2626]">Emergency</span>
                    </h1>
                    <h2 className="font-display text-4xl md:text-6xl text-[#dc2626] mb-8" dir="rtl">
                        طوارئ السيارات
                    </h2>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Fast and reliable roadside assistance whenever you need it.
                        <br />
                        <span dir="rtl" className="block mt-2">خدمة إنقاذ سريعة وموثوقة في أي وقت تحتاجه.</span>
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 mb-12">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-[20px] p-8 hover:bg-white/10 transition-all duration-300 group"
                        >
                            <div className="w-16 h-16 bg-[#dc2626]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                                <service.icon className="w-8 h-8 text-[#dc2626]" />
                            </div>
                            <h3 className="font-display text-2xl text-white mb-2">{service.title}</h3>
                            <h3 className="font-display text-2xl text-[#dc2626] mb-4" dir="rtl">{service.arabicTitle}</h3>
                            <p className="text-white/60 mb-4">{service.description}</p>
                            <div className="border-t border-white/10 pt-4 mt-4">
                                <p className="text-[#C9A961] font-semibold text-lg">{service.price}</p>
                                <p className="text-white/50 text-sm" dir="rtl">{service.priceAr}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Book Now Button */}
                <div className="text-center">
                    <button
                        onClick={onBookNow}
                        className="inline-flex items-center gap-3 bg-[#dc2626] hover:bg-[#b91c1c] text-white font-semibold px-12 py-4 rounded-full uppercase tracking-wider text-lg transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                        Book Now / احجز الآن
                    </button>
                </div>
            </div>
        </section>
    );
};

export default CarEmergencySection;
