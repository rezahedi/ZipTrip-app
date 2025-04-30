import React, { useState } from "react";
import { TextField, Button, Typography, Box } from "@mui/material";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/request-reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setMessage("Password reset email sent! Check your inbox.");
      } else {
        const data = await res.json();
        setMessage(data.msg || "Something went wrong.");
      }
    } catch (err) {
      setMessage("Error sending reset request.");
    }
  };

  return (
    <Box maxWidth={400} mx="auto">
      <Typography variant="h5" mb={2}>Forgot Password</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" variant="contained" fullWidth>
          Send Reset Link
        </Button>
      </form>
      {message && (
        <Typography mt={2} color="primary">{message}</Typography>
      )}
    </Box>
  );
};

export default ForgotPassword;
