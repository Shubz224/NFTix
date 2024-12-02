import { useState, useEffect } from "react";
import { ethers } from "ethers";
import POAP_ABI from "../abi/POAP.json"; // Replace with your actual ABI file path

const useContract = (contractAddress) => {
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);

  useEffect(() => {
    const initializeContract = async () => {
      try {
        if (window.ethereum) {
          const web3Provider = new ethers.providers.Web3Provider(window.ethereum);
          setProvider(web3Provider);

          const signer = web3Provider.getSigner();
          setSigner(signer);

          const poapContract = new ethers.Contract(contractAddress, POAP_ABI, signer);
          setContract(poapContract);
        } else {
          console.error("Please install MetaMask!");
        }
      } catch (error) {
        console.error("Error initializing contract:", error);
      }
    };

    initializeContract();
  }, [contractAddress]);

  return { contract, provider, signer };
};

export default useContract;
