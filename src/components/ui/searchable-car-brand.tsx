'use client';

import { useState, useRef, useEffect } from 'react';
import { CAR_BRANDS } from '@/lib/booking-data';

interface SearchableCarBrandProps {
    value: string;
    onChange: (value: string) => void;
    required?: boolean;
}

export default function SearchableCarBrand({ value, onChange, required = false }: SearchableCarBrandProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef<HTMLDivElement>(null);

    const filteredBrands = CAR_BRANDS.filter(brand =>
        brand.label.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const selectedBrand = CAR_BRANDS.find(brand => brand.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={containerRef}>
            <div
                className="w-full px-4 py-3 bg-white/5 border border-white/20 rounded-lg text-white focus-within:border-[#C9A961] cursor-pointer"
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedBrand ? selectedBrand.label : 'Select Car Brand / اختر ماركة السيارة'}
            </div>

            {isOpen && (
                <div className="absolute z-50 w-full mt-2 bg-[#1a1a1a] border border-[#C9A961]/30 rounded-lg shadow-xl max-h-60 overflow-hidden">
                    <input
                        type="text"
                        className="w-full px-4 py-2 bg-white/5 border-b border-white/20 text-white focus:outline-none focus:bg-white/10"
                        placeholder="Search brand / ابحث عن ماركة..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        autoFocus
                    />
                    <div className="overflow-y-auto max-h-48">
                        {filteredBrands.length > 0 ? (
                            filteredBrands.map((brand) => (
                                <div
                                    key={brand.value}
                                    className={`px-4 py-2 cursor-pointer transition-colors ${value === brand.value
                                            ? 'bg-[#C9A961] text-black'
                                            : 'hover:bg-white/10 text-white/90'
                                        }`}
                                    onClick={() => {
                                        onChange(brand.value);
                                        setIsOpen(false);
                                        setSearchTerm('');
                                    }}
                                >
                                    {brand.label}
                                </div>
                            ))
                        ) : (
                            <div className="px-4 py-3 text-white/50 text-center">
                                No brands found / لا توجد ماركات
                            </div>
                        )}
                    </div>
                </div>
            )}
            <input
                type="hidden"
                name="carBrand"
                value={value}
                required={required}
            />
        </div>
    );
}
