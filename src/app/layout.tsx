import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "../styles/DefaultCSS.css";
import "../styles/disabledCursor.css";
import { ClerkProvider } from "@clerk/nextjs";
import ConvexClientProvider from "@/components/providers/ConvexClientProvider";
import Footer from "@/components/Footer";
import { Toaster } from "react-hot-toast";
import {
  Cursor,
  CursorFollow,
  CursorProvider,
} from "../components/ui/shadcn-io/animated-cursor";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Caret - The Code Editor",
  description: "Precise coding with sharp focus",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <CursorProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-gradient-to-b from-gray-900 to-gray-950 text-gray-100 flex flex-col cursor-none overflow-x-hidden`}
          >
            <ConvexClientProvider>{children}</ConvexClientProvider>
            <Footer />
            <Toaster />
            <Cursor>
              <svg
                className="size-6 text-gray-300"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 40 40"
              >
                <path
                  fill="currentColor"
                  d="M1.8 4.4 7 36.2c.3 1.8 2.6 2.3 3.6.8l3.9-5.7c1.7-2.5 4.5-4.1 7.5-4.3l6.9-.5c1.8-.1 2.5-2.4 1.1-3.5L5 2.5c-1.4-1.1-3.5 0-3.3 1.9Z"
                />
              </svg>
            </Cursor>
            <CursorFollow align="bottom" sideOffset={15}>
              <div className="bg-gray-500 text-white px-2 py-1 rounded-lg text-sm tracking-wide font-mono shadow-lg">
                Coder
              </div>
            </CursorFollow>
          </body>
        </html>
      </CursorProvider>
    </ClerkProvider>
  );
}

// http://emkc.org/api/v2/piston/runtimes
