"use client";

import { useMemo, useState } from "react";

import { FileText, Plus, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";

interface NoteSidebarProps {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onClose?: () => void;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function NoteSidebar({ notes, activeId, onSelect, onCreate, onClose }: NoteSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((note) => note.title.toLowerCase().includes(q));
  }, [notes, query]);

  return (
    <div className="flex h-full flex-col bg-sidebar">
      <div className="flex items-center justify-between gap-2 border-b border-sidebar-border p-4">
        <h2 className="text-sm font-semibold text-sidebar-foreground">Your Notes</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onCreate}
            aria-label="New note"
            className="cursor-pointer inline-flex size-8 items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground transition-transform hover:scale-105"
          >
            <Plus className="size-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="cursor-pointer inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="border-b border-sidebar-border p-3">
        <div className="relative">
          <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search notes..."
            className="w-full rounded-lg border border-input bg-background py-2 pl-9 pr-3 text-sm text-foreground outline-none placeholder:text-muted-foreground focus:border-primary"
          />
        </div>
      </div>

      <ul className="flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <li className="px-3 py-6 text-center text-sm text-muted-foreground">No notes found.</li>
        ) : (
          filtered.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                onClick={() => onSelect(note.id)}
                className={cn(
                  "flex w-full flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors cursor-pointer",
                  note.id === activeId
                    ? "bg-sidebar-primary/15 text-sidebar-foreground"
                    : "text-muted-foreground hover:bg-secondary"
                )}
              >
                <span className="flex items-center gap-2 truncate text-sm font-medium text-foreground">
                  <FileText className="size-3.5 shrink-0 text-primary" />
                  <span className="truncate">{note.title || "Untitled note"}</span>
                </span>
                <span className="pl-5 text-xs text-muted-foreground">
                  {formatDate(note.updatedAt)}
                </span>
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
