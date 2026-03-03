import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InternAge | MERN Stack Mastery",
  description: "Comprehensive 12-week MERN Stack course & internship program",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex text-foreground bg-background`}
      >
        <Sidebar />
        <main className="flex-1 w-full md:ml-64 relative min-h-screen pt-16 md:pt-0 pb-16">
          {children}
        </main>
      </body>
    </html>
  );
}
