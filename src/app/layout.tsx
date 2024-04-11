import type { Metadata } from "next";
import { Ibarra_Real_Nova } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/siteConfig";

const serif = Ibarra_Real_Nova({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: siteConfig.title, 
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={serif.className}>{children}</body>
    </html>
  );
}
