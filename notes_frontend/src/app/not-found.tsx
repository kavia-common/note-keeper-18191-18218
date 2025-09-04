import React from "react";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section
        className="w-full max-w-md rounded-md border bg-white p-6 text-center"
        role="alert"
        aria-live="assertive"
      >
        <h1 className="text-2xl font-semibold text-primary">404 – Page Not Found</h1>
        <p className="mt-2 text-sm text-secondary">
          The page you’re looking for doesn’t exist.
        </p>
      </section>
    </main>
  );
}
