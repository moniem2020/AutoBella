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
    const isB2B = type === 'b2b';

    // Get booking/membership/b2b data from sessionStorage
    const [data, setData] = React.useState<any>(null);

    React.useEffect(() => {
        let storedData;
        if (isB2B) {
            storedData = sessionStorage.getItem('b2bData');
        } else if (isMembership) {
            storedData = sessionStorage.getItem('membershipData');
        } else {
            storedData = sessionStorage.getItem('bookingData');
        }

        if (storedData) {
            setData(JSON.parse(storedData));
        }
    }, [isMembership, isB2B]);

    if (!data) {
        return <div className="text-white text-center">Loading...</div>;
    }

    const whatsappNumber = '201009441336';

    // Different message format for B2B
    const messageText = isB2B
        ? `Hello, this is ${data.contactName} from ${data.businessName}, booking ID: ${data.bookingId}, requesting B2B service quote. I want to share the location of our ${data.businessType}.`
        : `Hello, this is ${data.name} and my booking ID is ${data.bookingId}, and I want to send my location for the wash.`;

    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(messageText)}`;

    return (
        <div className="relative max-w-[900px] mx-auto px-6 lg:px-12 py-24 z-10 flex flex-col items-center text-center">
            {/* Success Icon */}
            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6 border border-green-500/20 shadow-[0_0_30px_rgba(34,197,94,0.2)]">
                <CheckCircle className="w-10 h-10 text-green-500" />
            </div>

            <h1 className="font-display text-[#C9A961] text-4xl md:text-5xl leading-none mb-4">
                {isB2B ? 'Request Received!' : isMembership ? 'Registration Received!' : 'Booking Received!'}
            </h1>

            <p className="font-body text-lg text-white/70 mb-8">
                Thank you for choosing AutoBella
            </p>

            {/* Main Booking Details Card */}
            <div className="bg-white/10 backdrop-blur-md border border-[#C9A961]/30 rounded-[20px] p-8 md:p-10 w-full max-w-2xl shadow-[0_10px_40px_rgba(0,0,0,0.4)] mb-6">
                <h2 className="text-2xl md:text-3xl font-display text-[#C9A961] mb-6 flex items-center justify-center gap-3">
                    <span>Booking ID:</span>
                    <span className="font-bold">#{data.bookingId}</span>
                </h2>

                <div className="space-y-4 text-left">
                    {isB2B ? (
                        <>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Business Name:</span>
                                <span className="text-white font-semibold">{data.businessName}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Contact Person:</span>
                                <span className="text-white font-semibold">{data.contactName}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Phone:</span>
                                <span className="text-white font-semibold">{data.phone}</span>
                            </div>
                            {data.email && (
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-white/60 font-medium">Email:</span>
                                    <span className="text-white font-semibold">{data.email}</span>
                                </div>
                            )}
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Business Type:</span>
                                <span className="text-white font-semibold">{data.businessType}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Location:</span>
                                <span className="text-white font-semibold text-right max-w-xs">{data.location}</span>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Name:</span>
                                <span className="text-white font-semibold">{data.name}</span>
                            </div>
                            <div className="flex justify-between py-3 border-b border-white/10">
                                <span className="text-white/60 font-medium">Phone:</span>
                                <span className="text-white font-semibold">{data.phone}</span>
                            </div>
                            {data.email && (
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-white/60 font-medium">Email:</span>
                                    <span className="text-white font-semibold">{data.email}</span>
                                </div>
                            )}
                            {!isMembership && (
                                <>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Car Type:</span>
                                        <span className="text-white font-semibold">{data.carType}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Area:</span>
                                        <span className="text-white font-semibold">{data.area}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Address:</span>
                                        <span className="text-white font-semibold text-right max-w-xs">{data.address}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Service:</span>
                                        <span className="text-white font-semibold">{data.service}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Date:</span>
                                        <span className="text-white font-semibold">{data.date}</span>
                                    </div>
                                    <div className="flex justify-between py-3 border-b border-white/10">
                                        <span className="text-white/60 font-medium">Time:</span>
                                        <span className="text-white font-semibold">{data.timeSlot}</span>
                                    </div>
                                    {data.notes && (
                                        <div className="flex justify-between py-3 border-b border-white/10">
                                            <span className="text-white/60 font-medium">Notes:</span>
                                            <span className="text-white font-semibold text-right max-w-xs">{data.notes}</span>
                                        </div>
                                    )}
                                </>
                            )}
                            {isMembership && (
                                <div className="flex justify-between py-3 border-b border-white/10">
                                    <span className="text-white/60 font-medium">Membership:</span>
                                    <span className="text-white font-semibold">{data.membership}</span>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Location Sharing Section - Smaller */}
            <div className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[16px] p-6 w-full max-w-md shadow-lg">
                <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-[#C9A961]/10 rounded-full flex items-center justify-center mb-4 border border-[#C9A961]/20">
                        <MapPin className="w-6 h-6 text-[#C9A961]" />
                    </div>

                    <h3 className="text-lg font-display text-white mb-2">Share Your Location</h3>

                    <p className="text-white/50 mb-6 text-sm text-center">
                        Send your location via WhatsApp to complete your request
                    </p>

                    <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full bg-[#25D366] hover:bg-[#1ebd56] text-white font-semibold py-3 rounded-full text-sm transition-all hover:scale-105 duration-300 shadow-lg flex items-center justify-center gap-2"
                    >
                        <MapPin className="w-4 h-4" />
                        Share Location via WhatsApp
                    </a>
                </div>
            </div>

            <Link
                href="/"
                className="mt-10 flex items-center text-white/50 hover:text-[#C9A961] transition-colors gap-2 group"
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
