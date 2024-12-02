// QRHelpers.js
import QRCode from "qrcode";

// Function to generate a QR code for an event
export const generateQRCode = async (data) => {
  try {
    const qrCodeURL = await QRCode.toDataURL(data);
    return qrCodeURL;
  } catch (error) {
    console.error("Error generating QR code:", error);
    return null;
  }
};

// Function to validate QR code data
export const validateQRCode = (scannedData, eventId, userAddress) => {
  const parsedData = JSON.parse(scannedData);

  return (
    parsedData.eventId === eventId && parsedData.userAddress === userAddress
  );
};
