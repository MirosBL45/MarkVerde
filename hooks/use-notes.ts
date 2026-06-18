"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type { Note } from "@/types/note";

const STORAGE_KEY = "markverde-notes";

const WELCOME_NOTE: Note = {
  id: "welcome",
  title: "Welcome to MarkVerde",
  content: `# Welcome to MarkVerde

This is your first note. Start typing **markdown** on the left and watch it render on the right.

## Things you can do

- Create, edit, and delete notes
- Use the toolbar to format text
- Search your notes from the sidebar
- Export any note as a \`.md\` file

> Everything is saved automatically to your browser.

Happy writing!`,
  createdAt: Date.now(),
  updatedAt: Date.now(),
};

function loadNotes(): Note[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [WELCOME_NOTE];
    const parsed = JSON.parse(raw) as Note[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [WELCOME_NOTE];
  } catch {
    return [WELCOME_NOTE];
  }
}

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>(() => loadNotes());
  const [activeId, setActiveId] = useState<string | null>(() => {
    const initial = loadNotes();
    return initial[0]?.id ?? null;
  });
  const loaded = true;
  const saveTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Debounced persistence
  useEffect(() => {
    if (saveTimeout.current) clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
      setIsSaving(false);
    }, 600);

    return () => {
      if (saveTimeout.current) clearTimeout(saveTimeout.current);
    };
  }, [notes]);

  const createNote = useCallback(() => {
    const now = Date.now();

    const note: Note = {
      id: crypto.randomUUID(),
      title: "Untitled note",
      content: "",
      createdAt: now,
      updatedAt: now,
    };

    setIsSaving(true);
    setNotes((prev) => [note, ...prev]);
    setActiveId(note.id);

    return note.id;
  }, []);

  const updateNote = useCallback((id: string, patch: Partial<Pick<Note, "title" | "content">>) => {
    setIsSaving(true);

    setNotes((prev) =>
      prev.map((note) => (note.id === id ? { ...note, ...patch, updatedAt: Date.now() } : note))
    );
  }, []);

  const deleteNote = useCallback((id: string) => {
    setIsSaving(true);

    setNotes((prev) => {
      const next = prev.filter((note) => note.id !== id);

      setActiveId((current) => {
        if (current !== id) return current;
        return next[0]?.id ?? null;
      });

      return next;
    });
  }, []);

  const activeNote = notes.find((note) => note.id === activeId) ?? null;

  return {
    notes,
    activeNote,
    activeId,
    setActiveId,
    createNote,
    updateNote,
    deleteNote,
    loaded,
    isSaving,
  };
}
