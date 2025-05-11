"use client";

import { usePathname } from "next/navigation";
import { UserNav } from "./sidebar/UserNav";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils"; // Fix typo in "utils" (was "utlis")

export function DashboardHeader() {
  const pathname = usePathname();

  // Get the current page title from the URL path
  const getPageTitle = () => {
    if (pathname.includes("/progress")) return "Progress Tracking";
    if (pathname.includes("/shipments")) return "Medication Shipments";
    return "Dashboard Overview";
  };

  // Get breadcrumb paths
  const getBreadcrumbs = () => {
    const segments = pathname.split("/").filter(Boolean);
    return segments.map((segment, index) => ({
      name: segment.charAt(0).toUpperCase() + segment.slice(1),
      path: `/${segments.slice(0, index + 1).join("/")}`,
    }));
  };

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
      <div className="flex flex-1 items-center gap-4">
        <Breadcrumb className="hidden md:flex">
          {getBreadcrumbs().map((crumb, index) => (
            <BreadcrumbItem key={index}>
              <BreadcrumbLink
                href={crumb.path}
                className={cn(
                  "text-sm",
                  index === getBreadcrumbs().length - 1
                    ? "font-medium text-foreground"
                    : "text-muted-foreground"
                )}
              >
                {crumb.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
          ))}
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-4">
        <h1 className="text-lg font-semibold md:text-xl">{getPageTitle()}</h1>
        <div className="ml-auto">
          <UserNav />
        </div>
      </div>
    </header>
  );
}
