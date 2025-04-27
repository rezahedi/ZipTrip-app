import React, { useState } from "react";
import PropTypes from "prop-types";
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
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";
import { postData } from "../../util";
import { useAuth } from "../../context/AuthContext";
// import LoginPage from "./Login";

const URL = `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/register`;

const RegisterPage = ({ open, handleClose, onSwitchToLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [checkbox, setCheckbox] = useState(false);

  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isValid, setIsValid] = useState(true);

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleNameChange = (event) => {
    setName(event.target.value);

    if (!name || name.length < 3) {
      setNameError("Name must be at least 3 characters.");
      setIsValid(false);
    } else {
      setNameError("");
      setIsValid(true);
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);

    if (!email) {
      setEmailError("Email is required.");
      setIsValid(false);
    } else if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(email)) {
      setEmailError("Email is invalid.");
      setIsValid(false);
    } else {
      setEmailError("");
      setIsValid(true);
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);

    if (!password || password.length < 8) {
      setPasswordError("Password must be at least 8 characters.");
      setIsValid(false);
    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(password)) {
      setPasswordError(
        "Password must include at least one uppercase letter, one lowercase letter, and one number.",
      );
      setIsValid(false);
    } else {
      setPasswordError("");
      setIsValid(true);
    }
  };

  const handleCheckboxChange = (event) => {
    setCheckbox(event.target.checked);
  };

  const requestBody = {
    name: name,
    email: email,
    password: password,
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
      const data = await postData(URL, requestBody);
      if (data) {
        console.log(data);
        const { token, _id: userId, name, email, imageURL } = data;
        login(userId, name, email, imageURL, token);
        navigate("/account");
        handleClose();
      }
    } catch (error) {
      console.error("Registration failed", error);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth={false}
      slotProps={{
        sx: {
          width: { xs: "100%", sm: "90%", md: "80%" },
          maxWidth: 600,
          borderRadius: 3,
        },
      }}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>
        <IconButton
          aria-label="close"
          onClick={handleClose}
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
          p: { xs: 4, sm: 8 },
          m: { xs: 2, sm: 3 },
          width: "100%",
          maxWidth: 700,
        }}
      >
        <Box>
          {/* Left Section */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            {/* Form */}
            <Box
              sx={{
                flex: 1,
                px: 2,
                py: 3,
                minWidth: { xs: "250px", sm: "300px" },
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
              <Typography variant="body2" sx={{ mt: 2, textAlign: "center" }}>
                Already have an account?{" "}
                <Button
                  variant="text"
                  onClick={onSwitchToLogin}
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
                flex: 1,
                minWidth: { xs: "250px", sm: "300px" },
                backgroundColor: "#484747",
                color: "white",
                px: 2,
                py: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                textAlign: "center",
              }}
            >
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Welcome to OneDayPlan!
              </Typography>
              <Typography variant="body2" sx={{ mb: 5, p: 2 }}>
                Get started now and make each day count by planning fun and
                meaningful activities that fit your lifestyle!
              </Typography>
              <Box
                component="img"
                src="https://s3-alpha-sig.figma.com/img/48f1/4826/c25c43d183d79ae91c15f66b7e2f61f8?Expires=1745798400&Key-Pair-Id=APKAQ4GOSFWCW27IBOMQ&Signature=TE-A-vmPCp~~Pp13vu9Pjz0g2BysQrB15UKyQIwref7o-EESixHLj-aFTRRXWsk1tTkMDtEwOR0m3rOg-hXkywniX3WpFCdGe8ys6BJz9Bg46toz3Gdg4P~RZkMIhWV31~1QcfhCU-WgBmOOFcKCjcI-X2Us7dtYmYb~XcciPvktsiWNeUEzXkR5WD4KmGrsoO2n~YbjBaE8FovtQUZAGPPY3wGXGW7B6hJ8OD4osAezrOrOhPfRTD3tqg4ws00kTW11CQljoCG9q0fSNc7Nbj9ABqiuRaoDSBBGl3~R-bnGSv1GiuzQ72O7K-K-k57aBvKRnFwYTAQTe~VtDLSQfg__"
                alt="City View"
                sx={{
                  width: "100%",
                  maxWidth: 350,
                  height: 190,
                  objectFit: "cover",
                  objectPosition: "bottom",
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

RegisterPage.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  onSwitchToLogin: PropTypes.func,
};

export default RegisterPage;
