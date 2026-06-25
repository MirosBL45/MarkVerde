import type { Metadata } from "next";

import { EditorWorkspace } from "@/components/editor/editor-workspace";

export const metadata: Metadata = {
  title: "Editor — MarkVerde",
  description: "Write and preview markdown notes with live split-view, auto-save, and export.",
};

export default function EditorPage() {
  return (
    <main className="flex h-[calc(100dvh-9.9rem)] min-h-0 flex-col overflow-hidden">
      <EditorWorkspace />
    </main>
  );
}
