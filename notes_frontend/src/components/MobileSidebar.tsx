"use client";
import React from "react";

type MobileSidebarProps = {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

export default function MobileSidebar({ open, onClose, children }: MobileSidebarProps) {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 transition-opacity lg:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={onClose}
      />
      {/* Drawer */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-72 transform border-r bg-white transition-transform lg:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex h-12 items-center justify-between border-b px-4">
          <div className="text-sm font-medium text-primary">Notes</div>
          <button
            className="rounded-md border px-2 py-1 text-xs text-secondary hover:bg-slate-50"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            Close
          </button>
        </div>
        <div className="h-[calc(100%-3rem)] overflow-y-auto">{children}</div>
      </aside>
    </>
  );
}
