"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Note {
  id?: number;
  title: string;
  content: string;
}

export default function NoteForm({
  initialNote,
  onSuccess
}: {
  initialNote?: Note;
  onSuccess?: () => void;
}) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [content, setContent] = useState(initialNote?.content ?? "");
  const [saving, setSaving] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Title is required");
      return;
    }
    setSaving(true);
    try {
      if (initialNote && initialNote.id) {
        // update
        const res = await fetch(`http://localhost:8080/api/notes/${initialNote.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, content })
        });
        if (!res.ok) throw new Error("Failed to update note");
      } else {
        // create
        const res = await fetch("http://localhost:8080/api/notes", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ title, content })
        });
        if (!res.ok) throw new Error("Failed to create note");
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error(err);
      alert("An error occurred while saving the note.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded px-3 py-2"
          placeholder="Note title"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded px-3 py-2 min-h-[120px] resize-vertical"
          placeholder="Write your note here..."
        />
      </div>

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          {saving ? "Saving..." : initialNote ? "Update Note" : "Create Note"}
        </button>
      </div>
    </form>
  );
}