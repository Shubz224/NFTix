import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Web3Provider } from "./context/Web3Context.js"; // Adjust import path
import { GoogleOAuthProvider } from "@react-oauth/google"; // Import GoogleOAuthProvider

const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID"; // Replace with your actual client ID

ReactDOM.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Web3Provider>
        <App />
      </Web3Provider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
