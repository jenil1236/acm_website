"use client";

import { useEffect } from "react";
import { Sidebar } from "./sidebar";
import { Navbar } from "./navbar";
import { useAuthStore } from "@/store/auth.store";
import { apiClient } from "@/lib/api/client";

export function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const { setAuth, setLoading } = useAuthStore();

  useEffect(() => {
    // Sync Zustand state with backend session on mount
    const verifySession = async () => {
      try {
        const res = await apiClient.get("/auth/me");
        if (res.data.success && res.data.data.isLoggedIn) {
          setAuth(res.data.data.username);
        } else {
          setAuth(null);
        }
      } catch {
        setAuth(null);
      } finally {
        setLoading(false);
      }
    };
    verifySession();
  }, [setAuth, setLoading]);

  return (
    <div className="flex h-screen overflow-hidden bg-muted/20">
      {/* Sidebar hidden on mobile (needs a mobile drawer, but fine for now) */}
      <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col lg:pl-64 h-full">
        <Navbar />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
