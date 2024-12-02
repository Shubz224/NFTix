import React, { useState, useContext } from "react";
import { Web3Context } from "../context/Web3Context";
import QRCodeReader from "react-qr-reader";

const VerifyQRCode = () => {
  const { contract } = useContext(Web3Context);
  const [scannedData, setScannedData] = useState("");
  const [verificationStatus, setVerificationStatus] = useState("");

  const handleScan = async (data) => {
    if (data) {
      setScannedData(data);
      try {
        const eventId = data.split(":")[0]; // Example: QR code data format "eventId:userAddress"
        const userAddress = data.split(":")[1];
        const isClaimed = await contract.hasClaimed(eventId, userAddress);

        if (isClaimed) {
          setVerificationStatus("NFT already claimed for this QR code.");
        } else {
          await contract.claimAttendance(eventId, userAddress);
          setVerificationStatus("QR code verified! NFT issued successfully.");
        }
      } catch (error) {
        console.error(error);
        setVerificationStatus("Verification failed.");
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-xl font-bold mb-5">Verify QR Code</h1>
      <QRCodeReader
        delay={300}
        onError={handleError}
        onScan={handleScan}
        className="w-full"
      />
      {scannedData && <p>Scanned Data: {scannedData}</p>}
      {verificationStatus && (
        <p className={`mt-3 ${verificationStatus.includes("success") ? "text-green-500" : "text-red-500"}`}>
          {verificationStatus}
        </p>
      )}
    </div>
  );
};

export default VerifyQRCode;
