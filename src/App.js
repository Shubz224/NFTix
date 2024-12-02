import React, { useState } from "react";
import "./App.scss"; // Import SCSS file
import ClaimAttendanceForm from "./components/ClaimAttendanceForm";
import EventCreationForm from "./components/EventCreationForm";
import { useWeb3 } from "./context/Web3Context";
import { GoogleLogin } from "@react-oauth/google";

const App = () => {
  const { account, connectWallet, contract } = useWeb3();
  const [googleUser, setGoogleUser] = useState(null);

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log("Google Login Success:", credentialResponse);
    setGoogleUser(credentialResponse); // Store Google user details
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login Failed");
  };

  return (
    <div className="App">
      <header>
        <h1>Welcome to the Web3 Event Platform</h1>
        <p>
          A platform where you can create events, track attendance, and manage
          everything through your MetaMask wallet or Google account.
        </p>
      </header>

      {!account && !googleUser ? (
        <div className="login-options">
          <p>Please log in to continue.</p>
          <div className="login-buttons">
            <button className="wallet-button" onClick={connectWallet}>
              Connect Wallet
            </button>
            <GoogleLogin
              onSuccess={handleGoogleLoginSuccess}
              onError={handleGoogleLoginError}
            />
          </div>
        </div>
      ) : (
        <div className="account-info">
          {account && <h3>Connected Wallet Account: {account}</h3>}
          {googleUser && <h3>Google User: {googleUser.email}</h3>}

          <section>
            <EventCreationForm contract={contract} />
          </section>

          <section>
            <ClaimAttendanceForm contract={contract} />
          </section>
        </div>
      )}
    </div>
  );
};

export default App;
