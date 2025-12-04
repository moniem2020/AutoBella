import UltimateCareCareSection from '@/components/sections/ultimate-care-section';
import SocialBubbles from '@/components/ui/social-bubbles';

export default function UltimateCarePage() {
    return (
        <main className="relative">
            <SocialBubbles className="absolute top-6 right-6 z-40" />
            <UltimateCareCareSection />
        </main>
    );
}
