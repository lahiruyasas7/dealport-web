"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { Sidebar } from "@/components/layout/sidebar";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Topbar } from "@/components/layout/topbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const hasHydrated = useAuthStore((s) => s.hasHydrated);
  const accessToken = useAuthStore((s) => s.accessToken);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (hasHydrated && !accessToken) {
      router.replace("/login");
    }
  }, [hasHydrated, accessToken, router]);

  if (!hasHydrated) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <span className="text-sm text-muted-foreground">Loading...</span>
      </div>
    );
  }

  if (!accessToken) {
    return null;
  }

  return (
    <div className="flex min-h-screen">
      {/* Mobile sidebar drawer */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="w-[260px] p-0 border-r-0">
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </SheetContent>
      </Sheet>

      {/* Desktop sidebar */}
      <aside className="hidden lg:block w-[260px] fixed left-0 top-0 h-screen bg-white border-r border-border z-30">
        <Sidebar />
      </aside>

      {/* Main area */}
      <div className="flex flex-1 flex-col lg:ml-[260px] min-w-0">
        <Topbar onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto bg-muted/20 p-4 sm:p-6">
          {children}
        </main>
      </div>
    </div>
  );
}
