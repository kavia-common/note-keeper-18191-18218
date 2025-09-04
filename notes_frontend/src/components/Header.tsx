"use client";
import React from "react";

type HeaderProps = {
  onNewNote: () => void;
  search: string;
  onSearchChange: (value: string) => void;
  onToggleSidebar?: () => void;
};

export default function Header({ onNewNote, search, onSearchChange, onToggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-20 border-b bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button
            className="mr-1 inline-flex h-8 w-8 items-center justify-center rounded-md border text-secondary hover:bg-slate-50 lg:hidden"
            onClick={onToggleSidebar}
            aria-label="Open sidebar"
          >
            <span className="block h-0.5 w-4 bg-secondary" />
            <span className="mt-1 block h-0.5 w-4 bg-secondary" />
            <span className="mt-1 block h-0.5 w-4 bg-secondary" />
          </button>
          <div aria-hidden className="h-8 w-8 rounded bg-accent" />
          <h1 className="text-lg font-semibold text-primary">Note Keeper</h1>
        </div>

        <div className="flex items-center gap-3 w-full max-w-xl px-4">
          <input
            aria-label="Search notes"
            placeholder="Search notes..."
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm text-primary placeholder-secondary outline-none ring-accent/30 focus:ring-2"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onNewNote}
            className="rounded-md bg-accent px-3 py-2 text-sm font-medium text-slate-900 hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-accent/50"
            aria-label="Create new note"
          >
            New Note
          </button>
        </div>
      </div>
    </header>
  );
}
