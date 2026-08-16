"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { users as seedUsers } from "@/data/users";
import type { Role, User } from "@/lib/types";

const AUTH_KEY = "forge-auth-user";
const USERS_KEY = "forge-users";

type PublicUser = Omit<User, "password">;

type AuthContextValue = {
  user: PublicUser | null;
  ready: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (name: string, email: string, password: string) => {
    ok: boolean;
    error?: string;
  };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toPublic(user: User): PublicUser {
  const { password: _, ...rest } = user;
  return rest;
}

function loadUsers(): User[] {
  if (typeof window === "undefined") return seedUsers;
  try {
    const raw = localStorage.getItem(USERS_KEY);
    if (!raw) {
      localStorage.setItem(USERS_KEY, JSON.stringify(seedUsers));
      return seedUsers;
    }
    return JSON.parse(raw) as User[];
  } catch {
    return seedUsers;
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    loadUsers();
    try {
      const raw = localStorage.getItem(AUTH_KEY);
      if (raw) setUser(JSON.parse(raw) as PublicUser);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  const login = useCallback((email: string, password: string) => {
    const list = loadUsers();
    const found = list.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    const pub = toPublic(found);
    localStorage.setItem(AUTH_KEY, JSON.stringify(pub));
    setUser(pub);
    return { ok: true };
  }, []);

  const register = useCallback((name: string, email: string, password: string) => {
    const list = loadUsers();
    if (list.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with this email already exists." };
    }
    const next: User = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      role: "user" as Role,
    };
    const updated = [...list, next];
    localStorage.setItem(USERS_KEY, JSON.stringify(updated));
    const pub = toPublic(next);
    localStorage.setItem(AUTH_KEY, JSON.stringify(pub));
    setUser(pub);
    return { ok: true };
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem(AUTH_KEY);
    setUser(null);
  }, []);

  const value = useMemo(
    () => ({ user, ready, login, register, logout }),
    [user, ready, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
