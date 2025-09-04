"use client";
import React from "react";

type SidebarProps = {
  children?: React.ReactNode;
};

export default function Sidebar({ children }: SidebarProps) {
  return (
    <aside className="hidden lg:block lg:w-72 border-r bg-white">
      <div className="h-full overflow-y-auto">
        {children}
      </div>
    </aside>
  );
}
