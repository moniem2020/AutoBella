import ClientMembershipsSection from '@/components/sections/client-memberships-section';
import FollowUsButton from '@/components/ui/follow-us-button';

export default function ClientMembershipsPage() {
  return (
    <main className="relative">
      <FollowUsButton />
      <ClientMembershipsSection />
    </main>
  );
}
