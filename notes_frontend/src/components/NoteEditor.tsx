"use client";
import React, { useEffect, useState } from "react";

type NoteEditorProps = {
  title: string;
  content: string;
  onChange: (data: { title: string; content: string }) => void;
  onSave: () => void;
  onDelete?: () => void;
  isSaving?: boolean;
  isNew?: boolean;
};

export default function NoteEditor({
  title,
  content,
  onChange,
  onSave,
  onDelete,
  isSaving,
  isNew,
}: NoteEditorProps) {
  const [localTitle, setLocalTitle] = useState(title);
  const [localContent, setLocalContent] = useState(content);

  useEffect(() => {
    setLocalTitle(title);
  }, [title]);

  useEffect(() => {
    setLocalContent(content);
  }, [content]);

  useEffect(() => {
    onChange({ title: localTitle, content: localContent });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localTitle, localContent]);

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between gap-3 border-b bg-white px-4 py-3">
        <input
          className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-base font-medium text-primary outline-none ring-accent/30 focus:ring-2"
          placeholder="Note title"
          value={localTitle}
          onChange={(e) => setLocalTitle(e.target.value)}
        />
        <div className="ml-3 flex items-center gap-2">
          {onDelete && !isNew && (
            <button
              onClick={onDelete}
              className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-300"
            >
              Delete
            </button>
          )}
          <button
            onClick={onSave}
            disabled={isSaving}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-slate-900 hover:brightness-95 disabled:opacity-60 focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            {isSaving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
      <textarea
        className="h-full w-full flex-1 resize-none bg-white px-4 py-3 text-sm text-primary outline-none"
        placeholder="Start writing your note..."
        value={localContent}
        onChange={(e) => setLocalContent(e.target.value)}
      />
    </div>
  );
}
