import React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { frFR } from "@clerk/localizations";
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Auth",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      localization={frFR}
      appearance={{
        baseTheme: dark,
      }}
    >
      <html lang="fr">
        <body
          className={`${inter.className} bg-dark-1 flex items-center justify-center overflow-hidden`}
        >
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
