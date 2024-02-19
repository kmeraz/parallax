"use client";
import { ReactNode } from "react";

import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });
import "./globals.css";

import background from "@/assets/background.png";
import { CurrentUserProvider } from "@/app/userContext";

const RootLayout = ({ children }: { children: ReactNode}) => {
  return (
    <html lang="en" className="h-full bg-white">
      <head>
        <title>Parallax</title>
        <link rel="stylesheet" href="https://rsms.me/inter/inter.css"></link>
      </head>
      <body
        className={inter.className + " h-full"}
        style={{
          backgroundColor: "#fcfcf7",
          backgroundImage: `url(${background.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
      >
        <CurrentUserProvider>{children}</CurrentUserProvider>
      </body>
    </html>
  );
};

export default RootLayout;
