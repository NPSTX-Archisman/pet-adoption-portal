import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import type { ReactNode } from "react";
import type { CurrentUser } from "../types/user";
import { getUser } from "../api/auth.api";

interface AuthContextType {
  user: CurrentUser | null;
  role: string | null;
  refreshRole: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext =
  createContext<AuthContextType>(
    {} as AuthContextType
  );

function getRoleCookie(): string | null {

  const roleCookie = document.cookie.split("; ").find(
        cookie =>
          cookie.startsWith("role=")
      );

  return roleCookie
    ? roleCookie.split("=")[1]
    : null;
}

export function AuthProvider({
  children,
}: {
  children: ReactNode;
}) {

  const [role, setRole] =
    useState<string | null>(
      getRoleCookie()
    );

  const [user, setUser] = useState<CurrentUser | null>(null);

  const refreshRole = () => {
    setRole(
      getRoleCookie()
    );
  };

  const refreshUser = async () => {
    try {
      const response = await getUser();
      setUser(response.data);
    } catch (error) {
      setUser(null);
    }
  }

  useEffect(() => {
    refreshUser();
  }, [])  

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        refreshRole,
        refreshUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}