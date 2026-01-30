import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Menu from "@/src/shared/components/menu/Menu";
import AddButtons from "@/src/shared/components/menu/additionalButtons/addButtons";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jedzonko",
  description: "App that allows planning food for your week :)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} relative z-0 bg-[#020202] bg-cover bg-center`}>
        <Menu />
        <main className="relative z-0 min-h-screen pl-56 bg-[#020202]">
          <section className="sticky top-0 z-20 backdrop-blur-xl px-4 py-1 flex items-center min-h-[40px] shadow-md" style={{ background: '#030303' }}>
            <div className="w-full flex justify-end">
              <AddButtons />
            </div>
          </section>
          <div className="h-1 bg-transparent" />
          {children}
        </main>
      </body>
    </html>
  );
}
