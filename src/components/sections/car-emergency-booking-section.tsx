"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, Phone, User, AlertTriangle, CreditCard, MapPin } from 'lucide-react';
import Image from 'next/image';
import { PAYMENT_METHODS, AREAS } from '@/lib/booking-data';

const emergencyTypes = [
    { value: 'Battery Issue', label: 'Battery Issue / عطل بطارية' },
    { value: 'Tire Issue', label: 'Tire Issue / عطل كاوتش' },
    { value: 'Tow Truck', label: 'Tow Truck / ونش' },
];

const carTypes = [
    { value: 'Sedan', label: 'Sedan / سيدان' },
    { value: 'SUV', label: 'SUV / دفع رباعي' },
    { value: 'Hatchback', label: 'Hatchback / هاتشباك' },
    { value: 'Pickup', label: 'Pickup / نصف نقل' },
];

// Emergency service areas (excluding 6th of October and Sheikh Zayed)
const emergencyAreas = [
    { value: '1st Settlement', label: '1st Settlement / التجمع الأول' },
    { value: '5th Settlement', label: '5th Settlement / التجمع الخامس' },
    { value: 'Qattamia', label: 'Qattamia / القطامية' },
    { value: 'Shorouk', label: 'Shorouk / الشروق' },
    { value: 'Madinaty', label: 'Madinaty / مدينتي' },
    { value: 'Nasr City', label: 'Nasr City / مدينة نصر' },
    { value: 'Heliopolis', label: 'Heliopolis / مصر الجديدة' },
];

const CarEmergencyBookingSection = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        emergencyType: '',
        area: '',
        carType: '',
        paymentMethod: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            // Generate Emergency ID
            const idResponse = await fetch('/api/generate-booking-id', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: 'emergency' }),
            });

            if (!idResponse.ok) throw new Error('Failed to generate ID');
            const { bookingId } = await idResponse.json();

            // Send Request
            const response = await fetch('/api/send-emergency-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, bookingId }),
            });

            const data = await response.json();

            if (response.ok) {
                // Redirect to WhatsApp
                if (data.whatsappUrl) {
                    window.open(data.whatsappUrl, '_blank');
                }
                router.push('/success?type=emergency');
            } else {
                alert('Failed to submit request. Please try again.');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section className="relative py-20 px-6 md:px-12 bg-[#111]">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="font-display text-4xl md:text-5xl text-[#C9A961] mb-4">
                        Request Emergency Assistance
                    </h2>
                    <p className="text-white/70 text-lg" dir="rtl">
                        اطلب المساعدة الطارئة الآن
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-lg">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Name */}
                        <div>
                            <label className="block text-white/90 font-medium mb-2">
                                Name / الاسم <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <input
                                    type="text"
                                    name="name"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#C9A961] focus:outline-none"
                                    placeholder="Your Name"
                                />
                            </div>
                        </div>

                        {/* Phone */}
                        <div>
                            <label className="block text-white/90 font-medium mb-2">
                                Phone / رقم الهاتف <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <input
                                    type="tel"
                                    name="phone"
                                    required
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white focus:border-[#C9A961] focus:outline-none"
                                    placeholder="01XXXXXXXXX"
                                />
                            </div>
                        </div>

                        {/* Emergency Type */}
                        <div className="md:col-span-2">
                            <label className="block text-white/90 font-medium mb-2">
                                Emergency Type / نوع الطوارئ <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <AlertTriangle className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <select
                                    name="emergencyType"
                                    required
                                    value={formData.emergencyType}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:outline-none"
                                >
                                    <option value="">Select Issue / اختر العطل</option>
                                    {emergencyTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Area */}
                        <div>
                            <label className="block text-white/90 font-medium mb-2">
                                Area / المنطقة <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <select
                                    name="area"
                                    required
                                    value={formData.area}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:outline-none"
                                >
                                    <option value="">Select Area / اختر المنطقة</option>
                                    {emergencyAreas.map(area => (
                                        <option key={area.value} value={area.value}>{area.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Car Type */}
                        <div>
                            <label className="block text-white/90 font-medium mb-2">
                                Car Type / نوع السيارة <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <Car className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <select
                                    name="carType"
                                    required
                                    value={formData.carType}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:outline-none"
                                >
                                    <option value="">Select Car Type / اختر نوع السيارة</option>
                                    {carTypes.map(type => (
                                        <option key={type.value} value={type.value}>{type.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>


                        {/* Payment Method */}
                        <div className="md:col-span-2">
                            <label className="block text-white/90 font-medium mb-2">
                                Payment Method / طريقة الدفع <span className="text-[#C9A961]">*</span>
                            </label>
                            <div className="relative">
                                <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#C9A961]" />
                                <select
                                    name="paymentMethod"
                                    required
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full bg-black/50 border border-[#C9A961]/20 rounded-lg pl-12 pr-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:outline-none"
                                    style={{ backgroundImage: 'none' }}
                                >
                                    <option value="">Select Payment Method / اختر طريقة الدفع</option>
                                    {PAYMENT_METHODS.map((method) => (
                                        <option key={method.value} value={method.value}>
                                            {method.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white font-bold py-4 rounded-full mt-8 uppercase tracking-wider text-lg transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Request Emergency Help / طلب مساعدة طارئة'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default CarEmergencyBookingSection;
