import { ClerkProvider } from "@clerk/nextjs";
import { Inter } from "next/font/google";

import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "GfCommunaute",
  description: " a great nextjs Communaute",
};

export default function RouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="fr">
        <body className={`${inter.className} bg-dark-1`}>{children}</body>
      </html>
    </ClerkProvider>
  );
}