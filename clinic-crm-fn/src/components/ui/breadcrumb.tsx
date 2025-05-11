import * as React from "react";
import { ChevronRight } from "lucide-react";

const Breadcrumb = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <nav className={className}>
    <ol className="flex items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
      {children}
    </ol>
  </nav>
);

const BreadcrumbItem = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-center gap-1.5">
    <ChevronRight className="h-3.5 w-3.5" />
    {children}
  </li>
);

const BreadcrumbLink = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => (
  <a href={href} className={className}>
    {children}
  </a>
);

export { Breadcrumb, BreadcrumbItem, BreadcrumbLink };
