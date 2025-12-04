import ServicesDetailSection from '@/components/sections/services-detail-section';
import SocialBubbles from '@/components/ui/social-bubbles';

export default function ServicesPage() {
  return (
    <main className="relative">
      <SocialBubbles className="absolute top-6 right-6 z-40" />
      <ServicesDetailSection />
    </main>
  );
}
