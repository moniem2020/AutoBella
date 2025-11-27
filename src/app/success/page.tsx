"use client";

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { MapPin, CheckCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const SuccessContent = () => {
    const searchParams = useSearchParams();
    const type = searchParams.get('type');

    const isMembership = type === 'membership';

    const whatsappNumber = '201009441336';
    const messageText = isMembership
        ? '📍 I would like to share my location for the membership service'
        : '📍 I would like to share my location for the mobile wash service';

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    return (
        <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 py-24 z-10 flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-24 h-24 bg-green-500/10 rounded-full flex items-center justify-center mb-8 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <CheckCircle className="w-12 h-12 text-green-500" />
            </div>

            <h1 className="font-display text-[#C9A961] text-4xl md:text-6xl leading-none mb-6">
                {isMembership ? 'Registration Received!' : 'Booking Received!'}
            </h1>

            <p className="font-body text-xl text-white/80 mb-12 max-w-2xl">
                Thank you for choosing AutoBella. We have received your request.
                <br />
                <span className="text-white font-semibold mt-2 block">
                    To complete your request, please share your exact location.
                </span>
            </p>

            <div className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-10 w-full max-w-lg shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                <div className="flex flex-col items-center">
                    <div className="w-16 h-16 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-6 border border-[#C9A961]/20">
                        <MapPin className="w-8 h-8 text-[#C9A961]" />
                    </div>

                    <h3 className="text-2xl font-display text-white mb-4">Share Your Location</h3>

                    <p className="text-white/60 mb-8 text-sm md:text-base">
                        Please send your current location via WhatsApp to help our team find you easily. You can use Google Maps or Apple Maps to share your exact pin.
                    </p>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#1ebd56] text-white font-bold py-4 rounded-full uppercase tracking-wider text-base transition-all hover:scale-105 duration-300 shadow-lg flex items-center justify-center gap-3"
                    >
                        <MapPin className="w-5 h-5" />
                        Share Location via WhatsApp
                    </a>
                </div>
            </div>

            <Link
                href="/"
                className="mt-12 flex items-center text-white/50 hover:text-[#C9A961] transition-colors gap-2 group"
            >
                <span>Return to Home</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
        </div>
    );
};

export default function SuccessPage() {
    return (
        <main className="relative bg-black min-h-screen overflow-hidden flex items-center justify-center">
            {/* Decorative Background */}
            <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={800}
                    height={800}
                    className="w-[800px] h-auto"
                />
            </div>

            {/* Suspense boundary for useSearchParams */}
            <Suspense fallback={<div className="text-[#C9A961]">Loading...</div>}>
                <SuccessContent />
            </Suspense>
        </main>
    );
}
