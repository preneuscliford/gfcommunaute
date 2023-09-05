"use client";

import Image from "next/image";

interface Props {
  role: string;
}

function VerifyIcon({ role }: Props) {
  if (role === "verified") {
    return (
      <Image
        className="w-6 h-6"
        src="/assets/verified-svg.svg"
        alt="verified image"
        width={16}
        height={16}
      />
    );
    // Affichez une image de vérification
  } else {
    // Ne montrez pas d'image de vérification
  }
}

export default VerifyIcon;
