import { createContext, useContext, useState } from "react";
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
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("token");
  });

  // TODO: Validate token and also check the expiration.

  const login = (userData: User) => {
    setUser(userData);
    setToken(userData.token);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
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
