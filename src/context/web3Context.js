import { ethers } from "ethers";
import React, { createContext, useContext, useEffect, useState } from "react";
import POAP_ABI from "../abi/POAP_ABI.json";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const init = async () => {
      try {
        if (window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);

          const web3Signer = web3Provider.getSigner();
          setSigner(web3Signer);

          const accounts = await web3Provider.send("eth_requestAccounts", []);
          setAccount(accounts[0]);

          const contractInstance = new ethers.Contract(
            process.env.REACT_APP_CONTRACT_ADDRESS, // Ensure this environment variable is defined
            POAP_ABI,
            web3Signer
          );
          setContract(contractInstance);
        } else {
          console.error("MetaMask is not installed.");
        }
      } catch (error) {
        console.error("Error initializing Web3:", error);
      }
    };

    init();
  }, []);

  const connectWallet = async () => {
    try {
      if (provider) {
        const accounts = await provider.send("eth_requestAccounts", []);
        setAccount(accounts[0]);
      }
    } catch (error) {
      console.error("Error connecting wallet:", error);
    }
  };

  return (
    <Web3Context.Provider
      value={{
        provider,
        signer,
        contract,
        account,
        connectWallet,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export default Web3Context;
