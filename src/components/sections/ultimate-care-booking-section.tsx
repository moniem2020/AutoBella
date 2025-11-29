"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Phone, Mail, MapPin, Car, FileText, ChevronDown } from 'lucide-react';
import Image from 'next/image';

const services = [
    {
        id: 'polish',
        name: 'Polish Section',
        nameAr: 'قسم البوليش',
        price: 700,
        priceNote: 'per stage (لكل مرحلة)',
    },
    {
        id: 'car-care',
        name: 'Car Care Section',
        nameAr: 'قسم الكار كير',
        priceStart: 650,
        priceNote: 'starting price (السعر الابتدائي)',
    },
    {
        id: 'removal',
        name: 'Removal Section',
        nameAr: 'قسم الازالات',
        priceNote: 'determined on-site (يحدد في الموقع)',
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

const carTypes = ['Sedan', 'SUV', 'Hatchback', 'Coupe', 'Truck', 'Van'];

const BookingForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        carType: '',
        service: preselectedService || '',
        area: '',
        address: '',
        notes: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate booking ID from Vercel KV
            const idResponse = await fetch('/api/generate-booking-id', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ type: 'ultimate-care' }),
            });

            if (!idResponse.ok) {
                throw new Error('Failed to generate booking ID');
            }

            const { bookingId } = await idResponse.json();

            // Get service details
            const selectedService = services.find(s => s.id === formData.service);
            const serviceLabel = selectedService?.name || formData.service;

            // Send to backend API with booking ID
            const response = await fetch('/api/send-ultimate-care', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ ...formData, bookingId, serviceLabel }),
            });

            if (response.ok) {
                // Store booking data in sessionStorage for success page
                sessionStorage.setItem('bookingData', JSON.stringify({ ...formData, bookingId, service: serviceLabel }));

                // Redirect to success page
                router.push('/success?type=ultimate-care');
            } else {
                alert('Failed to submit booking. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting booking:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
                        Book Ultimate Care
                    </h1>
                    <p className="font-body text-xl text-white/80 mb-2">
                        Schedule your professional detailing session
                    </p>
                    <p className="font-body text-lg text-white/60" dir="rtl">
                        احجز جلسة العناية الفائقة بسيارتك
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
                                Email (optional)
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

                        {/* Service Selection */}
                        <div>
                            <label htmlFor="service" className="flex items-center text-white/90 font-medium mb-2">
                                <FileText className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Select Service <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="service"
                                    name="service"
                                    required
                                    value={formData.service}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select a service</option>
                                    {services.map((service) => (
                                        <option key={service.id} value={service.id} className="bg-black">
                                            {service.name} - {service.nameAr}
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Car Type */}
                        <div>
                            <label htmlFor="carType" className="flex items-center text-white/90 font-medium mb-2">
                                <Car className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Car Type <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="carType"
                                    name="carType"
                                    required
                                    value={formData.carType}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select Car Type</option>
                                    {carTypes.map((type) => (
                                        <option key={type} value={type} className="bg-black">{type}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
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
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select Area</option>
                                    {areas.map((area) => (
                                        <option key={area} value={area} className="bg-black">{area}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Address */}
                        <div>
                            <label htmlFor="address" className="flex items-center text-white/90 font-medium mb-2">
                                <MapPin className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Detailed Address <span className="text-[#C9A961] ml-1">*</span>
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

                        {/* Notes */}
                        <div>
                            <label htmlFor="notes" className="flex items-center text-white/90 font-medium mb-2">
                                <FileText className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Additional Notes (optional)
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                value={formData.notes}
                                onChange={handleChange}
                                rows={3}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors resize-none"
                                placeholder="Any special requirements or additional information"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Book Now'}
                        </button>
                    </div>
                </form>

                <p className="text-center text-sm text-white/50 mt-8 font-body">
                    Our team will contact you to confirm the service details and schedule an inspection.
                </p>
            </div>
        </section>
    );
};

const UltimateCareBookingSection = () => {
    return (
        <Suspense fallback={<div className="min-h-screen bg-black flex items-center justify-center text-white">Loading...</div>}>
            <BookingForm />
        </Suspense>
    );
};

export default UltimateCareBookingSection;
