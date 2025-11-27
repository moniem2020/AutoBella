"use client";

import React, { useState } from 'react';
import { User, Phone, Mail, Check } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const membershipPlans = [
    {
        id: 'basic',
        name: 'Basic Plan',
        washes: '3 washes',
        price: 'EGP 540',
    },
    {
        id: 'plus',
        name: 'Plus Plan',
        washes: '4 washes',
        price: 'EGP 720',
        featured: true,
    },
    {
        id: 'elite',
        name: 'Elite Plan',
        washes: '6 washes',
        price: 'EGP 1050',
    },
];

const MembershipRegistrationSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        membership: 'plus',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-membership', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
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

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
                    <p className="font-body text-xl text-white/80">
                        Join AutoBella and enjoy exclusive benefits
                    </p>
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
                                Email
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

                        {/* Membership Selection */}
                        <div>
                            <label className="flex items-center text-white/90 font-medium mb-4">
                                Select Membership <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="space-y-3">
                                {membershipPlans.map((plan) => (
                                    <label
                                        key={plan.id}
                                        className={`relative flex items-start p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${formData.membership === plan.id
                                                ? 'border-[#C9A961] bg-[#C9A961]/10'
                                                : 'border-[#C9A961]/20 bg-white/5 hover:border-[#C9A961]/40 hover:bg-white/10'
                                            }`}
                                    >
                                        <input
                                            type="radio"
                                            name="membership"
                                            value={plan.id}
                                            checked={formData.membership === plan.id}
                                            onChange={handleChange}
                                            className="sr-only"
                                        />
                                        <div className="flex items-center justify-between w-full">
                                            <div className="flex items-start">
                                                <div className={`flex-shrink-0 w-5 h-5 rounded-full border-2 mr-4 mt-0.5 flex items-center justify-center transition-colors ${formData.membership === plan.id
                                                        ? 'border-[#C9A961] bg-[#C9A961]'
                                                        : 'border-white/30'
                                                    }`}>
                                                    {formData.membership === plan.id && (
                                                        <Check className="w-3 h-3 text-black" strokeWidth={3} />
                                                    )}
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-3">
                                                        <span className="text-white font-semibold text-lg">
                                                            {plan.name}
                                                        </span>
                                                        {plan.featured && (
                                                            <span className="bg-[#C9A961] text-black text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">
                                                                Popular
                                                            </span>
                                                        )}
                                                    </div>
                                                    <p className="text-white/60 text-sm mt-1">
                                                        {plan.washes}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-[#C9A961] font-bold text-xl">
                                                    {plan.price}
                                                </span>
                                            </div>
                                        </div>
                                    </label>
                                ))}
                            </div>
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

export default MembershipRegistrationSection;
