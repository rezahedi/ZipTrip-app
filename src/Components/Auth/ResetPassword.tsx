import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthModal } from "@/context/AuthModalContext";
import { Dialog, DialogContent } from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";

const ResetPassword = ({
  open,
  handleClose,
}: {
  open: boolean;
  handleClose: () => void;
}) => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordError, setNewPasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");
  const { openLogin, openRegister } = useAuthModal();

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken: token, newPassword }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        setErrorMessage("Password reset successful!");
        setTimeout(() => navigate("/"), 2000);
      } else {
        setErrorMessage(data.msg || "Reset failed.");
      }
    } catch (err) {
      setErrorMessage("Error resetting password.");
    }
  };

  const handleNewPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPassword = event.target.value;
    setNewPassword(newPassword);
    setErrorMessage("");

    if (!newPassword || newPassword.length < 8) {
      setNewPasswordError("Password must be at least 8 characters.");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setNewPasswordError(
        "Password must include at least one uppercase letter and number.",
      );
    } else {
      setNewPasswordError("");
    }
  };

  const handleDialogClose = () => {
    setNewPassword("");
    setErrorMessage("");
    handleClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose} modal>
      <DialogContent className="px-3 py-8 w-full max-w-full h-full sm:w-auto sm:max-w-4xl sm:h-auto rounded-none sm:rounded-lg items-center">
        <div className="flex gap-8 md:p-8 md:w-3xl">
          {/* Left Section */}
          <div className="flex-1 md:flex-1/2 px-2 py-3 space-y-2">
            <h5 className="flex justify-center text-3xl">Reset Password</h5>
            <label className="block">
              New Password:
              <input
                className="w-full border rounded-sm bg-background py-2 px-3"
                type="password"
                value={newPassword}
                onChange={handleNewPasswordChange}
                required
              />
              {newPasswordError && (
                <span className="text-destructive">{newPasswordError}</span>
              )}
            </label>
            <Button
              type="submit"
              variant="default"
              className="w-full active:scale-95"
              onClick={handleSubmit}
            >
              Reset Password
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

export default ResetPassword;
