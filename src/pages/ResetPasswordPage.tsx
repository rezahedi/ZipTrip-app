import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/Components/ui/button";

const ResetPasswordPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch("/api/v1/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ resetToken: token, newPassword: password }),
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

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setErrorMessage("");

    if (!newPassword || newPassword.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(newPassword)) {
      setPasswordError(
        "Password must include at least one uppercase letter and number.",
      );
    } else {
      setPasswordError("");
    }
  };

  return (
    <div className="mt-0.5 mb-1">
      <div className="shadow-[3px_3px_10px] shadow-foreground/30 rounded-md w-full sm:w-2xl mx-auto p-8 space-y-4">
        <h5 className="text-lg font-bold mt-4 text-center">Reset Password</h5>
        <p className="mt-2 text-center">
          Enter your new password below. It must be 8 to 128 characters long and
          contain at least one uppercase letter, one lowercase letter, and one
          number.
        </p>
        <label className="flex flex-col">
          New Password:
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
        <Button onClick={handleSubmit} variant="default" className="w-full">
          Reset Password
        </Button>
        {errorMessage && (
          <p className="text-destructive mt-2">{errorMessage}</p>
        )}
      </div>
    </div>
  );
};

export default ResetPasswordPage;
