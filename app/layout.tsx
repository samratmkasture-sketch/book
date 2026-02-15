"use client";

import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import { PdfViewerProvider, FileManagerProvider, BookmarksProvider } from "./contexts";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>PDF Book Viewer</title>
        <meta name="description" content="Client-side PDF viewer built with Next.js" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <PdfViewerProvider>
          <FileManagerProvider>
            <BookmarksProvider>
              {children}
            </BookmarksProvider>
          </FileManagerProvider>
        </PdfViewerProvider>
      </body>
    </html>
  );
}
