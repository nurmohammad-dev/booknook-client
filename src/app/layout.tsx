import type { Metadata } from "next";
import { Inter_Tight } from "next/font/google";
import "./globals.css";

const interTight = Inter_Tight({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


export const metadata: Metadata = {
   title: "BookNook | Your Digital Library",
  description: "Discover, borrow, and manage your favorite books with BookNook, your modern online library.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${interTight.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
