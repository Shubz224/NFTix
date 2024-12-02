// constants.js
export const CONTRACT_ADDRESS = "0x149c34Fb9a2c7e54C284d1C2a4d3C3eDC783F489"; // Replace with your contract's deployed address
export const NETWORK = "rinkeby"; // Use the network you're working with (e.g., mainnet, rinkeby)
export const QR_CODE_PREFIX = "poap_event_"; // Prefix for QR code data

// Example metadata template for tokenURI
export const TOKEN_METADATA = (name, description, imageURL) => ({
  name: name,
  description: description,
  image: imageURL,
});
