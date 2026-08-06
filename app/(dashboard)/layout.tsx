'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/features/auth/stores/auth-store';
// import { Sidebar } from '@/components/layout/sidebar';
// import { Topbar } from '@/components/layout/topbar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      router.replace('/login');
    }
  }, [hasHydrated, accessToken, router]);

  // Avoid rendering protected content (or flashing a redirect) before
  // we know whether a token exists in localStorage.
  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!accessToken) {
    return null; // redirect is in-flight
  }

  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="flex flex-1 flex-col">
        {/* <Topbar /> */}
        <main className="flex-1 overflow-y-auto bg-muted/20 p-6">{children}</main>
      </div>
    </div>
  );
}