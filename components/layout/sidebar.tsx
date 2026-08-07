"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import {
  House,
  ShoppingCart,
  Users,
  Ticket,
  LayoutGrid,
  CreditCard,
  Tag,
  PlusSquare,
  Image as ImageIcon,
  List,
  Star,
  UserCog,
  ShieldCheck,
  Store,
  ExternalLink,
  CirclePlus,
  CircleUserRound,
  Settings,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/features/auth/stores/auth-store";

interface SidebarProps {
  onNavigate?: () => void;
}

const sections = [
  {
    title: "Main menu",
    items: [
      { label: "Dashboard", href: "/dashboard", icon: House },
      { label: "Order Management", href: "/orders", icon: ShoppingCart },
      { label: "Customers", href: "/customers", icon: Users },
      { label: "Coupon Code", href: "/coupons", icon: Ticket },
      { label: "Categories", href: "/categories", icon: LayoutGrid },
      { label: "Transaction", href: "/transactions", icon: CreditCard },
      { label: "Brand", href: "/brands", icon: Star },
    ],
  },
  {
    title: "Product",
    items: [
      { label: "Add Products", href: "/products/add", icon: CirclePlus },
      { label: "Product Media", href: "/products/media", icon: ImageIcon },
      { label: "Product List", href: "/products", icon: List },
      { label: "Product Reviews", href: "/products/reviews", icon: Star },
    ],
  },
  {
    title: "Admin",
    items: [
      { label: "Admin role", href: "/admin/roles", icon: CircleUserRound },
      { label: "Control Authority", href: "/admin/authority", icon: Settings },
    ],
  },
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  const logout = useAuthStore((s) => s.logout);
  const user = useAuthStore((s) => s.user);
  const router = useRouter();

  function handleLogout() {
    logout();
    router.replace("/login");
  }
  const initials = user?.name?.charAt(0).toUpperCase() ?? "D";
  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link
          href="/dashboard"
          onClick={onNavigate}
          className="relative h-6 w-30"
        >
          <Image
            src="/dealport-logo.svg"
            alt="Dealport"
            fill
            className="object-contain object-left"
            priority
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto px-4 py-2 space-y-6">
        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="px-3 mb-2 text-[15px] font-normal text-muted-foreground">
              {section.title}
            </h3>
            <ul className="space-y-0.5">
              {section.items.map((item) => {
                const isActive = (() => {
                  // 1. Exact match always wins
                  if (pathname === item.href) return true;

                  // 2. If another sidebar item matches this path more specifically,
                  //    this item must NOT activate via prefix.
                  const hasMoreSpecificMatch = sections.some((sec) =>
                    sec.items.some(
                      (other) =>
                        other.href !== item.href &&
                        (pathname === other.href ||
                          pathname.startsWith(`${other.href}/`)),
                    ),
                  );
                  if (hasMoreSpecificMatch) return false;

                  // 3. Safe to activate via prefix (e.g. /orders/123 on /orders)
                  return pathname.startsWith(`${item.href}/`);
                })();

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        "flex items-center gap-3 rounded-lg px-3 py-2.5 text-[16px] font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-active text-sidebar-active-foreground"
                          : "text-muted-foreground hover:bg-muted",
                      )}
                    >
                      <item.icon
                        className={cn(
                          "h-[24px] w-[24px] shrink-0",
                          isActive
                            ? "text-sidebar-active-foreground"
                            : "text-muted-foreground",
                        )}
                      />
                      <span>{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User Profile */}
      <div className="border-t border-border/60 p-4">
        <div className="flex items-center gap-3 mb-3">
          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center overflow-hidden shrink-0">
            <span className="text-sm font-semibold text-muted-foreground">
              {initials}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">
              {user?.name ?? "Dealport"}
            </p>
            <p className="text-xs text-muted-foreground truncate">
              {user?.email ?? "—"}
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="h-8 w-8 flex items-center justify-center rounded-lg text-muted-foreground hover:bg-error/10 hover:text-error transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            title="Logout"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
        <Link
          href="/shop"
          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-muted transition-colors"
        >
          <Store className="h-4 w-4 shrink-0" />
          <span>Your Shop</span>
          <ExternalLink className="h-3.5 w-3.5 ml-auto text-muted-foreground shrink-0" />
        </Link>
      </div>
    </div>
  );
}
