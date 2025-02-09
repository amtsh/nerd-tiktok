import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { DarkModeToggle } from "@/components/DarkModeToggle";
import { Suspense } from "react";
import { Analytics } from "@vercel/analytics/react";

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
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={inter.className}>
          <Suspense>
            <ThemeProvider
              attribute="class"
              defaultTheme="dark"
              disableTransitionOnChange
            >
              <div className="min-h-screen bg-black antialiased">
                {children}
              </div>
            </ThemeProvider>
          </Suspense>
          <Analytics />
        </body>
      </html>
    </>
  );
}
