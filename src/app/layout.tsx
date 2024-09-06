import type { Metadata } from "next";
import { Lemonada } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthProvider";
import {Toaster} from '../components/ui/toaster'
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
      <AuthProvider>
        <Toaster/>
        <body className={inter.className}>{children}</body>
      </AuthProvider>
    </html>
  );
}
