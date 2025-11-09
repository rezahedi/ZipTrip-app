import { useAuth } from "@/context/AuthContext";
import { CredentialResponse, useGoogleOneTapLogin } from "@react-oauth/google";
import { postData } from "@/util";

const GoogleOneTap = () => {
  const { login } = useAuth();

  useGoogleOneTapLogin({
    onSuccess: async (response: CredentialResponse) => {
      if (response.credential) handleGoogleLogin(response.credential);
    },
    onError: async () => {
      console.log("Login Failed");
    },
    cancel_on_tap_outside: true,
    use_fedcm_for_prompt: true,
  });

  const handleGoogleLogin = async (code: string) => {
    if (!code) return;

    try {
      const userData = await postData("auth/login/google", { code }, () => {});
      if (userData) {
        await login(userData);
      }
    } catch (err: unknown) {
      let errorMessage = "";
      if (err instanceof Error) errorMessage = err.message;
      // TODO: a toast to show the error: setErrorMessage(`Error sending data to server: ${errorMessage}`);
      console.log(`Error sending data to server: ${errorMessage}`);
    }
  };

  return null;
};

export default GoogleOneTap;
