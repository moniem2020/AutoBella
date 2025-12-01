'use client';

import { useRouter } from 'next/navigation';
import CarEmergencySection from '@/components/sections/car-emergency-section';

export default function CarEmergencyPage() {
    const router = useRouter();

    const handleBookNow = () => {
        router.push('/car-emergency/book');
    };

    return (
        <main className="bg-black min-h-screen">
            <CarEmergencySection onBookNow={handleBookNow} />
        </main>
    );
}
