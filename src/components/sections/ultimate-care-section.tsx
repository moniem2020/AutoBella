"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const services = [
    {
        id: 'polish',
        name: 'Polish Section',
        nameAr: 'قسم البوليش',
        price: 700,
        priceNote: 'per stage (لكل مرحلة)',
        features: [
            'Professional polishing (تلميع احترافي)',
            'Multi-layer application (تطبيق متعدد الطبقات)',
            'Pre-work inspection (معاينة قبل العمل)',
            'Custom layer count (عدد طبقات مخصص)',
            'Technician assessment (تقييم الفني)',
        ],
    },
    {
        id: 'car-care',
        name: 'Car Care Section',
        nameAr: 'قسم الكار كير',
        priceStart: 650,
        priceNote: 'starting price (السعر الابتدائي)',
        features: [
            'Comprehensive care (عناية شاملة)',
            'Condition assessment (تقييم الحالة)',
            'Technical inspection (معاينة فنية)',
            'Custom pricing (أسعار مخصصة)',
            'Professional service (خدمة احترافية)',
        ],
    },
    {
        id: 'removal',
        name: 'Removal Section',
        nameAr: 'قسم الازالات',
        priceNote: 'determined on-site (يحدد في الموقع)',
        features: [
            'Asphalt removal (ازالة الاسفلت)',
            'Cement removal (ازالة الاسمنت)',
            'Paint removal (ازالة الدهانات)',
            'Salt removal (ازالة الاملاح)',
            'On-site pricing (تحديد السعر في حينه)',
        ],
    },
];

const UltimateCareCareSection = () => {
    const router = useRouter();

    return (
        <section className="relative bg-black min-h-screen overflow-hidden">
            {/* Decorative car logo */}
            <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={600}
                    height={600}
                    className="w-[600px] h-auto"
                />
            </div>

            <div className="relative max-w-[1200px] mx-auto px-6 lg:px-12 py-24 z-10">
                <div className="text-center mb-16">
                    <h1 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none mb-4">
                        Ultimate Car Care
                    </h1>
                    <p className="font-body text-xl text-white/80 mb-2">
                        Professional Car Detailing & Restoration Services
                    </p>
                    <p className="font-body text-lg text-white/60" dir="rtl">
                        خدمات تجميل وإصلاح السيارات الاحترافية
                    </p>
                </div>

                {/* Services Overview */}
                <div className="grid md:grid-cols-3 gap-8 mb-16">
                    {services.map((service) => (
                        <div
                            key={service.id}
                            className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-6 md:p-8 shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-[#C9A961]/40 transition-all duration-300 flex flex-col"
                        >
                            <div className="text-center mb-6">
                                <h3 className="font-display text-2xl text-white mb-2">
                                    {service.name}
                                </h3>
                                <p className="text-[#C9A961] text-lg font-semibold" dir="rtl">
                                    {service.nameAr}
                                </p>

                                {service.price && (
                                    <div className="mt-4">
                                        <span className="text-3xl font-bold text-[#C9A961]">{service.price} EGP</span>
                                        <span className="text-white/60 text-sm block mt-1">{service.priceNote}</span>
                                    </div>
                                )}
                                {service.priceStart && (
                                    <div className="mt-4">
                                        <span className="text-white/60 text-sm block mb-1">Starting from</span>
                                        <span className="text-3xl font-bold text-[#C9A961]">{service.priceStart} EGP</span>
                                        <span className="text-white/60 text-sm block mt-1">{service.priceNote}</span>
                                    </div>
                                )}
                                {!service.price && !service.priceStart && (
                                    <div className="mt-4">
                                        <span className="text-xl font-bold text-[#C9A961]">Price on Inspection</span>
                                        <span className="text-white/60 text-sm block mt-1">{service.priceNote}</span>
                                    </div>
                                )}
                            </div>

                            <ul className="space-y-3 mt-2 flex-grow">
                                {service.features.map((feature, idx) => (
                                    <li key={idx} className="flex items-start">
                                        <div className="mt-1 mr-3 flex-shrink-0">
                                            <div className="h-2 w-2 rounded-full bg-[#C9A961]" />
                                        </div>
                                        <span className="text-white/80 text-sm leading-relaxed">{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* CTA Section */}
                <div className="max-w-[800px] mx-auto text-center mt-16">
                    <div className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                        <h2 className="font-display text-[#C9A961] text-4xl mb-4">
                            Ready to Transform Your Car?
                        </h2>
                        <p className="text-white/80 text-lg mb-2">
                            Book your professional detailing service today.
                        </p>
                        <p className="text-white/60 text-lg mb-8" dir="rtl">
                            احجز خدمة العناية بسيارتك اليوم
                        </p>

                        <button
                            onClick={() => router.push('/ultimate-care/book')}
                            className="inline-block bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 px-12 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg"
                        >
                            Book Now
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UltimateCareCareSection;
