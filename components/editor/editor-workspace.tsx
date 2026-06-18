"use client";

import { useState } from "react";

import { Check, Cloud, FileText, Menu, Plus } from "lucide-react";

import { ConfirmModal } from "@/components/editor/confirm-modal";
import { EditorPanel } from "@/components/editor/editor-panel";
import { MarkdownPreview } from "@/components/editor/markdown-preview";
import { NoteSidebar } from "@/components/editor/note-sidebar";
import { useNotes } from "@/hooks/use-notes";

export function EditorWorkspace() {
  const {
    notes,
    activeNote,
    activeId,
    setActiveId,
    createNote,
    updateNote,
    deleteNote,
    loaded,
    isSaving,
  } = useNotes();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);

  const handleSelect = (id: string) => {
    setActiveId(id);
    setSidebarOpen(false);
  };

  const handleCreate = () => {
    createNote();
    setSidebarOpen(false);
  };

  if (!loaded) {
    return (
      <div className="flex flex-1 items-center justify-center text-sm text-muted-foreground">
        Loading your notes...
      </div>
    );
  }

  return (
    <div className="relative flex flex-1 overflow-hidden">
      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-r border-border lg:block">
        <NoteSidebar
          notes={notes}
          activeId={activeId}
          onSelect={handleSelect}
          onCreate={handleCreate}
        />
      </aside>

      {/* Mobile drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div
            className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-72 max-w-[80%] border-r border-border shadow-2xl">
            <NoteSidebar
              notes={notes}
              activeId={activeId}
              onSelect={handleSelect}
              onCreate={handleCreate}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Main */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex items-center justify-between gap-2 border-b border-border bg-card px-3 py-2 lg:hidden">
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            {isSaving ? (
              <>
                <Cloud className="size-3.5" /> Saving...
              </>
            ) : (
              <>
                <Check className="size-3.5 text-primary" /> Saved
              </>
            )}
          </span>
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open notes"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border text-foreground"
          >
            <Menu className="size-4" />
          </button>
        </div>

        {activeNote ? (
          <>
            {/* Save status (desktop) */}
            <div className="hidden items-center justify-end gap-1.5 border-b border-border bg-card px-4 py-1.5 text-xs text-muted-foreground lg:flex">
              {isSaving ? (
                <>
                  <Cloud className="size-3.5" /> Saving...
                </>
              ) : (
                <>
                  <Check className="size-3.5 text-primary" /> All changes saved
                </>
              )}
            </div>

            <div className="grid flex-1 grid-rows-2 overflow-hidden lg:grid-cols-2 lg:grid-rows-1">
              <div className="row-span-1 flex flex-col overflow-hidden border-b border-border lg:border-b-0">
                <EditorPanel
                  note={activeNote}
                  onChange={(patch) => updateNote(activeNote.id, patch)}
                  onDelete={() => setPendingDelete(activeNote.id)}
                />
              </div>
              <div className="row-span-1 overflow-y-auto bg-background p-4 lg:p-6">
                <MarkdownPreview content={activeNote.content} />
              </div>
            </div>
          </>
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
            <FileText className="size-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No note selected. Create one to get started.
            </p>
            <button
              type="button"
              onClick={handleCreate}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
            >
              <Plus className="size-4" />
              New note
            </button>
          </div>
        )}
      </div>

      <ConfirmModal
        open={pendingDelete !== null}
        title="Delete this note?"
        description="This action cannot be undone. The note will be permanently removed from your browser."
        onConfirm={() => {
          if (pendingDelete) deleteNote(pendingDelete);
          setPendingDelete(null);
        }}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
