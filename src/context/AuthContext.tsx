import { createContext, useContext, useEffect, useState } from "react";
import React from "react";
import PropTypes from "prop-types";
import { AuthModalProvider } from "./AuthModalContext";
import { User } from "@/types";

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (userData: User) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  useEffect(() => {
    if (!user) return;

    const expiresIn = new Date(user.expiresIn).getTime() - Date.now();
    const timer = setTimeout(() => {
      localStorage.removeItem("user");
      setUser(null);
    }, expiresIn);

    return () => clearTimeout(timer);
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider
      value={{ user, token: user?.token || null, login, logout }}
    >
      <AuthModalProvider>{children}</AuthModalProvider>
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within its provider");
  }
  return context;
};

export { AuthProvider, useAuth };
