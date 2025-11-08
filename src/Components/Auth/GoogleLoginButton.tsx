import React from "react";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

const GoogleLoginButton = ({
  onLogin,
}: {
  onLogin: (code: string) => void;
}) => {
  return (
    <GoogleLogin
      onSuccess={(response: CredentialResponse) => {
        if (response.credential) onLogin(response.credential);
      }}
    />
  );
};

export default GoogleLoginButton;
