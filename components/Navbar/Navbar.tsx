"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";

const matchPath = {
  dashboard: { name: "Dashboard", description: "Welcome back, " },
  "/jobs": { name: "Jobs", description: "Manage your job postings" },
  "/applicants": { name: "Applicants", description: "Review your applicants" },
};

export default function Navbar() {
  const pathName = usePathname();
  const pageName = matchPath[pathName as keyof typeof matchPath];
  const userName = "Nahom";
  const navName = pageName
    ? {
        name: pageName.name,
        description: pageName.description,
      }
    : { name: "Dashboard", description: `Welcome back, ${userName}` };
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between h-16 px-6 bg-background border-b border-border">
      <div>
        <h1 className="text-xl font-semibold text-foreground">
          {navName.name}
        </h1>
        {navName.description && (
          <p className="text-sm text-muted-foreground">{navName.description}</p>
        )}
      </div>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5 text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="border-0 flex items-center gap-2 px-2 hover:bg-primary/10 hover:text-foreground data-[state=open]:bg-primary/10 transition-colors"
            >
              <Avatar className="h-8 w-8">
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="text-left hidden sm:block">
                <p className="text-sm font-medium text-foreground">Jane Doe</p>
                <p className="text-xs text-muted-foreground">Hiring Manager</p>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
