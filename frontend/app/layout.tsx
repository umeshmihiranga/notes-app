import "./globals.css";
import React from "react";
import Header from "../components/Header";

export const metadata = {
  title: "Notes App",
  description: "Full-stack Notes App"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="container mx-auto px-4 py-6 flex-1">{children}</main>
        </div>
      </body>
    </html>
  );
}