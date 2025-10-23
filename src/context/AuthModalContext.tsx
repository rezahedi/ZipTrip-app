import React, { createContext, useContext, useState } from "react";

type AuthModalContextType = {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isForgotPasswordOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  openForgotPassword: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closeForgotPassword: () => void;
};

const AuthModalContext = createContext<AuthModalContextType | undefined>(
  undefined,
);

export const AuthModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] =
    useState<boolean>(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsForgotPasswordOpen(false);
  };

  const openForgotPassword = () => {
    setIsForgotPasswordOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);
  const closeForgotPassword = () => setIsForgotPasswordOpen(false);

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isForgotPasswordOpen,
        openLogin,
        openRegister,
        openForgotPassword,
        closeLogin,
        closeRegister,
        closeForgotPassword,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => {
  const context = useContext(AuthModalContext);
  if (!context) {
    throw new Error("useAuthModal must be used within its provider");
  }
  return context;
};
