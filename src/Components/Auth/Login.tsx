import React, { useState } from "react";
import { postData } from "@/util";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { User } from "@/types";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { GoogleOAuthProvider } from "@react-oauth/google";
import GoogleLoginButton from "./GoogleLoginButton";

const LoginPage = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkbox, setCheckbox] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const { login } = useAuth();
  const { openRegister, openForgotPassword } = useAuthModal();

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrorMessage("");

    if (!newEmail) {
      setEmailError("Email is required.");
      setIsValid(false);
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newEmail)
    ) {
      setEmailError("Email is invalid.");
      setIsValid(false);
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrorMessage("");

    if (!newPassword || newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValid(false);
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setPasswordError(
        "Password must include at least one uppercase letter and number.",
      );
      setIsValid(false);
    } else {
      setPasswordError("");
      setIsValid(true);
    }
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCheckbox(event.target.checked);
  };

  const handleDialogClose = () => {
    setEmail("");
    setPassword("");
    setCheckbox(false);
    setEmailError("");
    setPasswordError("");
    setErrorMessage("");
    setIsValid(true);
    handleClose();
  };

  const handleLogin = async (
    demoData: { email: string; password: string } | null = null,
  ) => {
    if (!demoData && (!email || !password || !isValid)) {
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setIsValid(false);
      return;
    }

    try {
      const userData: User = await postData(
        "auth/login",
        demoData || { email, password },
        setErrorMessage,
      );
      if (userData) {
        await login(userData);
        handleDialogClose();
      }
    } catch (err: unknown) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;
      setErrorMessage(`Error sending data to server: ${errorMessage}`);
    }
  };

  const handleGoogleLogin = async (code: string) => {
    if (!code) return setErrorMessage("Code is required");

    try {
      const userData = await postData(
        "auth/login/google",
        { code },
        setErrorMessage,
      );
      if (userData) {
        await login(userData);
        handleDialogClose();
      }
    } catch (err: unknown) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;
      setErrorMessage(`Error sending data to server: ${errorMessage}`);
    }
  };

  const handleDemoLogin = async (email: string, password: string) => {
    await handleLogin({ email, password });
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose} modal>
      <DialogContent className="px-3 py-8 w-full max-w-full h-full sm:w-auto sm:max-w-4xl sm:h-auto rounded-none sm:rounded-lg items-center">
        <div className="flex gap-8 md:p-8 md:w-3xl">
          {/* Left Section */}
          <div className="flex-1 md:flex-1/2 px-2 py-3 space-y-2">
            <h5 className="flex justify-center text-3xl">Sign In</h5>
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID}
            >
              <GoogleLoginButton onLogin={handleGoogleLogin} />
            </GoogleOAuthProvider>
            <div className="my-4 text-foreground/60 text-center">OR</div>
            <label className="block">
              Email:
              <input
                className="w-full border rounded-sm bg-background py-2 px-3"
                type="email"
                value={email}
                onChange={handleEmailChange}
                required
              />
              {emailError && <p className="text-destructive">{emailError}</p>}
            </label>
            <label className="block">
              Password:
              <input
                className="w-full border rounded-sm bg-background py-2 px-3"
                type="password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              {passwordError && (
                <span className="text-destructive">{passwordError}</span>
              )}
            </label>
            <div className="flex justify-between items-center">
              <label>
                <input
                  type="checkbox"
                  checked={checkbox}
                  onChange={handleCheckboxChange}
                  className="mr-1"
                />
                Remember for 30 days
              </label>
              <Button
                variant="link"
                onClick={openForgotPassword}
                className="p-0"
              >
                Forgot password?
              </Button>
            </div>
            <Button
              variant="default"
              className="w-full active:scale-95"
              onClick={() => handleLogin()}
            >
              Sign in
            </Button>
            {errorMessage && (
              <p className="text-destructive mt-2">{errorMessage}</p>
            )}
            <p className="mt-2 text-center">
              Don`t have an account?{" "}
              <Button
                variant="link"
                onClick={openRegister}
                className="p-0 font-semibold hover:text-primary"
              >
                Sign up
              </Button>
            </p>
            <p className="text-sm flex gap-1 items-center justify-center">
              <span className="italic">Demo login:</span>
              <Button
                variant={"outline"}
                className="hover:bg-primary"
                onClick={() =>
                  handleDemoLogin("john.doe@example.com", "B5TTP76m2NSBbye")
                }
              >
                John Doe
              </Button>
              <Button
                variant={"outline"}
                className="hover:bg-primary"
                onClick={() =>
                  handleDemoLogin("sarah.smith@example.com", "B5TTP76m2NSBbye")
                }
              >
                Sarah Smith
              </Button>
            </p>
          </div>

          {/* Right Section */}
          <div className="flex-1/2 p-8 px-10 hidden md:flex flex-col justify-center items-center text-center bg-primary/20 rounded-sm">
            <h5 className="font-bold text-2xl">Welcome to ZipTrip!</h5>
            <p className="mb-5 p-2 font-semibold text-lg">
              Get started now and make each day count by planning fun and
              meaningful activities that fit your lifestyle!
            </p>
            <img
              src="/images/login.jpg"
              className="object-cover w-full max-w-[350px] h-[150px] sm:h-[190px] mx-auto rounded-sm"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LoginPage;
