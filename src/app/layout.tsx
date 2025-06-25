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
          {/* <Image
            src="/background.jpeg"
            alt="background"
            fill
            className="absolute z-[-1] object-cover object-center"
            quality={100}
            priority
          /> */}
          {children}
        </main>
        <Menu />
      </body>
    </html>
  );
}
