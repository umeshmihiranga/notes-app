"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import NoteForm from "../../../components/NoteForm";

interface Note {
  id: number;
  title: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export default function EditNotePage({ params }: { params: { id: string } }) {
  const { id } = params;
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;

    async function fetchNote() {
      setLoading(true);
      setErrorMsg(null);

      try {
        const url = `http://localhost:8080/api/notes/${encodeURIComponent(id)}`;
        const res = await fetch(url, {
          method: "GET",
          headers: {
            "Accept": "application/json"
          }
        });

        if (!mounted) return;

        if (res.status === 404) {
          setErrorMsg("Note not found (404). It may have been deleted.");
          setNote(null);
          setLoading(false);
          return;
        }

        if (!res.ok) {
          // try to read response body for more details
          let bodyText = "";
          try {
            bodyText = await res.text();
            // truncate if too long
            if (bodyText.length > 1000) bodyText = bodyText.slice(0, 1000) + "...";
          } catch (e) {
            // ignore
          }
          setErrorMsg(`Failed to load note: ${res.status} ${res.statusText}. ${bodyText}`);
          setNote(null);
          setLoading(false);
          return;
        }

        const data = await res.json();
        setNote(data);
      } catch (err: any) {
        console.error("Error fetching note:", err);
        setErrorMsg(`Network or unexpected error: ${err?.message || err}`);
      } finally {
        if (mounted) setLoading(false);
      }
    }

    fetchNote();

    return () => {
      mounted = false;
    };
  }, [id]);

  const handleSuccess = () => {
    // go back to home and refresh the list
    router.push("/");
  };

  if (loading) return <div>Loading note...</div>;

  if (errorMsg) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <p className="text-sm text-yellow-800">Could not load the note.</p>
          <pre className="text-xs text-red-600 mt-2 whitespace-pre-wrap">{errorMsg}</pre>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => router.push("/")}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Back to list
          </button>
        </div>
      </div>
    );
  }

  if (!note) {
    return (
      <div className="max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
        <div>No note data available.</div>
        <div className="mt-4">
          <button onClick={() => router.push("/")} className="text-blue-600 hover:underline">
            Back to list
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Edit Note</h2>
      <NoteForm initialNote={note} onSuccess={handleSuccess} />
    </div>
  );
}