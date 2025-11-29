'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const washOptions = [
    {
        type: 'standard',
        name: 'Standard Wash',
        description: 'Quick Exterior (غسيل خارجي سريع)',
        price: 600,
        washes: '4 washes/month',
        features: [
            'Pre-washing Foam (رغوة ما قبل الغسيل)',
            'Specialized Shampoo wash (غسيل بشامبو مخصص)',
            'Rinsing (شطف بالمياه)',
            'Car Drying (تجفيف السيارة)',
            'Tire Shine (تلميع الكاوتش)',
        ],
    },
    {
        type: 'premium',
        name: 'Premium Wash',
        description: 'Inside & Out (غسيل داخلي وخارجي)',
        price: 720,
        washes: '4 washes/month',
        features: [
            'Pre-washing Foam (رغوة ما قبل الغسيل)',
            'Specialized Shampoo wash (غسيل بشامبو مخصص)',
            'Rinsing (شطف بالمياه)',
            'Car Drying (تجفيف السيارة)',
            'Interior Vacuum & Wipe Down (تنظيف داخلي و شفط)',
            'Tire Shine (تلميع الكاوتش)',
            'Car Trunk Cleaning (تنظيف شنطة السيارة)',
        ],
        isFeatured: true,
    },
];

export default function PlusPlanPage() {
    return (
        <section className="relative bg-black min-h-screen overflow-hidden">
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={600}
                    height={600}
                    className="w-[600px] h-auto"
                />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 py-24 z-10">
                <div className="text-center mb-12">
                    <h1 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none mb-4">
                        Plus Plan
                    </h1>
                    <p className="font-body text-xl text-white/80 mb-2">4 washes per month</p>
                    <p className="font-body text-lg text-white/60">Choose your wash type</p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                    {washOptions.map((option) => (
                        <div
                            key={option.type}
                            className={`relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10 ${option.isFeatured
                                ? 'border-[#C9A961]/40 bg-white/10 border-t-4 border-t-[#C9A961]'
                                : 'border-[#C9A961]/20'
                                }`}
                        >
                            {option.isFeatured && (
                                <div className="absolute -top-px right-8 bg-[#C9A961] text-black text-xs font-bold px-5 py-2 rounded-b-lg shadow-lg uppercase tracking-wider">
                                    Recommended
                                </div>
                            )}

                            <div className="text-center mb-6">
                                <h3 className="font-display text-3xl text-white mb-2">{option.name}</h3>
                                <p className="text-[#C9A961] text-lg font-semibold mb-4">{option.description}</p>

                                <div className="my-6">
                                    <span className="text-xl text-white/60 align-top">EGP</span>
                                    <span className="text-6xl md:text-7xl font-bold text-[#C9A961] align-middle mx-2">
                                        {option.price}
                                    </span>
                                    <span className="text-base text-white/60 block mt-2">/month</span>
                                </div>
                            </div>

                            <ul className="space-y-3 mb-8 flex-grow">
                                {option.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                        <span className="text-white/80">{feature}</span>
                                    </li>
                                ))}
                            </ul>

                            <Link
                                href={`/membership-registration?plan=plus&type=${option.type}`}
                                className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center"
                            >
                                Select {option.name}
                            </Link>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-12">
                    <Link
                        href="/client-memberships"
                        className="inline-block text-white/50 hover:text-[#C9A961] transition-colors"
                    >
                        ← Back to all plans
                    </Link>
                </div>
            </div>
        </section>
    );
}
