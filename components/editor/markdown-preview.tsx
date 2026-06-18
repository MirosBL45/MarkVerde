"use client";

import ReactMarkdown from "react-markdown";

import remarkGfm from "remark-gfm";

interface MarkdownPreviewProps {
  content: string;
}

export function MarkdownPreview({ content }: MarkdownPreviewProps) {
  if (!content.trim()) {
    return (
      <p className="text-sm italic text-muted-foreground">
        Nothing to preview yet. Start writing on the left.
      </p>
    );
  }

  return (
    <div className="markdown-body">
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
    </div>
  );
}
