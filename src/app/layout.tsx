import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nerd Tiktok",
  description: "Nerd Tiktok",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="bg-black text-white">
          <div className="fixed top-4 left-4 z-50">
            <a
              href="/"
              className="font-semibold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
            >
              Nerd
            </a>
          </div>

          {children}
        </div>
      </body>
    </html>
  );
}
