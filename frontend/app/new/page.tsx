"use client";
import React from "react";
import NoteForm from "../../components/NoteForm";
import { useRouter } from "next/navigation";

export default function NewNotePage() {
  const router = useRouter();

  const handleSuccess = () => {
    // after creation go back to home and refresh
    router.push("/");
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Create New Note</h2>
      <NoteForm onSuccess={handleSuccess} />
    </div>
  );
}