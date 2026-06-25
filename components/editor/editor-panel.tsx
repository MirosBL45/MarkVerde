"use client";

import { type RefObject, type UIEvent, useMemo, useRef } from "react";

import { Download, Trash2 } from "lucide-react";

import { Toolbar } from "@/components/editor/toolbar";
import type { Note } from "@/types/note";

interface EditorPanelProps {
  note: Note;
  onChange: (patch: { title?: string; content?: string }) => void;
  onDelete: () => void;
  textareaRef?: RefObject<HTMLTextAreaElement | null>;
  onEditorScroll?: (event: UIEvent<HTMLTextAreaElement>) => void;
}

function countWords(text: string) {
  const trimmed = text.trim();
  if (!trimmed) return 0;
  return trimmed.split(/\s+/).length;
}

export function EditorPanel({
  note,
  onChange,
  onDelete,
  textareaRef: externalTextareaRef,
  onEditorScroll,
}: EditorPanelProps) {
  const fallbackTextareaRef = useRef<HTMLTextAreaElement | null>(null);
  const textareaRef = externalTextareaRef ?? fallbackTextareaRef;

  const wordCount = useMemo(() => countWords(note.content), [note.content]);
  const charCount = note.content.length;

  const handleDownload = () => {
    const filename =
      (note.title.trim() || "untitled")
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-") + ".md";
    const blob = new Blob([note.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden border-border lg:border-r">
      <div className="flex items-center gap-2 border-b border-border bg-card px-3 py-2">
        <input
          type="text"
          value={note.title}
          onChange={(e) => onChange({ title: e.target.value })}
          placeholder="Note title"
          className="min-w-0 flex-1 bg-transparent text-base font-semibold text-foreground outline-none placeholder:text-muted-foreground"
        />
        <button
          type="button"
          onClick={handleDownload}
          title="Download as .md"
          aria-label="Download note as markdown"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <Download className="size-4" />
        </button>
        <button
          type="button"
          onClick={onDelete}
          title="Delete note"
          aria-label="Delete note"
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-destructive/15 hover:text-destructive"
        >
          <Trash2 className="size-4" />
        </button>
      </div>

      <Toolbar textareaRef={textareaRef} onChange={(value) => onChange({ content: value })} />

      <textarea
        ref={textareaRef}
        value={note.content}
        onChange={(e) => onChange({ content: e.target.value })}
        onScroll={onEditorScroll}
        placeholder="Start writing in markdown..."
        spellCheck
        className="min-h-0 flex-1 resize-none overflow-y-auto bg-background p-4 font-mono text-sm leading-relaxed text-foreground outline-none placeholder:text-muted-foreground"
      />

      <div className="flex items-center justify-end gap-4 border-t border-border bg-card px-4 py-2 text-xs text-muted-foreground">
        <span>{wordCount} words</span>
        <span>{charCount} characters</span>
      </div>
    </div>
  );
}
