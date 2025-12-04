import B2BMembershipsSection from '@/components/sections/b2b-memberships-section';
import SocialBubbles from '@/components/ui/social-bubbles';

export default function B2BMembershipsPage() {
  return (
    <main className="relative">
      <SocialBubbles className="absolute top-6 right-6 z-40" />
      <B2BMembershipsSection />
    </main>
  );
}
