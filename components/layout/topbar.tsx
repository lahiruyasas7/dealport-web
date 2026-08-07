"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Bell, Settings, Menu, Sun } from "lucide-react";
import { Switch } from "../ui/switch";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { useAuthStore } from "@/features/auth/stores/auth-store";

interface TopbarProps {
  onMenuClick: () => void;
}

function getPageTitle(pathname: string): string {
  // Most-specific routes first
  const routes: { pattern: RegExp; title: string }[] = [
    { pattern: /^\/products\/add$/, title: "Add Product" },

    { pattern: /^\/products(\/|$)/, title: "All Products" },

    { pattern: /^\/dashboard$/, title: "Dashboard" },
  ];

  for (const route of routes) {
    if (route.pattern.test(pathname)) return route.title;
  }

  return "Dashboard";
}

export function Topbar({ onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const pageTitle = useMemo(() => getPageTitle(pathname), [pathname]);
  const user = useAuthStore((s) => s.user);

  const initials = user?.name?.charAt(0).toUpperCase() ?? "D";

  return (
    <header className="sticky top-0 z-20 flex h-[72px] items-center gap-4 border-b border-border/50 bg-white/80 backdrop-blur-md px-4 lg:px-6">
      {/* Mobile menu toggle */}
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden shrink-0"
        onClick={onMenuClick}
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Open menu</span>
      </Button>

      {/* Dynamic Title */}
      <h1 className="text-[22px] font-bold text-foreground hidden sm:block shrink-0">
        {pageTitle}
      </h1>

      <div className="flex items-center w-full justify-end md:gap-8">
        {/* Search */}
        <div className="flex-1 flex justify-center max-w-[407px]">
          <div className="relative w-full">
            <Input
              type="search"
              placeholder="Search data, users, or reports"
              className="w-full pl-4 md:pl-10 h-10 rounded-full bg-muted border-0 focus-visible:ring-primary placeholder:text-xs md:placeholder:text-sm"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-6 w-6 text-muted-foreground pointer-events-none" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0">
          <Button
            variant="ghost"
            size="icon"
            className="relative hidden sm:flex"
          >
            <Bell className="h-5 w-5" />
            <span className="absolute top-2 right-2 h-2 w-2 rounded-full bg-error ring-2 ring-white" />
            <span className="sr-only">Notifications</span>
          </Button>

          <button className="relative flex h-8 w-14 items-center rounded-full bg-muted p-1 transition-colors">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-md transition-transform">
              <Sun className="h-4 w-4" />
            </span>
          </button>

          <div className="h-9 w-9 rounded-full bg-muted overflow-hidden ml-1 flex items-center justify-center text-sm font-semibold text-foreground">
            {initials}
          </div>
        </div>
      </div>
    </header>
  );
}
