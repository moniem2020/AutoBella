'use client';

import React from 'react';
import { Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function SavingPlanPage() {
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
                        Saving Plan
                    </h1>
                    <p className="font-body text-2xl text-[#C9A961] mb-2" dir="rtl">باقة التوفير</p>
                    <p className="font-body text-xl text-white/80 mb-2">4 washes per month</p>
                    <p className="font-body text-lg text-white/60">Standard Wash Only</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
                        <div className="text-center mb-6">
                            <h3 className="font-display text-4xl text-white mb-2">Standard Wash</h3>
                            <p className="text-[#C9A961] text-lg font-semibold mb-4">Quick Exterior (غسيل خارجي سريع)</p>

                            <div className="my-6">
                                <span className="text-xl text-white/60 align-top">EGP</span>
                                <span className="text-6xl md:text-7xl font-bold text-[#C9A961] align-middle mx-2">
                                    500
                                </span>
                                <span className="text-base text-white/60 block mt-2">/month</span>
                            </div>
                            <p className="text-white/70 text-lg mb-4">4 washes per month</p>
                        </div>

                        <ul className="space-y-3 mb-8 flex-grow">
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                <span className="text-white/80">Pre-washing Foam (رغوة ما قبل الغسيل)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                <span className="text-white/80">Specialized Shampoo wash (غسيل بشامبو مخصص)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                <span className="text-white/80">Rinsing (شطف بالمياه)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                <span className="text-white/80">Car Drying (تجفيف السيارة)</span>
                            </li>
                            <li className="flex items-start">
                                <Check className="w-5 h-5 text-[#C9A961] mr-3 mt-0.5 shrink-0" />
                                <span className="text-white/80">Tire Shine (تلميع الكاوتش)</span>
                            </li>
                        </ul>

                        <Link
                            href="/membership-registration?plan=saving&type=standard"
                            className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center"
                        >
                            Select Saving Plan / اختر باقة التوفير
                        </Link>
                    </div>
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
