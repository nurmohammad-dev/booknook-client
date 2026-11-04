import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const interTight = Inter_Tight({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
   title: "BookNook | Online Library",
  description: "Discover, borrow, and manage your favorite books with BookNook, your modern online library.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
