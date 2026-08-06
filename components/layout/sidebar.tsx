'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
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
  Settings
} from 'lucide-react';

interface SidebarProps {
  onNavigate?: () => void;
}

const sections = [
  {
    title: 'Main menu',
    items: [
      { label: 'Dashboard', href: '/dashboard', icon: House },
      { label: 'Order Management', href: '/orders', icon: ShoppingCart },
      { label: 'Customers', href: '/customers', icon: Users },
      { label: 'Coupon Code', href: '/coupons', icon: Ticket },
      { label: 'Categories', href: '/categories', icon: LayoutGrid },
      { label: 'Transaction', href: '/transactions', icon: CreditCard },
      { label: 'Brand', href: '/brands', icon: Star },
    ],
  },
  {
    title: 'Product',
    items: [
      { label: 'Add Products', href: '/products/add', icon: CirclePlus },
      { label: 'Product Media', href: '/products/media', icon: ImageIcon },
      { label: 'Product List', href: '/products', icon: List },
      { label: 'Product Reviews', href: '/products/reviews', icon: Star },
    ],
  },
  {
    title: 'Admin',
    items: [
      { label: 'Admin role', href: '/admin/roles', icon: CircleUserRound },
      { label: 'Control Authority', href: '/admin/authority', icon: Settings },
    ],
  },
];

export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate} className="relative h-6 w-30">
          <Image src="/dealport-logo.svg" alt="Dealport" fill className="object-contain object-left" priority />
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
                const isActive =
                  pathname === item.href || pathname.startsWith(`${item.href}/`);
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={onNavigate}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-[16px] font-medium transition-colors',
                        isActive
                          ? 'bg-sidebar-active text-sidebar-active-foreground'
                          : 'text-muted-foreground hover:bg-muted'
                      )}
                    >
                      <item.icon className="h-[24px] w-[24px] shrink-0 text-muted-foreground" />
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
            <span className="text-sm font-semibold text-muted-foreground">D</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground truncate">Dealport</p>
            <p className="text-xs text-muted-foreground truncate">Mark@thedesigner_...</p>
          </div>
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