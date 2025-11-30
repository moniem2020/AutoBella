'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface FollowUsButtonProps {
    className?: string;
}

const FollowUsButton: React.FC<FollowUsButtonProps> = ({ className = '' }) => {
    const scrollToFooter = () => {
        const footer = document.querySelector('footer');
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <button
            onClick={scrollToFooter}
            className={`absolute top-6 right-6 z-40 inline-flex items-center gap-2 bg-[#C9A961] hover:bg-[#b89850] text-black font-semibold py-3 px-6 rounded-full transition-all duration-300 hover:scale-105 shadow-lg ${className}`}
            aria-label="Follow us on social media"
        >
            <Users className="w-5 h-5" />
            <span className="hidden sm:inline">Follow Us</span>
        </button>
    );
};

export default FollowUsButton;
