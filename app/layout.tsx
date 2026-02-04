import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Head from 'next/head';

import "./globals.css";
import Navbar from "@/Components/Header";
import FooterSection from "@/Components/Footer";
import CustomCursor from "@/Components/CustomCursor";
import SmoothScroll from "@/Components/SmoothScroll";
import PlaygroundTrigger from "@/Components/PlaygroundTrigger";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
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
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body
        className={`${spaceGrotesk.variable} antialiased`}
      >
        <PlaygroundTrigger />
        <SmoothScroll />
        <Navbar />
        <CustomCursor />
        {children}
        <FooterSection />
      </body>
    </html>
  );
}
