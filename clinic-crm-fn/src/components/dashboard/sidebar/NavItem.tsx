import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  tooltip: string;
  active?: boolean;
  showLabel?: boolean;
}

export function NavItem({
  href,
  icon,
  tooltip,
  active,
  showLabel,
}: NavItemProps) {
  const baseClasses = cn(
    "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
    active
      ? "bg-primary text-white" // Active state: Blue background with white text
      : "text-muted-foreground hover:bg-muted hover:text-primary" // Inactive state: Muted text with hover effect
  );

  const content = (
    <Link href={href} className={baseClasses}>
      {icon}
      {showLabel && <span>{tooltip}</span>}
    </Link>
  );

  // Show tooltip only when label is hidden (e.g., on narrow sidebar)
  return showLabel ? (
    content
  ) : (
    <Tooltip delayDuration={0}>
      <TooltipTrigger asChild>{content}</TooltipTrigger>
      <TooltipContent side="right">{tooltip}</TooltipContent>
    </Tooltip>
  );
}
