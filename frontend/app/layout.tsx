import "./globals.css";
import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700"] });
export const metadata: Metadata = {
  title: "XLLM Project",
  description: "Built using Next.js with Typescript & TailwindCSS",
  keywords: "Next.js Typescript TailwindCSS",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Navbar />
        <main className="bg-slate-900">{children}</main>
      </body>
    </html>
  );
}
