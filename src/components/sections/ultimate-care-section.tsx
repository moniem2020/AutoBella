"use client";

import React from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

const services = [
    {
        id: 'polish',
        name: 'Polish Section',
        nameAr: 'قسم البوليش',
        image: '/car-care-section.jpg', // Fixed: this should be the polishing image
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
        image: '/polish-section.jpg', // Fixed: this should be the car care image
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
        image: '/removal-section.jpg',
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
                            className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] overflow-hidden shadow-[0_8px_24px_rgba(0,0,0,0.3)] hover:border-[#C9A961]/40 hover:shadow-[0_12px_32px_rgba(201,169,97,0.2)] transition-all duration-300 flex flex-col"
                        >
                            {/* Service Image - Full Width */}
                            <div className="relative w-full h-56 overflow-hidden group">
                                <Image
                                    src={service.image}
                                    alt={service.name}
                                    fill
                                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
                                {/* Service Name Overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                                    <h3 className="font-display text-2xl text-white drop-shadow-lg">
                                        {service.name}
                                    </h3>
                                    <p className="text-[#C9A961] text-base font-semibold drop-shadow-lg" dir="rtl">
                                        {service.nameAr}
                                    </p>
                                </div>
                            </div>

                            {/* Content Section with Padding */}
                            <div className="p-6 md:p-8">
                                {/* Pricing */}
                                <div className="text-center mb-6">
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

                                {/* Features List */}
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
