"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Briefcase,
  Users,
  MessageSquare,
  LogOut,
} from "lucide-react";
import { useAuthStore } from "@/store/auth.store";
import { apiClient } from "@/lib/api/client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const navigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Blogs", href: "/admin/blogs", icon: FileText },
  { name: "Events", href: "/admin/events", icon: Calendar },
  { name: "Projects", href: "/admin/projects", icon: Briefcase },
  { name: "Team Members", href: "/admin/team", icon: Users },
  { name: "Contacts", href: "/admin/contacts", icon: MessageSquare },
];

export function Sidebar() {
  const pathname = usePathname();
  const logoutState = useAuthStore((state) => state.logout);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await apiClient.post("/auth/logout");
      logoutState();
      toast.success("Logged out successfully");
      router.push("/admin/login");
    } catch (err) {
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="flex h-full w-64 flex-col border-r bg-card">
      <div className="flex h-16 shrink-0 items-center px-6 border-b">
        <span className="text-lg font-bold tracking-tight">ACM Admin</span>
      </div>
      
      <div className="flex flex-1 flex-col overflow-y-auto pt-4 pb-4">
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => {
            // Check if exact match for dashboard, or starts with for nested routes
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  "group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors"
                )}
              >
                <item.icon
                  className={cn(
                    isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground",
                    "mr-3 h-5 w-5 shrink-0 transition-colors"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        
        <div className="px-3 mt-auto">
          <button
            onClick={handleLogout}
            className="group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium text-destructive hover:bg-destructive/10 transition-colors"
          >
            <LogOut className="mr-3 h-5 w-5 shrink-0" aria-hidden="true" />
            Log out
          </button>
        </div>
      </div>
    </div>
  );
}
