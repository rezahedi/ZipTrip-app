import React, { useState } from "react";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { postData } from "@/util";
import { useAuth } from "@/context/AuthContext";
import { useAuthModal } from "@/context/AuthModalContext";
import { User } from "@/types";
import GoogleLoginButton from "./GoogleLoginButton";

const RegisterPage = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [checkbox, setCheckbox] = useState<boolean>(false);

  const [nameError, setNameError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(true);

  const { login } = useAuth();
  const { openLogin } = useAuthModal();

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);

    if (!newName || newName.length < 3) {
      setNameError("Name must be at least 3 characters.");
      setIsValid(false);
    } else {
      setNameError("");
      setIsValid(true);
    }
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);

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

    if (!newPassword || newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValid(false);
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and one number.",
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

  const requestBody = {
    name: name,
    email: email,
    password: password,
  };

  const handleDialogClose = () => {
    setName("");
    setEmail("");
    setPassword("");
    setCheckbox(false);
    setEmailError("");
    setPasswordError("");
    setIsValid(true);
    setErrorMessage("");
    handleClose();
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !isValid) {
      setNameError("Name is required");
      setEmailError("Email is required");
      setPasswordError("Password is required");
      setIsValid(false);
      return;
    }

    if (!checkbox) {
      alert("Please accept the terms and conditions");
      return;
    }

    try {
      const userData: User = await postData(
        "auth/register",
        requestBody,
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

  return (
    <Dialog open={open} onOpenChange={handleDialogClose} modal>
      <DialogContent className="px-3 py-8 w-full max-w-full h-full sm:w-auto sm:max-w-4xl sm:h-auto rounded-none sm:rounded-lg items-center">
        <div className="flex gap-8 md:p-8 md:w-3xl">
          <div className="flex-1 md:flex-1/2 px-2 py-3 space-y-2">
            <h5 className="flex justify-center text-3xl">
              Create Your Account
            </h5>
            <GoogleLoginButton onLogin={handleGoogleLogin} />
            <div className="my-4 text-foreground/60 text-center">OR</div>
            <label className="block">
              Name:
              <input
                className="w-full border rounded-sm bg-background py-2 px-3"
                type="text"
                value={name}
                onChange={handleNameChange}
                onFocus={() => setErrorMessage("")}
                required
              />
              {nameError && <p className="text-destructive">{nameError}</p>}
            </label>
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
            <label className="block">
              <input
                type="checkbox"
                checked={checkbox}
                onChange={handleCheckboxChange}
                className="mr-1"
              />
              Accept all terms and conditions
            </label>
            <Button
              variant="default"
              className="w-full active:scale-95"
              onClick={handleRegister}
            >
              Sign up
            </Button>
            {errorMessage && (
              <p className="text-destructive mt-2">{errorMessage}</p>
            )}
            <p className="mt-2 text-center">
              Already have an account?{" "}
              <Button
                variant="link"
                onClick={openLogin}
                className="p-0 font-semibold hover:text-primary"
              >
                Sign in
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

export default RegisterPage;
