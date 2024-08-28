import { Analytics } from "@vercel/analytics/react";
import type { Metadata } from "next";
import { Lemonada } from "next/font/google";
import "./globals.css";

const inter = Lemonada({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "daily blogs ",
  description: "A private daily journaling app ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
