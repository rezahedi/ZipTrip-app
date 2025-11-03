import React from "react";
import { CodeResponse, useGoogleLogin } from "@react-oauth/google";
import { Button } from "../ui/button";
import { Google } from "@/ui/icons";

const GoogleLoginButton = ({
  onLogin,
}: {
  onLogin: (code: string) => void;
}) => {
  const handleLogin = useGoogleLogin({
    flow: "auth-code",
    onSuccess: async (response: CodeResponse) => {
      console.log("credentialResponse", response);

      onLogin(response.code);
    },
    onError: async (errorResponse) => {
      console.log("Login Failed", errorResponse);
    },
  });

  return (
    <Button
      onClick={handleLogin}
      variant="ghost"
      className="my-2 w-full p-5 font-normal text-lg bg-foreground text-background hover:bg-foreground hover:text-background active:scale-95"
    >
      <Google className="size-8" /> Sign in with Google
    </Button>
  );
};

export default GoogleLoginButton;
