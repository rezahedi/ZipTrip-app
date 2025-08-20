import React, { createContext, useContext, useState } from "react";

type AuthModalContextType = {
  isLoginOpen: boolean;
  isRegisterOpen: boolean;
  isPasswordResetOpen: boolean;
  openLogin: () => void;
  openRegister: () => void;
  openPasswordReset: () => void;
  closeLogin: () => void;
  closeRegister: () => void;
  closePasswordReset: () => void;
};

const AuthModalContext = createContext<AuthModalContextType>({
  isLoginOpen: false,
  isRegisterOpen: false,
  isPasswordResetOpen: false,
  openLogin: () => {},
  openRegister: () => {},
  openPasswordReset: () => {},
  closeLogin: () => {},
  closeRegister: () => {},
  closePasswordReset: () => {},
});

export const AuthModalProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isLoginOpen, setIsLoginOpen] = useState<boolean>(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState<boolean>(false);
  const [isPasswordResetOpen, setIsPasswordResetOpen] =
    useState<boolean>(false);

  const openLogin = () => {
    setIsLoginOpen(true);
    setIsRegisterOpen(false);
    setIsPasswordResetOpen(false);
  };

  const openRegister = () => {
    setIsRegisterOpen(true);
    setIsLoginOpen(false);
    setIsPasswordResetOpen(false);
  };

  const openPasswordReset = () => {
    setIsPasswordResetOpen(true);
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
  };

  const closeLogin = () => setIsLoginOpen(false);
  const closeRegister = () => setIsRegisterOpen(false);
  const closePasswordReset = () => setIsPasswordResetOpen(false);

  return (
    <AuthModalContext.Provider
      value={{
        isLoginOpen,
        isRegisterOpen,
        isPasswordResetOpen,
        openLogin,
        openRegister,
        openPasswordReset,
        closeLogin,
        closeRegister,
        closePasswordReset,
      }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export const useAuthModal = () => useContext(AuthModalContext);
