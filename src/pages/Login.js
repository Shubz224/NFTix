import React, { useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const { login } = useContext(Web3Context);

  // Function to handle wallet login
  const handleWalletLogin = async () => {
    await login();
  };

  // Function to handle Google login
  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    // Handle the credential and proceed with the backend authentication
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen space-y-6">
      <button
        className="bg-blue-500 text-white px-6 py-3 rounded"
        onClick={handleWalletLogin}
      >
        Login with Wallet
      </button>
      <div>
        <GoogleLogin
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
      </div>
    </div>
  );
};

export default Login;
