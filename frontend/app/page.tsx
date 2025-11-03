"use client";
import React from "react";
import Link from "next/link";
import NotesList from "../components/NotesList";

export default function HomePage() {
  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">All Notes</h1>
        <Link href="/new" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Note
        </Link>
      </div>
      <NotesList />
    </div>
  );
}