import React, { useState } from "react";
import { useAuthModal } from "@/context/AuthModalContext";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

const ForgotPassword = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const { openLogin, openRegister } = useAuthModal();

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/request-reset-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        },
      );

      if (res.ok) {
        setErrorMessage("Password reset email sent! Check your inbox.");
      } else {
        const data = await res.json();
        setErrorMessage(data.msg || "Something went wrong.");
      }
    } catch (err: unknown) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;
      setErrorMessage(`Error sending reset request: ${errorMessage}`);
    }
  };

  const handleDialogClose = () => {
    setEmail("");
    setEmailError("");
    setErrorMessage("");
    handleClose();
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setErrorMessage("");

    if (!newEmail) {
      setEmailError("Email is required.");
    } else if (
      !/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(newEmail)
    ) {
      setEmailError("Email is invalid.");
    } else {
      setEmailError("");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose} modal>
      <DialogContent className="px-3 py-8 w-full max-w-full h-full sm:w-auto sm:max-w-4xl sm:h-auto rounded-none sm:rounded-lg items-center">
        <div className="flex gap-8 md:p-8 md:w-3xl">
          {/* Left Section */}
          <div className="flex-1 md:flex-1/2 px-2 py-3 space-y-4">
            <h5 className="flex justify-center text-3xl">Forgot Password</h5>
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
            <Button
              variant="default"
              className="w-full active:scale-95"
              onClick={handleSubmit}
            >
              Request Password Reset
            </Button>
            <Button
              variant="outline"
              onClick={handleDialogClose}
              className="w-full active:scale-95 hover:bg-transparent"
            >
              Cancel
            </Button>
            {errorMessage && (
              <p className="text-destructive mt-2">{errorMessage}</p>
            )}
            <p className="mt-2 text-center">
              <Button
                variant="link"
                onClick={openRegister}
                className="p-0 font-semibold hover:text-primary"
              >
                Sign up
              </Button>{" "}
              or{" "}
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

export default ForgotPassword;
