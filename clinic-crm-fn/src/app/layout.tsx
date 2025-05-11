import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./providers"; // 👈 Add this import
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Your App Name",
  description: "Your app description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>{children}</Providers> {/* 👈 Wrap your app in Providers */}
      </body>
    </html>
  );
}
