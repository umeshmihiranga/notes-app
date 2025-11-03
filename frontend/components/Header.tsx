"use client";
import React from "react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold">Notes App</Link>

      </div>
    </header>
  );
}