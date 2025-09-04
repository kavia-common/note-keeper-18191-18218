"use client";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import NotesList from "@/components/NotesList";
import NoteEditor from "@/components/NoteEditor";
import MobileSidebar from "@/components/MobileSidebar";
import { createNote, deleteNote, listNotes, updateNote, Note } from "@/lib/api";

export default function Home() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [editorTitle, setEditorTitle] = useState("");
  const [editorContent, setEditorContent] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isNew, setIsNew] = useState(false);

  const selectedNote = useMemo(
    () => notes.find((n) => n.id === selectedId) || null,
    [notes, selectedId]
  );

  const loadNotes = useCallback(async (q?: string) => {
    try {
      setLoading(true);
      const data = await listNotes(q);
      setNotes(data);
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message?: string }).message)
          : "Failed to load notes";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial load and search effect
  useEffect(() => {
    const t = setTimeout(() => {
      loadNotes(search);
    }, 250);
    return () => clearTimeout(t);
  }, [search, loadNotes]);

  // When selection changes, reflect in editor
  useEffect(() => {
    if (selectedNote) {
      setEditorTitle(selectedNote.title || "");
      setEditorContent(selectedNote.content || "");
      setIsNew(false);
    } else if (isNew) {
      setEditorTitle(editorTitle);
      setEditorContent(editorContent);
    } else {
      setEditorTitle("");
      setEditorContent("");
    }
  }, [selectedNote, isNew]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNewNote = () => {
    setSelectedId(null);
    setIsNew(true);
    setEditorTitle("");
    setEditorContent("");
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      setErrorMsg(null);
      if (isNew) {
        const created = await createNote({
          title: editorTitle || "Untitled",
          content: editorContent || "",
        });
        await loadNotes(search);
        setSelectedId(created.id);
        setIsNew(false);
      } else if (selectedNote) {
        const updated = await updateNote(selectedNote.id, {
          title: editorTitle || "Untitled",
          content: editorContent || "",
        });
        // Optimistically update local list
        setNotes((prev) =>
          prev.map((n) => (n.id === updated.id ? { ...n, ...updated } : n))
        );
      } else {
        // No selection but not new -> treat as new
        const created = await createNote({
          title: editorTitle || "Untitled",
          content: editorContent || "",
        });
        await loadNotes(search);
        setSelectedId(created.id);
        setIsNew(false);
      }
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message?: string }).message)
          : "Failed to save note";
      setErrorMsg(message);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id?: string) => {
    const targetId = id ?? selectedId ?? undefined;
    if (!targetId) return;

    try {
      setErrorMsg(null);
      await deleteNote(targetId);
      await loadNotes(search);
      if (selectedId === targetId) {
        setSelectedId(null);
        setIsNew(false);
        setEditorTitle("");
        setEditorContent("");
      }
    } catch (e: unknown) {
      const message =
        e && typeof e === "object" && "message" in e
          ? String((e as { message?: string }).message)
          : "Failed to delete note";
      setErrorMsg(message);
    }
  };

  const handleSelect = (id: string) => {
    setSelectedId(id);
    setIsNew(false);
  };

  const isApiConfigured =
    typeof process !== "undefined" &&
    typeof process.env !== "undefined" &&
    Boolean(process.env.NEXT_PUBLIC_NOTES_API_BASE);

  return (
    <main className="flex min-h-screen flex-col bg-white">
      <Header onNewNote={handleNewNote} search={search} onSearchChange={setSearch} />
      {!isApiConfigured && (
        <div className="mx-auto mt-3 w-full max-w-5xl px-4">
          <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-slate-800">
            Tip: Set <code className="rounded bg-white px-1 py-0.5">NEXT_PUBLIC_NOTES_API_BASE</code> in your .env to connect to your backend (e.g., http://localhost:4000).
          </div>
        </div>
      )}
      <MobileSidebar open={mobileOpen} onClose={() => setMobileOpen(false)}>
        <div className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-secondary">
          Notes
        </div>
        <div className="border-t" />
        {loading ? (
          <div className="p-4 text-sm text-secondary">Loading...</div>
        ) : (
          <NotesList
            notes={notes}
            selectedId={selectedId}
            onSelect={(id) => {
              setMobileOpen(false);
              handleSelect(id);
            }}
            onDelete={(id) => handleDelete(id)}
          />
        )}
      </MobileSidebar>
      <div className="flex flex-1">
        <Sidebar>
          <div className="px-4 py-3 text-xs font-medium uppercase tracking-wide text-secondary">
            Notes
          </div>
          <div className="border-t" />
          {loading ? (
            <div className="p-4 text-sm text-secondary">Loading...</div>
          ) : (
            <NotesList
              notes={notes}
              selectedId={selectedId}
              onSelect={handleSelect}
              onDelete={(id) => handleDelete(id)}
            />
          )}
        </Sidebar>

        <section className="flex-1">
          <div className="mx-auto h-full max-w-5xl">
            {errorMsg && (
              <div className="m-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {errorMsg}
              </div>
            )}
            <div className="h-[calc(100vh-4rem)]"> 
              <NoteEditor
                title={editorTitle}
                content={editorContent}
                onChange={({ title, content }) => {
                  setEditorTitle(title);
                  setEditorContent(content);
                }}
                onSave={handleSave}
                onDelete={!isNew ? () => handleDelete() : undefined}
                isSaving={isSaving}
                isNew={isNew}
              />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
