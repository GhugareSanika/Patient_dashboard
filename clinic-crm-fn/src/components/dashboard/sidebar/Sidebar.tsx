"use client";

import { usePathname } from "next/navigation";
import { Package, Scale, Home, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { NavItem } from "./NavItem";

export function Sidebar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="sm:hidden fixed top-4 left-4 z-50 p-2 bg-white border rounded-md shadow-md"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50 sm:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <aside className="fixed z-50 inset-y-0 left-0 w-56 bg-background border-r shadow-lg sm:hidden flex flex-col">
            <div className="flex items-center justify-between h-14 px-4 border-b">
              <h2 className="text-lg font-semibold">Menu</h2>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close sidebar"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-2 p-4">
              <NavItem
                href="/dashboard"
                icon={<Home className="h-5 w-5" />}
                active={pathname === "/dashboard"}
                tooltip="Dashboard"
                showLabel
              />
              <NavItem
                href="/dashboard/progress"
                icon={<Scale className="h-5 w-5" />}
                active={pathname.startsWith("/dashboard/progress")}
                tooltip="Progress"
                showLabel
              />
              <NavItem
                href="/dashboard/shipments"
                icon={<Package className="h-5 w-5" />}
                active={pathname.startsWith("/dashboard/shipments")}
                tooltip="Shipments"
                showLabel
              />
            </nav>
          </aside>
        </>
      )}

      {/* Desktop Sidebar */}
      <aside className="hidden sm:flex sm:flex-col sm:w-56 sm:shrink-0 sm:border-r sm:bg-sky-100">
        <div className="h-14 flex items-center justify-center border-b">
          <h2 className="text-lg font-semibold">Logo</h2>
        </div>
        <nav className="flex flex-col gap-2 p-4">
          <NavItem
            href="/dashboard"
            icon={<Home className="h-5 w-5" />}
            active={pathname === "/dashboard"}
            tooltip="Dashboard"
            showLabel
          />
          <NavItem
            href="/dashboard/progress"
            icon={<Scale className="h-5 w-5" />}
            active={pathname.startsWith("/dashboard/progress")}
            tooltip="Progress"
            showLabel
          />
          <NavItem
            href="/dashboard/shipments"
            icon={<Package className="h-5 w-5" />}
            active={pathname.startsWith("/dashboard/shipments")}
            tooltip="Shipments"
            showLabel
          />
        </nav>
      </aside>
    </>
  );
}
