"use client";

import React, { useState, Suspense } from 'react';
import { User, Phone, Mail, MapPin } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

const membershipPlans = [
    {
        id: 'basic',
        name: 'Basic Plan',
        washes: '8 washes/month (2 per week)',
        prices: {
            standard: 600,
        },
    },
    {
        id: 'plus',
        name: 'Plus Plan',
        washes: '10 Standard + 2 Premium washes/month',
        prices: {
            premium: 750,
        },
        featured: true,
    },
    {
        id: 'elite',
        name: 'Elite Plan',
        washes: '18 Standard + 2 Premium washes/month',
        prices: {
            premium: 1300,
        },
    },
];

const areas = [
    '1st Settlement',
    '5th Settlement',
    'Qattamia',
    'Shorouk',
    'Madinaty',
    'Nasr City',
    'Heliopolis',
];

const MembershipRegistrationForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Get plan and type from URL parameters
    const urlPlan = searchParams.get('plan') || 'plus';
    const urlType = searchParams.get('type') || 'premium';

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        area: '',
        address: '',
        membership: urlPlan,
        washType: urlType,
    });

    const [loading, setLoading] = useState(false);

    // Get selected plan details
    const selectedPlan = membershipPlans.find(p => p.id === formData.membership) || membershipPlans[1];
    const selectedPrice = selectedPlan.prices[formData.washType as 'standard' | 'premium'];
    const washTypeLabel = formData.washType === 'standard'
        ? 'Standard Wash - Quick Exterior (غسيل خارجي سريع)'
        : 'Premium Wash - Inside & Out (غسيل داخلي وخارجي)';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate membership ID from Vercel KV
            const idResponse = await fetch('/api/generate-booking-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'membership' }),
            });

            if (!idResponse.ok) {
                throw new Error('Failed to generate membership ID');
            }

            const { bookingId } = await idResponse.json();

            // Prepare data with full details
            const submissionData = {
                ...formData,
                bookingId,
                planName: selectedPlan.name,
                washTypeLabel,
                price: selectedPrice,
            };

            const response = await fetch('/api/send-membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submissionData),
            });

            if (response.ok) {
                // Store membership data in sessionStorage for success page
                sessionStorage.setItem('membershipData', JSON.stringify(submissionData));

                // Redirect to success page
                router.push('/success?type=membership');
            } else {
                alert('Failed to submit registration. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting membership:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <section className="relative bg-black min-h-screen overflow-hidden">
            <div className="absolute bottom-0 left-0 opacity-5 pointer-events-none">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={600}
                    height={600}
                    className="w-[600px] h-auto"
                />
            </div>

            <div className="relative max-w-[800px] mx-auto px-6 lg:px-12 py-24 z-10">
                <div className="text-center mb-12">
                    <h1 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none mb-4">
                        Membership Registration
                    </h1>
                    <p className="font-body text-xl text-white/80 mb-4">
                        Complete your registration for {selectedPlan.name}
                    </p>
                    <div className="inline-block bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-[#C9A961]/30">
                        <p className="text-[#C9A961] font-semibold text-lg">
                            {washTypeLabel} - EGP {selectedPrice}/month
                        </p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="flex items-center text-white/90 font-medium mb-2">
                                <User className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Name <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="Enter your full name"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="flex items-center text-white/90 font-medium mb-2">
                                <Phone className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Phone <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="01XXXXXXXXX"
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label htmlFor="email" className="flex items-center text-white/90 font-medium mb-2">
                                <Mail className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Email <span className="text-white/40 text-sm ml-1">(Optional)</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Area */}
                        <div>
                            <label htmlFor="area" className="flex items-center text-white/90 font-medium mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Area <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="area"
                                    name="area"
                                    required
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors appearance-none"
                                >
                                    <option value="" className="bg-black">Select your area</option>
                                    {areas.map((area) => (
                                        <option key={area} value={area} className="bg-black">
                                            {area}
                                        </option>
                                    ))}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#C9A961]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="flex items-center text-white/90 font-medium mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Address Details <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="Street name, Building number, Apartment"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit Registration'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-white/50 mt-8 font-body">
                    After submitting, our team will contact you to confirm your membership and arrange payment.
                </p>
            </div>
        </section>
    );
};

const MembershipRegistrationSection = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center"><div className="text-[#C9A961]">Loading...</div></div>}>
            <MembershipRegistrationForm />
        </Suspense>
    );
};

export default MembershipRegistrationSection;
