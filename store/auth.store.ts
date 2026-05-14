import { create } from "zustand";

interface AuthState {
  isAuthenticated: boolean;
  username: string | null;
  isLoading: boolean;
  setAuth: (username: string | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  username: null,
  isLoading: true, // true initially until we verify session on mount
  setAuth: (username) =>
    set({ isAuthenticated: !!username, username, isLoading: false }),
  setLoading: (loading) => set({ isLoading: loading }),
  logout: () => set({ isAuthenticated: false, username: null, isLoading: false }),
}));
