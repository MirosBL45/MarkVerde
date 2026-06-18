"use client";

import type { RefObject } from "react";

import { Bold, Code, Heading, Italic, Link as LinkIcon, List, type LucideIcon } from "lucide-react";

interface ToolbarProps {
  textareaRef: RefObject<HTMLTextAreaElement | null>;
  onChange: (value: string) => void;
}

type Action =
  | { type: "wrap"; before: string; after: string; placeholder: string }
  | { type: "prefix"; prefix: string; placeholder: string }
  | { type: "link"; placeholder: string };

interface ToolButton {
  icon: LucideIcon;
  label: string;
  action: Action;
}

const buttons: ToolButton[] = [
  {
    icon: Bold,
    label: "Bold",
    action: { type: "wrap", before: "**", after: "**", placeholder: "bold text" },
  },
  {
    icon: Italic,
    label: "Italic",
    action: { type: "wrap", before: "*", after: "*", placeholder: "italic text" },
  },
  {
    icon: Heading,
    label: "Heading",
    action: { type: "prefix", prefix: "## ", placeholder: "Heading" },
  },
  {
    icon: LinkIcon,
    label: "Link",
    action: { type: "link", placeholder: "link text" },
  },
  {
    icon: Code,
    label: "Code",
    action: { type: "wrap", before: "`", after: "`", placeholder: "code" },
  },
  {
    icon: List,
    label: "Bullet List",
    action: { type: "prefix", prefix: "- ", placeholder: "List item" },
  },
];

export function Toolbar({ textareaRef, onChange }: ToolbarProps) {
  const applyAction = (action: Action) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const { selectionStart, selectionEnd, value } = textarea;
    const selected = value.slice(selectionStart, selectionEnd);

    let insert = "";
    let cursorStart = selectionStart;
    let cursorEnd = selectionEnd;

    if (action.type === "wrap") {
      const text = selected || action.placeholder;
      insert = `${action.before}${text}${action.after}`;
      cursorStart = selectionStart + action.before.length;
      cursorEnd = cursorStart + text.length;
    } else if (action.type === "prefix") {
      const text = selected || action.placeholder;
      // apply prefix to each selected line
      insert = text
        .split("\n")
        .map((line) => `${action.prefix}${line}`)
        .join("\n");
      cursorStart = selectionStart + action.prefix.length;
      cursorEnd = selectionStart + insert.length;
    } else {
      const text = selected || action.placeholder;
      insert = `[${text}](url)`;
      cursorStart = selectionStart + insert.length - 4;
      cursorEnd = selectionStart + insert.length - 1;
    }

    const nextValue = value.slice(0, selectionStart) + insert + value.slice(selectionEnd);
    onChange(nextValue);

    requestAnimationFrame(() => {
      textarea.focus();
      textarea.setSelectionRange(cursorStart, cursorEnd);
    });
  };

  return (
    <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card px-3 py-2">
      {buttons.map((button) => (
        <button
          key={button.label}
          type="button"
          title={button.label}
          aria-label={button.label}
          onClick={() => applyAction(button.action)}
          className="inline-flex size-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-primary"
        >
          <button.icon className="size-4" />
        </button>
      ))}
    </div>
  );
}
