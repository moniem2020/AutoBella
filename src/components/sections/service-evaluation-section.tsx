"use client";

import React, { useState } from 'react';
import { Star, Send, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const howDidYouHear = [
    'TikTok',
    'Instagram',
    'Facebook',
    'Friend',
    'Mall',
    'Compound',
    'Other',
];

const serviceQuality = [
    'Bad',
    'Good',
    'Excellent',
];

const ServiceEvaluationSection = () => {
    const router = useRouter();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        howHeard: '',
        quality: '',
        rating: 5,
        review: '',
    });

    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch('/api/send-evaluation', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert('Thank you for your feedback!');
                router.push('/');
            } else {
                alert('Failed to submit evaluation. Please try again.');
            }
        } catch (error) {
            console.error('Error submitting evaluation:', error);
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
                        Service Evaluation
                    </h1>
                    <p className="font-body text-xl text-white/80 mb-2">
                        We value your feedback
                    </p>
                    <p className="font-body text-lg text-white/60" dir="rtl">
                        نقدر ملاحظاتك
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-sm border border-[#C9A961]/20 rounded-[20px] p-8 md:p-12 shadow-[0_8px_24px_rgba(0,0,0,0.3)]">
                    <div className="space-y-6">
                        {/* Name */}
                        <div>
                            <label htmlFor="name" className="flex items-center text-white/90 font-medium mb-2">
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
                                placeholder="Enter your name"
                            />
                        </div>

                        {/* Phone */}
                        <div>
                            <label htmlFor="phone" className="flex items-center text-white/90 font-medium mb-2">
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

                        {/* How did you hear about us */}
                        <div>
                            <label htmlFor="howHeard" className="flex items-center text-white/90 font-medium mb-2">
                                How did you hear about AutoBella? / كيف سمعت عنا؟ <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="howHeard"
                                    name="howHeard"
                                    required
                                    value={formData.howHeard}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select an option / اختر إجابة</option>
                                    {howDidYouHear.map((option) => (
                                        <option key={option} value={option} className="bg-black">{option}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Service Quality */}
                        <div>
                            <label htmlFor="quality" className="flex items-center text-white/90 font-medium mb-2">
                                Service Quality / جودة الخدمة <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="relative">
                                <select
                                    id="quality"
                                    name="quality"
                                    required
                                    value={formData.quality}
                                    onChange={handleChange}
                                    className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white appearance-none focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors"
                                >
                                    <option value="" className="bg-black">Select quality / اختر التقييم</option>
                                    {serviceQuality.map((option) => (
                                        <option key={option} value={option} className="bg-black">{option}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50 pointer-events-none" />
                            </div>
                        </div>

                        {/* Rating */}
                        <div>
                            <label htmlFor="rating" className="flex items-center text-white/90 font-medium mb-2">
                                Rating (1-10) / التقييم (١-١٠) <span className="text-[#C9A961] ml-1">*</span>
                            </label>
                            <div className="flex items-center gap-4">
                                <input
                                    type="range"
                                    id="rating"
                                    name="rating"
                                    min="1"
                                    max="10"
                                    value={formData.rating}
                                    onChange={handleChange}
                                    className="flex-1 h-2 bg-white/10 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#C9A961] [&::-webkit-slider-thumb]:cursor-pointer"
                                />
                                <div className="flex items-center justify-center w-16 h-12 bg-[#C9A961] text-black font-bold text-xl rounded-lg">
                                    {formData.rating}
                                </div>
                            </div>
                        </div>

                        {/* Review */}
                        <div>
                            <label htmlFor="review" className="flex items-center text-white/90 font-medium mb-2">
                                Review (Optional) / رأيك (اختياري)
                            </label>
                            <textarea
                                id="review"
                                name="review"
                                value={formData.review}
                                onChange={handleChange}
                                rows={4}
                                className="w-full bg-white/5 border border-[#C9A961]/20 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:border-[#C9A961] focus:ring-1 focus:ring-[#C9A961] focus:outline-none transition-colors resize-none"
                                placeholder="Share your experience with us..."
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-4 rounded-full uppercase tracking-wider text-base transition-transform hover:scale-105 duration-300 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                        >
                            {loading ? 'Submitting...' : (
                                <>
                                    <Send className="w-5 h-5" />
                                    Submit Evaluation / إرسال التقييم
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default ServiceEvaluationSection;
