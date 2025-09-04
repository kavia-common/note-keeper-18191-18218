"use client";
import React from "react";
import { Note } from "@/lib/api";

type NotesListProps = {
  notes: Note[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
};

export default function NotesList({ notes, selectedId, onSelect, onDelete }: NotesListProps) {
  if (!notes.length) {
    return (
      <div className="p-4 text-sm text-secondary">
        No notes yet. Click &quot;New Note&quot; to get started.
      </div>
    );
  }

  return (
    <ul role="list" className="divide-y">
      {notes.map((note) => (
        <li
          key={note.id}
          className={`group cursor-pointer px-4 py-3 transition-colors ${
            selectedId === note.id ? "bg-accent/10" : "hover:bg-slate-50"
          }`}
        >
          <div className="flex items-start justify-between gap-2">
            <button
              onClick={() => onSelect(note.id)}
              className="flex-1 text-left outline-none"
              aria-label={`Open note ${note.title}`}
            >
              <div className="truncate text-sm font-medium text-primary">
                {note.title || "Untitled"}
              </div>
              <div className="mt-1 line-clamp-2 text-xs text-secondary">
                {note.content || "No content"}
              </div>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="invisible rounded-md border border-transparent px-2 py-1 text-xs text-slate-700 hover:border-red-200 hover:bg-red-50 hover:text-red-700 group-hover:visible"
              aria-label={`Delete note ${note.title}`}
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
