import HeroVideoSection from '@/components/sections/hero-video-section';
import MarqueeBanner from '@/components/sections/marquee-banner';
import AboutSection from '@/components/sections/about-section';
import ServicesOverviewSection from '@/components/sections/services-overview-section';
import FaqsSection from '@/components/sections/faqs-section';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black">
      <main id="content">
        <HeroVideoSection />

        <MarqueeBanner />

        <AboutSection />

        <ServicesOverviewSection />

        <FaqsSection />
      </main>
    </div>
  );
}