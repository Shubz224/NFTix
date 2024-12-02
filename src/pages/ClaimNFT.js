import React, { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Context";

const ClaimNFT = () => {
  const { contract } = useContext(Web3Context);
  const [eventId, setEventId] = useState("");
  const [tokenURI, setTokenURI] = useState("");
  const [status, setStatus] = useState("");

  const handleClaim = async (e) => {
    e.preventDefault();
    try {
      await contract.claimAttendance(eventId, tokenURI);
      setStatus("NFT claimed successfully!");
    } catch (error) {
      console.error(error);
      setStatus("Error claiming NFT.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-5">Claim Your NFT</h1>
      <form className="space-y-4" onSubmit={handleClaim}>
        <input
          type="text"
          name="eventId"
          placeholder="Event ID"
          className="w-full p-2 border rounded"
          value={eventId}
          onChange={(e) => setEventId(e.target.value)}
          required
        />
        <input
          type="text"
          name="tokenURI"
          placeholder="Token URI (e.g., IPFS URL)"
          className="w-full p-2 border rounded"
          value={tokenURI}
          onChange={(e) => setTokenURI(e.target.value)}
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Claim NFT
        </button>
      </form>
      {status && <p className="mt-3">{status}</p>}
    </div>
  );
};

export default ClaimNFT;
