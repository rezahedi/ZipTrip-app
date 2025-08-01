import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  IconButton,
  Divider,
  Alert,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { postData } from "@/util";
import { useAuth } from "@/context/AuthContext";
import { User } from "@/types";
// import LoginPage from "./Login";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`;

const RegisterPage = ({
  open,
  handleClose,
  onSwitchToLogin,
}: {
  open: boolean;
  handleClose: () => void;
  onSwitchToLogin: () => void;
}) => {
  const isMobile = window.innerWidth < 600;
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
      const userData: User = await postData(URL, requestBody);
      if (userData) {
        await login(userData);
        window.location.reload();
        handleDialogClose();
      }
    } catch (error: any) {
      if (error.response) {
        setErrorMessage(error.response.data.msg);
        console.log("Error message:", errorMessage);
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
      console.log("Error Message in state:", errorMessage);
      console.error("Registration failed", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleDialogClose}
      maxWidth={false}
      fullScreen={isMobile}
      slotProps={{
        sx: {
          width: { xs: "100%", sm: "90%", md: "80%" },
          maxWidth: { xs: "100%", sm: 700 },
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleDialogClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent
        sx={{
          p: { xs: 1, sm: 8 },
          m: { xs: 0, sm: 3 },
          width: "100%",
          maxWidth: { xs: "100%", sm: 700 },
          boxSizing: "border-box",
        }}
      >
        <Box>
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", md: "row" },
              gap: 2,
            }}
          >
            {/* Form */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "50%" },
                flexGrow: 1,
                flexShrink: 1,
                px: 2,
                py: 3,
              }}
            >
              <Typography
                variant="h5"
                gutterBottom
                display="flex"
                justifyContent="center"
              >
                Create Your Account
              </Typography>
              <Button
                variant="outlined"
                startIcon={<GoogleIcon />}
                fullWidth
                sx={{ my: 2 }}
              >
                Sign up with Google
              </Button>
              <Divider sx={{ my: 1 }}>
                <Typography sx={{ color: "#8c8c8c" }}>OR</Typography>
              </Divider>
              <Box>
                <TextField
                  fullWidth
                  label="Name"
                  margin="normal"
                  value={name}
                  error={nameError !== ""}
                  helperText={nameError}
                  onChange={handleNameChange}
                  onFocus={() => setErrorMessage("")}
                  required
                />
                <TextField
                  fullWidth
                  label="Email"
                  margin="normal"
                  value={email}
                  error={emailError !== ""}
                  helperText={emailError}
                  onChange={handleEmailChange}
                  onFocus={() => setErrorMessage("")}
                  required
                />
                <TextField
                  fullWidth
                  label="Password"
                  type="password"
                  margin="normal"
                  value={password}
                  error={passwordError !== ""}
                  helperText={passwordError}
                  onChange={handlePasswordChange}
                  onFocus={() => setErrorMessage("")}
                  required
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checkbox}
                      onChange={handleCheckboxChange}
                      sx={{
                        "&.Mui-checked": {
                          borderColor: "#333333",
                          color: "#333333",
                        },
                      }}
                    />
                  }
                  label={
                    <Typography variant="body2">
                      I accept all terms and conditions.
                    </Typography>
                  }
                  sx={{ mt: 0 }}
                />
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ mt: 3 }}
                  onClick={handleRegister}
                >
                  Sign in
                </Button>
              </Box>
              {/* Error Message  */}
              {errorMessage && (
                <Alert severity="error" sx={{ mt: 2 }}>
                  {errorMessage}
                </Alert>
              )}
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={() => {
                    onSwitchToLogin();
                    handleDialogClose();
                  }}
                  sx={{
                    color: "text.primary",
                    backgroundColor: "white",
                    fontWeight: "bold",
                    "&:hover": {
                      backgroundColor: "white",
                      color: "#45a049",
                    },
                  }}
                >
                  Sign in
                </Button>
              </Typography>
            </Box>

            {/* Right Section */}
            <Box
              sx={{
                flexBasis: { xs: "100%", md: "50%" },
                flexGrow: 1,
                flexShrink: 1,
                backgroundColor: "#484747",
                color: "white",
                px: 2,
                py: 4,
                display: { xs: "none", md: "flex" },
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome to ZipTrip!
              </Typography>
              <Typography variant="body2" sx={{ mb: 5, p: 2 }}>
                Get started now and make each day count by planning fun and
                meaningful activities that fit your lifestyle!
              </Typography>
              <Box
                sx={{
                  backgroundImage: "url(/images/register.jpg)",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  width: "100%",
                  maxWidth: 350,
                  height: { xs: 150, sm: 190 },
                  mx: "auto",
                  borderRadius: 2,
                }}
              />
            </Box>
          </Box>
        </Box>
      </DialogContent>
      {/* Conditionally show LoginPage if showLogin is true */}
    </Dialog>
  );
};

export default RegisterPage;
