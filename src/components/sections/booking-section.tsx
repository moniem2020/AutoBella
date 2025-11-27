"use client";

import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Car, Phone, Mail, User, MessageSquare, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const areas = [
    '1st Settlement',
    '5th Settlement',
    'Qattamia',
    'Shorouk',
    'Madinaty',
];

const carTypes = [
    'Sedan',
    'SUV',
    'Hatchback',
    'Pickup',
];

const services = [
    { name: 'Standard Wash', price: 'EGP 150' },
    { name: 'Premium Wash', price: 'EGP 230' },
];

const timeSlots = [
    '9:00 AM - 10:00 AM',
    '10:00 AM - 11:00 AM',
    '11:00 AM - 12:00 PM',
    '12:00 PM - 1:00 PM',
    '1:00 PM - 2:00 PM',
    '2:00 PM - 3:00 PM',
    '3:00 PM - 4:00 PM',
    '4:00 PM - 5:00 PM',
    '5:00 PM - 6:00 PM',
];

const BookingSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        carType: '',
        area: '',
        address: '',
        service: '',
        date: '',
        timeSlot: '',
        notes: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Send to backend API
            const response = await fetch('/api/send-booking', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                // Redirect to success page
                router.push('/success?type=booking');
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
                        Book A Wash
                    </h1>
                    <p className="font-body text-xl text-white/80">
                        Fill in the details and we'll confirm your booking
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

                        {/* Detailed Address */}
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
                                placeholder="Example: Villa 12, Street 3, El Patio Compound"
                            />
                        </div>

                        {/* Service */}
                        <div>
                            <label htmlFor="service" className="flex items-center text-white/90 font-medium mb-2">
                                <Car className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Service <span className="text-[#C9A961] ml-1">*</span>
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
                                    <option value="" className="bg-black">Select a Service</option>
                                    {services.map((service) => (
                                        <option key={service.name} value={`${service.name} (${service.price})`} className="bg-black">
                                            {service.name} ({service.price})
                                        </option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Date */}
                        <div>
                            <label htmlFor="date" className="flex items-center text-white/90 font-medium mb-2">
                                <Calendar className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Date <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <input
                                type="date"
                                id="date"
                                name="date"
                                required
                                value={formData.date}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors [color-scheme:dark]"
                            />
                        </div>

                        {/* Time Slot */}
                        <div>
                            <label htmlFor="timeSlot" className="flex items-center text-white/90 font-medium mb-2">
                                <Clock className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Time Slot <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="timeSlot"
                                    name="timeSlot"
                                    required
                                    value={formData.timeSlot}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select a Time Slot</option>
                                    {timeSlots.map((slot) => (
                                        <option key={slot} value={slot} className="bg-black">{slot}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Additional Notes */}
                        <div>
                            <label htmlFor="notes" className="flex items-center text-white/90 font-medium mb-2">
                                <MessageSquare className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Additional Notes
                            </label>
                            <textarea
                                id="notes"
                                name="notes"
                                rows={4}
                                value={formData.notes}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors resize-none"
                                placeholder="Example: Gate code, specific instructions"
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg mt-8 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Submitting...' : 'Submit Booking'}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default BookingSection;
