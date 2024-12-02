import React from "react";
import QRCode from "qrcode.react";

const QRCodeGenerator = ({ value }) => {
  return (
    <div className="flex justify-center mt-4">
      <QRCode value={value} size={128} />
    </div>
  );
};

export default QRCodeGenerator;
