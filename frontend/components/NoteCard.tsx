"use client";
import React, { useState } from "react";
import Link from "next/link";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NoteCard({ note, onDeleted }: { note: Note; onDeleted?: () => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    const ok = confirm("Are you sure you want to delete this note?");
    if (!ok) return;
    setDeleting(true);
    try {
      const res = await fetch(`http://localhost:8080/api/notes/${note.id}`, {
        method: "DELETE"
      });
      if (!res.ok) throw new Error("Failed to delete");
      if (onDeleted) onDeleted();
    } catch (err) {
      console.error(err);
      alert("Could not delete the note.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white rounded shadow p-4 flex flex-col">
      <div className="flex-1">
        <h3 className="text-lg font-semibold">{note.title}</h3>
        <p className="text-sm text-gray-700 mt-2 whitespace-pre-wrap">{note.content}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="text-xs text-gray-500">
          {note.updatedAt ? new Date(note.updatedAt).toLocaleString() : ""}
        </div>
        <div className="space-x-2">
          <Link href={`/notes/${note.id}`} className="text-blue-600 hover:underline text-sm">
            Edit
          </Link>
          <button
            onClick={handleDelete}
            disabled={deleting}
            className="text-red-600 hover:underline text-sm"
          >
            {deleting ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}