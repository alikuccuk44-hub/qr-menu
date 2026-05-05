import { getRestaurant } from '@/lib/cached-data';
import AdminClientLayout from '@/components/AdminClientLayout';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch on server for instant rendering, with safety fallback
  let restaurant = null;
  try {
    restaurant = await getRestaurant();
  } catch (e) {
    console.error('Layout fetch error:', e);
  }

  return (
    <AdminClientLayout initialRestaurant={restaurant}>
      {children}
    </AdminClientLayout>
  );
}
