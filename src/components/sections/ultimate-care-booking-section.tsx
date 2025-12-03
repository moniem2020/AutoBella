"use client";

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { User, Phone, Mail, MapPin, Car, FileText, ChevronDown, Calendar, Clock, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import { PAYMENT_METHODS, CAR_COLORS } from '@/lib/booking-data';
import SearchableCarBrand from '@/components/ui/searchable-car-brand';

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

const timeSlots = [
    '00:00', '01:00', '02:00', '03:00', '04:00', '05:00',
    '06:00', '07:00', '08:00', '09:00', '10:00', '11:00',
    '12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00', '20:00', '21:00', '22:00', '23:00',
];

const BookingForm = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const preselectedService = searchParams.get('service');

    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        carType: '',
        carBrand: '',
        carColor: '',
        plateLetters: '',
        plateNumbers: '',
        paymentMethod: '',
        service: preselectedService || '',
        date: '',
        timeSlot: '',
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
                                Name / الاسم <span className="text-[#C9A961] ml-1">*</span>
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
                                Phone / رقم الهاتف <span className="text-[#C9A961] ml-1">*</span>
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
                                placeholder="your.email@example.com"
                            />
                        </div>

                        {/* Service Selection */}
                        <div>
                            <label htmlFor="service" className="flex items-center text-white/90 font-medium mb-2">
                                <FileText className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Select Service / اختر الخدمة <span className="text-[#C9A961] ml-1">*</span>
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
                                Car Type / نوع السيارة <span className="text-[#C9A961] ml-1">*</span>
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

                        {/* Car Brand */}
                        <div>
                            <label htmlFor="carBrand" className="flex items-center text-white/90 font-medium mb-2">
                                <Car className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Car Brand / ماركة السيارة <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <SearchableCarBrand
                                value={formData.carBrand}
                                onChange={(value) => setFormData({ ...formData, carBrand: value })}
                                required
                            />
                        </div>

                        {/* Car Color */}
                        <div>
                            <label htmlFor="carColor" className="flex items-center text-white/90 font-medium mb-2">
                                <Car className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Car Color / لون السيارة <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="carColor"
                                    name="carColor"
                                    required
                                    value={formData.carColor}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select Color / اختر اللون</option>
                                    {CAR_COLORS.map((color) => (
                                        <option key={color.value} value={color.value} className="bg-black">{color.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* License Plate Number */}
                        <div>
                            <label htmlFor="plateLetters" className="flex items-center text-white/90 font-medium mb-2">
                                <Car className="w-5 h-5 mr-2 text-[#C9A961]" />
                                License Plate / اللوحة المعدنية <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    id="plateLetters"
                                    name="plateLetters"
                                    required
                                    value={formData.plateLetters}
                                    onChange={handleChange}
                                    maxLength={7}
                                    dir="rtl"
                                    className="w-1/2 bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                    placeholder="أ ب ج"
                                />
                                <input
                                    type="text"
                                    id="plateNumbers"
                                    name="plateNumbers"
                                    required
                                    value={formData.plateNumbers}
                                    onChange={handleChange}
                                    maxLength={7}
                                    pattern="[0-9]*"
                                    className="w-1/2 bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                    placeholder="1234"
                                />
                            </div>
                        </div>

                        {/* Payment Method */}
                        <div>
                            <label htmlFor="paymentMethod" className="flex items-center text-white/90 font-medium mb-2">
                                <MessageSquare className="w-5 h-5 mr-2 text-[#C9A961]" />
                                Payment Method / طريقة الدفع <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="paymentMethod"
                                    name="paymentMethod"
                                    required
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select Payment / اختر طريقة الدفع</option>
                                    {PAYMENT_METHODS.map((method) => (
                                        <option key={method.value} value={method.value} className="bg-black">{method.label}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Date and Time Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Date */}
                            <div>
                                <label htmlFor="date" className="flex items-center text-white/90 font-medium mb-2">
                                    <Calendar className="w-5 h-5 mr-2 text-[#C9A961]" />
                                    Preferred Date <span className="text-[#C9A961] ml-1">*</span>
                                </label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    required
                                    min={new Date().toISOString().split('T')[0]}
                                    value={formData.date}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors [color-scheme:dark]"
                                />
                            </div>

                            {/* Time Slot */}
                            <div>
                                <label htmlFor="timeSlot" className="flex items-center text-white/90 font-medium mb-2">
                                    <Clock className="w-5 h-5 mr-2 text-[#C9A961]" />
                                    Preferred Time <span className="text-[#C9A961] ml-1">*</span>
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
                                        <option value="" className="bg-black">Select Time</option>
                                        {timeSlots.map((slot) => (
                                            <option key={slot} value={slot} className="bg-black">{slot}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                                </div>
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
