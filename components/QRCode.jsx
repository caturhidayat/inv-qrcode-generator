import React from "react";
import Image from "next/image";

export default function QRCode({ qrcode }) {
  return (
    <div>
      {qrcode ? (
        <div>
          <Image
            src={qrcode}
            alt="qrcode"
            width={"200"}
            height={"200"}
          />
        </div>
      ) : null}
    </div>
  );
}
