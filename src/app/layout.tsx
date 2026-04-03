import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import Link from "next/link";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zorvyn Finance Dashboard",
  description: "Track and understand your financial activity with elegance.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${geistMono.variable} h-full dark`}
    >
      <body className="min-h-full overflow-x-hidden w-full max-w-[100vw]">
        <div className="flex min-h-screen bg-background w-full">
          <Sidebar />
          <div className="flex flex-1 flex-col lg:pl-64 w-full min-w-0 max-w-full">
            <Topbar />
            <main className="flex-1 p-6 lg:p-10 relative w-full min-w-0 flex flex-col overflow-x-hidden">
              {children}
              <footer className=" flex justify-center pb-8 transition-opacity duration-300 group w-fit mx-auto">
                <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-slate-500 group-hover:text-slate-400">
                  Design & Developed by{" "}
                  <Link
                    href="https://babacreates.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-300 group-hover:text-white transition-colors underline decoration-slate-700 underline-offset-4"
                  >
                    Anmol
                  </Link>{" "}
                  For Zorvyn assignment
                </p>
              </footer>
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
