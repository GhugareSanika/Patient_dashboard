"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Cookies from "js-cookie";

// Utility to generate a color from a string (e.g., email)
function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const color = `hsl(${hash % 360}, 70%, 50%)`; // HSL color for consistency
  return color;
}

export function UserNav() {
  const { data: session } = useSession();
  const router = useRouter();
  const { toast } = useToast();

  const user = session?.user;
  const email = user?.email ?? "";
  const fallbackInitial = email.charAt(0).toUpperCase();
  const bgColor = stringToColor(email);

  const handleLogout = () => {
    Cookies.remove("authToken");
    toast({
      title: "Logout Successful",
      description: "You have been logged out successfully.",
      duration: 5000,
    });
    router.push("/login");
  };

  const handleProfile = () => {
    router.push("/profile");
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-8 w-8 rounded-full bg-sky-100 hover:bg-sky-200"
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src={user?.image || ""} alt="User" />
            <AvatarFallback
              style={{ backgroundColor: bgColor, color: "white" }}
            >
              {fallbackInitial || "U"}
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user?.name || "User"}
            </p>
            {email && (
              <div className="flex items-center text-xs text-muted-foreground gap-1">
                <Mail className="h-4 w-4" />
                <span>{email}</span>
              </div>
            )}
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleProfile}>Profile</DropdownMenuItem>
        <DropdownMenuItem>Settings</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
