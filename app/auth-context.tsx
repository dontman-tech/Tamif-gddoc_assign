import React, { createContext, useContext, useMemo, useState } from "react";

type AuthUser = {
  email: string;
  name?: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  signIn: (email: string) => void;
  signUp: (name: string, email: string) => void;
  logout: () => void;
  getDisplayName: () => string;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function getEmailName(email: string) {
  return email.split("@")[0]?.trim() || "Guest";
}

function formatDisplayName(name: string) {
  const trimmedName = name.trim();

  if (trimmedName.length <= 5) {
    return trimmedName;
  }

  return `${trimmedName.slice(0, 5)}...`;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  const value = useMemo(
    () => ({
      user,
      signIn: (email: string) => {
        setUser({ email: email.trim() });
      },
      signUp: (name: string, email: string) => {
        setUser({
          email: email.trim(),
          name: name.trim(),
        });
      },
      logout: () => {
        setUser(null);
      },
      getDisplayName: () => {
        if (!user) {
          return "Guest";
        }

        return formatDisplayName(user.name?.trim() || getEmailName(user.email));
      },
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
