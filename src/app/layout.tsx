import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
// import { DarkModeToggle } from "@/components/DarkModeToggle";

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
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <div className="min-h-screen">
              <div className="fixed top-4 left-4 z-50">
                <a
                  href="/"
                  className="font-semibold text-white drop-shadow-lg hover:opacity-80 transition-opacity"
                >
                  Nerd
                </a>
                {/* <DarkModeToggle /> */}
              </div>

              {children}
            </div>
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
