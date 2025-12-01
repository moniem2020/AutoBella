"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, User, Phone, Mail, MapPin, Briefcase } from 'lucide-react';
import Image from 'next/image';

const areas = [
    '1st Settlement',
    '5th Settlement',
    'Qattamia',
    'Shorouk',
    'Madinaty',
    'Nasr City',
    'Heliopolis',
];

const B2BRequestSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        businessName: '',
        contactName: '',
        phone: '',
        email: '',
        businessType: '',
        area: '',
        location: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate B2B ID from Vercel KV
            const idResponse = await fetch('/api/generate-booking-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'b2b' }),
            });

            if (!idResponse.ok) {
                throw new Error('Failed to generate B2B ID');
            }

            const { bookingId } = await idResponse.json();

            // Send to backend API with booking ID
            const response = await fetch('/api/send-b2b-request', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, bookingId }),
            });

            if (response.ok) {
                // Store B2B data in sessionStorage for success page
                sessionStorage.setItem('b2bData', JSON.stringify({ ...formData, bookingId }));

                // Redirect to success page
                router.push('/success?type=b2b');
            } else {
                alert('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting B2B request:', error);
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
            {/* Decorative car logo */}
            <div className="absolute top-0 right-0 opacity-5 pointer-events-none">
                <Image
                    src="/autobella-logo-car.png"
                    alt=""
                    width={600}
                    height={600}
                    className="w-[600px] h-auto"
                />
            </div>

            <div className="relative max-w-[900px] mx-auto px-6 lg:px-12 py-24 z-10">
                <div className="text-center mb-12">
                    <h1 className="font-display text-[#C9A961] text-5xl md:text-[4.5rem] leading-none mb-4">
                        Request Custom Quote
                    </h1>
                    <p className="font-body text-xl text-white/80">
                        Tell us about your business and we'll create a custom solution
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                    <div className="space-y-6">
                        {/* Business/Entity Name */}
                        <div>
                            <label htmlFor="businessName" className="flex items-center text-white/90 font-medium mb-2">
                                <Building2 className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Business/Entity Name / اسم الشركة أو الجهة <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="businessName"
                                name="businessName"
                                required
                                value={formData.businessName}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="Enter your business name"
                            />
                        </div>

                        {/* Contact Person Name */}
                        <div>
                            <label htmlFor="contactName" className="flex items-center text-white/90 font-medium mb-2">
                                <User className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Contact Person Name / اسم الشخص المسؤول <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="contactName"
                                name="contactName"
                                required
                                value={formData.contactName}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="Enter contact person's full name"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="flex items-center text-white/90 font-medium mb-2">
                                <Phone className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Phone Number / رقم الهاتف <span className="text-[#C9A961] ml-1">*</span>
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
                                Email / البريد الإلكتروني <span className="text-white/40 text-sm ml-1">(Optional / اختياري)</span>
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="your.email@company.com"
                            />
                        </div>

                        {/* Business Type */}
                        <div>
                            <label htmlFor="businessType" className="flex items-center text-white/90 font-medium mb-2">
                                <Briefcase className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Business Type / نوع النشاط <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <select
                                id="businessType"
                                name="businessType"
                                required
                                value={formData.businessType}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                            >
                                <option value="" className="bg-black">Select business type / اختر نوع النشاط</option>
                                <option value="Residential Compound" className="bg-black">Residential Compound / مجمع سكني</option>
                                <option value="Company" className="bg-black">Company / شركة</option>
                                <option value="Mall" className="bg-black">Mall / مول تجاري</option>
                            </select>
                        </div>

                        {/* Area */}
                        <div>
                            <label htmlFor="area" className="flex items-center text-white/90 font-medium mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Area / المنطقة <span className="text-[#C9A961] ml-1">*</span>
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
                                    <option value="" className="bg-black">Select your area / اختر المنطقة</option>
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

                        {/* Location */}
                        <div>
                            <label htmlFor="location" className="flex items-center text-white/90 font-medium mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Location/Address / العنوان بالتفصيل <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="text"
                                id="location"
                                name="location"
                                required
                                value={formData.location}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                placeholder="Street address, city, area"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full mt-8 uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Request Quote'}
                    </button>

                    <p className="text-white/50 text-sm text-center mt-6">
                        Our sales team will contact you to discuss custom pricing based on your specific needs.
                    </p>
                </form>
            </div>
        </section>
    );
};

export default B2BRequestSection;
