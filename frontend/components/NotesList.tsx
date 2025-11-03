"use client";
import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function NotesList() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotes = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:8080/api/notes");
      if (!res.ok) throw new Error("Failed to fetch notes");
      const data = await res.json();
      setNotes(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleDeleted = () => {
    // refresh after delete
    fetchNotes();
  };

  if (loading) return <div>Loading notes...</div>;
  if (error) return <div className="text-red-600">Error: {error}</div>;
  if (notes.length === 0) return <div>No notes yet. Click "Add Note" to create one.</div>;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <NoteCard key={note.id} note={note} onDeleted={handleDeleted} />
      ))}
    </div>
  );
}