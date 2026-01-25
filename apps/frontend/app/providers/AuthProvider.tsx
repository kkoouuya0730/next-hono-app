"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import { getAuthenticatedUser } from "@/aws/auth";
import { signOut } from "aws-amplify/auth";
import { MeResponse } from "@/types/me";
import { apiFetch } from "@/utils/fetchClient";
import { Hub } from "aws-amplify/utils";

type AuthContextValue = {
  user: MeResponse | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<MeResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchingRef = useRef(false);

  const fetchUser = async () => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;

    setIsLoading(true);
    try {
      await getAuthenticatedUser();

      const me = await apiFetch<MeResponse>("/me");
      setUser(me);
    } catch {
      setUser(null);
    } finally {
      setIsLoading(false);
      fetchingRef.current = false;
    }
  };

  useEffect(() => {
    fetchUser();

    const unsubscribe = Hub.listen("auth", ({ payload }) => {
      if (payload.event === "signedIn") {
        fetchUser();
      }
      if (payload.event === "signedOut") {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const logout = async () => {
    await signOut();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        logout,
        refresh: fetchUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within AuthProvider");
  }
  return context;
}
