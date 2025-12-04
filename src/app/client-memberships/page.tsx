import ClientMembershipsSection from '@/components/sections/client-memberships-section';
import SocialBubbles from '@/components/ui/social-bubbles';

export default function ClientMembershipsPage() {
  return (
    <main className="relative">
      <SocialBubbles className="absolute top-6 right-6 z-40" />
      <ClientMembershipsSection />
    </main>
  );
}
