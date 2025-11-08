import React from "react";
import RegisterPage from "../Auth/Register";
import LoginPage from "../Auth/Login";
import ForgotPassword from "../Auth/ForgotPassword";
import { Link } from "react-router-dom";
import { useAuthModal } from "@/context/AuthModalContext";
import HeaderActions from "./HeaderActions";
import Banner from "./Banner";
import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { postData } from "@/util";
import { useAuth } from "@/context/AuthContext";

export const NAV_MENU = [
  { text: "Home", link: "/" },
  { text: "Explore", link: "/explore" },
  { text: "About", link: "#" },
];

const Header = ({ withBanner = true }: { withBanner?: boolean }) => {
  const {
    isLoginOpen,
    isRegisterOpen,
    isForgotPasswordOpen,
    closeLogin,
    closeRegister,
    closeForgotPassword,
  } = useAuthModal();

  const { login } = useAuth();

  useGoogleOneTapLogin({
    onSuccess: async (response: CredentialResponse) => {
      if (response.credential) handleGoogleLogin(response.credential);
    },
    onError: async () => {
      console.log("Login Failed");
    },
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true,
  });

  const handleGoogleLogin = async (code: string) => {
    if (!code) return;

    try {
      const userData = await postData("auth/login/google", { code }, () => {});
      if (userData) {
        await login(userData);
      }
    } catch (err: unknown) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;
      // TODO: a toast to show the error: setErrorMessage(`Error sending data to server: ${errorMessage}`);
      console.log(`Error sending data to server: ${errorMessage}`);
    }
  };

  return (
    <header>
      <div className="bg-background flex items-center py-2">
        <Link
          to="/"
          className="w-32 h-11 bg-[url('/images/logo-text-3.png')] dark:bg-[url('/images/logo-text-3-light.png')] bg-cover"
        >
          <span className="sr-only">ZipTrip</span>
        </Link>
        <nav className="grow">
          <ol className="hidden sm:flex gap-1 justify-center text-lg font-semibold [&_a]:px-4 [&_a]:py-2 [&_a]:rounded-full [&_a]:hover:bg-primary/15 [&_a]:transition-all [&_a]:duration-200">
            {NAV_MENU.map((item) => (
              <li key={item.text}>
                <Link to={item.link}>{item.text}</Link>
              </li>
            ))}
          </ol>
        </nav>
        <HeaderActions />
      </div>

      {/* Register Dialog */}
      <RegisterPage open={isRegisterOpen} handleClose={closeRegister} />
      {/* Login Dialog */}
      <LoginPage open={isLoginOpen} handleClose={closeLogin} />
      <ForgotPassword
        open={isForgotPasswordOpen}
        handleClose={closeForgotPassword}
      />

      {withBanner && <Banner />}
    </header>
  );
};

export default Header;
