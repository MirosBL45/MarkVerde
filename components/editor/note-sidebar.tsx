"use client";

import type { ChangeEvent, DragEvent } from "react";
import { useMemo, useRef, useState } from "react";

import { FileText, Plus, Search, UploadCloud, X } from "lucide-react";

import { cn } from "@/lib/utils";
import type { Note } from "@/types/note";

interface NoteSidebarProps {
  notes: Note[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onImportNote: (file: File) => Promise<void> | void;
  onClose?: () => void;
}

interface FileImportBoxProps {
  onImportNote: (file: File) => Promise<void> | void;
}

function formatDate(timestamp: number) {
  return new Date(timestamp).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function isSupportedMarkdownFile(file: File) {
  const fileName = file.name.toLowerCase();

  return (
    fileName.endsWith(".md") ||
    fileName.endsWith(".markdown") ||
    fileName.endsWith(".txt") ||
    file.type === "text/markdown" ||
    file.type === "text/plain"
  );
}

function FileImportBox({ onImportNote }: FileImportBoxProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");

  const handleFile = async (file?: File) => {
    if (!file) return;

    if (!isSupportedMarkdownFile(file)) {
      setError("Please upload a .md, .markdown, or .txt file.");
      return;
    }

    setError("");
    await onImportNote(file);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleInputChange = async (event: ChangeEvent<HTMLInputElement>) => {
    await handleFile(event.target.files?.[0]);
  };

  const handleDragOver = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setIsDragging(false);

    await handleFile(event.dataTransfer.files?.[0]);
  };

  return (
    <div className="shrink-0 border-t border-sidebar-border p-3">
      <input
        ref={inputRef}
        id="markdown-file-upload"
        type="file"
        accept=".md,.markdown,.txt,text/markdown,text/plain"
        onChange={handleInputChange}
        className="sr-only"
      />

      <label
        htmlFor="markdown-file-upload"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={cn(
          "flex cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed border-sidebar-border bg-background/60 px-3 py-4 text-center transition-colors hover:border-primary hover:bg-secondary/60",
          isDragging && "border-primary bg-secondary"
        )}
      >
        <UploadCloud className="mb-2 size-5 text-primary" />
        <span className="text-xs font-medium text-foreground">Import markdown file</span>
        <span className="mt-1 text-[11px] leading-relaxed text-muted-foreground">
          Drag .md here or click to upload
        </span>
      </label>

      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}

export function NoteSidebar({
  notes,
  activeId,
  onSelect,
  onCreate,
  onImportNote,
  onClose,
}: NoteSidebarProps) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return notes;
    return notes.filter((note) => note.title.toLowerCase().includes(q));
  }, [notes, query]);

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-sidebar">
      <div className="shrink-0 flex items-center justify-between gap-2 border-b border-sidebar-border p-4">
        <h2 className="text-sm font-semibold text-sidebar-foreground">Your Notes</h2>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={onCreate}
            aria-label="New note"
            className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md bg-sidebar-primary text-sidebar-primary-foreground transition-transform hover:scale-105"
          >
            <Plus className="size-4" />
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close sidebar"
              className="inline-flex size-8 cursor-pointer items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary lg:hidden"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      <div className="shrink-0 border-b border-sidebar-border p-3">
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

      <ul className="min-h-0 flex-1 overflow-y-auto p-2">
        {filtered.length === 0 ? (
          <li className="px-3 py-6 text-center text-sm text-muted-foreground">No notes found.</li>
        ) : (
          filtered.map((note) => (
            <li key={note.id}>
              <button
                type="button"
                onClick={() => onSelect(note.id)}
                className={cn(
                  "flex w-full cursor-pointer flex-col gap-1 rounded-lg px-3 py-2.5 text-left transition-colors",
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

      <FileImportBox onImportNote={onImportNote} />
    </div>
  );
}
