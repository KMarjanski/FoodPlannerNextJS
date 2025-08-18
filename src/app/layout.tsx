import type { Metadata } from "next";
import Image from "next/image";
import { Press_Start_2P, Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/src/shared/components/menu/Menu";

const inter = Inter({ subsets: ["latin"] });

const retro = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-retro",
});

export const metadata: Metadata = {
  title: "Foodies",
  description: "App that allows planning food for your week :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${retro.variable} relative z-0`}>
        <main className="relative z-0 min-h-screen">
          <Menu />
          {children}
        </main>
      </body>
    </html>
  );
}
