"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { toast } from "sonner";
import api, { setAuthToken } from "../lib/api";

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    name: string,
    email: string,
    password: string,
  ) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isAuthenticated = !!user;

  const fetchUser = useCallback(async () => {
    setIsLoading(true);
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
      
      if (token) {
        setAuthToken(token);
        const response = await api.get("/auth/me");
        setUser(response.data);
      }
    } catch (error) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem("token");
      }
      setAuthToken(null);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      const { access_token } = response.data;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem("token", access_token);
      }
      
      setAuthToken(access_token);
      await fetchUser();
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error("Login failed");
      throw error;
    }
  };

  const register = async (
    name: string,
    email: string,
    password: string,
  ) => {
    try {
      await api.post("/auth/register", { name, email, password });
      toast.success("Registration successful. Please log in.");
    } catch (error) {
      toast.error("Registration failed");
      throw error;
    }
  };

  const logout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem("token");
    }
    setAuthToken(null);
    setUser(null);
    toast.success("Logged out successfully");
  };

  const value = {
    user,
    isAuthenticated,
    login,
    register,
    logout,
    isLoading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};