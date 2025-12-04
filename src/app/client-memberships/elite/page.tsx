'use client';

import React from 'react';
import { Check, Sparkles } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function ElitePlanPage() {
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
                        Elite Plan
                    </h1>
                    <p className="font-body text-2xl text-[#C9A961] mb-2" dir="rtl">باقة النخبة</p>
                    <p className="font-body text-xl text-white/80 mb-2">Diverse Services / خدمات متنوعة</p>
                    <p className="font-body text-lg text-white/60">Premium Care Package</p>
                </div>

                <div className="max-w-2xl mx-auto">
                    <div className="relative flex flex-col bg-white/5 backdrop-blur-sm p-8 md:p-10 rounded-[20px] border border-[#C9A961]/20 shadow-[0_8px_24px_rgba(0,0,0,0.3)] transition-all duration-300 hover:-translate-y-2 hover:bg-white/10">
                        <div className="text-center mb-6">
                            <h3 className="font-display text-4xl text-white mb-2">Elite Plan</h3>
                            <p className="text-[#C9A961] text-lg font-semibold mb-4">
                                Complete Care Package (باقة العناية الكاملة)
                            </p>

                            <div className="my-6">
                                <span className="text-xl text-white/60 align-top">EGP</span>
                                <span className="text-6xl md:text-7xl font-bold text-[#C9A961] align-middle mx-2">
                                    2750
                                </span>
                                <span className="text-base text-white/60 block mt-2">/month</span>
                            </div>
                        </div>

                        <div className="mb-6">
                            <h4 className="text-white text-xl font-semibold mb-3 text-center">Plan Includes:</h4>

                            {/* 4 Standard Washes */}
                            <div className="bg-black/30 rounded-lg p-4 mb-4">
                                <p className="text-[#C9A961] font-semibold mb-2">4 Standard Washes (٤ غسلات عادية)</p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Pre-washing Foam (رغوة ما قبل الغسيل)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Specialized Shampoo wash (غسيل بشامبو مخصص)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Rinsing & Drying (شطف و تجفيف)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Tire Shine (تلميع الكاوتش)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 2 Car Care */}
                            <div className="bg-[#C9A961]/10 border border-[#C9A961]/30 rounded-lg p-4 mb-4">
                                <p className="text-[#C9A961] font-semibold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    2 Car Care Sessions (٢ كار كير)
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Comprehensive interior & exterior care (عناية شاملة)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Professional service (خدمة احترافية)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Includes Premium Wash - Inside & Outside (يشمل غسلة مميزة داخلي و خارجي)</span>
                                    </li>
                                </ul>
                            </div>

                            {/* 1 Polish & Wax */}
                            <div className="bg-gradient-to-r from-[#C9A961]/20 to-[#C9A961]/10 border border-[#C9A961]/40 rounded-lg p-4">
                                <p className="text-[#C9A961] font-semibold mb-2 flex items-center gap-2">
                                    <Sparkles className="w-4 h-4" />
                                    1 Polish & Wax Session (١ تلميع)
                                </p>
                                <ul className="space-y-2 text-sm">
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Professional polishing (تلميع احترافي)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Protective wax coating (طبقة شمع حماية)</span>
                                    </li>
                                    <li className="flex items-start">
                                        <Check className="w-4 h-4 text-[#C9A961] mr-2 mt-0.5 shrink-0" />
                                        <span className="text-white/80">Includes Premium Wash - Inside & Outside (يشمل غسلة مميزة داخلي و خارجي)</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <Link
                            href="/membership-registration?plan=elite&type=premium"
                            className="block w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg text-center"
                        >
                            Select Elite Plan / اختر باقة النخبة
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
