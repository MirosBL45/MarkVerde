import type { Metadata } from "next";

import { EditorWorkspace } from "@/components/editor/editor-workspace";

export const metadata: Metadata = {
  title: "Editor — MarkVerde",
  description: "Write and preview markdown notes with live split-view, auto-save, and export.",
};

export default function EditorPage() {
  return (
    <main className="flex flex-1 flex-col" style={{ height: "calc(100vh - 4rem)" }}>
      <EditorWorkspace />
    </main>
  );
}
