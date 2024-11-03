import React from "react";
import { signInWithGoogle } from "../utilities/auth";
import { useNavigate } from "react-router-dom";
import { Button, Box, Typography } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

const Login = () => {
  const navigate = useNavigate();

  const handleSignIn = async () => {
    const user = await signInWithGoogle();

    if (user) {
      navigate("/");
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      gap="16px"
      marginTop="200px"
    >
      <Typography variant="h5" fontWeight="600" gutterBottom>
        Welcome to 🍇 uvas
      </Typography>
      <Button
        variant="contained"
        color="primary"
        startIcon={<GoogleIcon />}
        onClick={handleSignIn}
      >
        Sign in with Google
      </Button>
    </Box>
  );
};

export default Login;
