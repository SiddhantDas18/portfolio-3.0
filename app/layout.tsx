import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Favicon from '@/app/favi.png'
import Head from 'next/head';

import "./globals.css";
import Navbar from "@/Components/Header";
import FooterSection from "@/Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SiddhantDas",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href={Favicon.src} />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black text-white`}
      >
        <Navbar/>
        {children}
        <FooterSection/>
      </body>
    </html>
  );
}
