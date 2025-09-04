# Note Keeper Frontend (Next.js)

A modern, minimalistic, light-themed notes application frontend built with Next.js App Router. It allows users to view, create, edit, delete, and search notes.

## Features
- View all notes
- Create a new note
- Edit an existing note
- Delete a note
- Search notes
- Responsive layout with header, sidebar, and editor
- Light theme with custom colors
  - Primary: #1e293b
  - Secondary: #64748b
  - Accent: #fbbf24

## Getting Started

1) Configure environment:
Create a `.env` file based on `.env.example`:

```
NEXT_PUBLIC_NOTES_API_BASE=http://localhost:4000
```

This should point to your backend (notes_db) REST API.

Expected endpoints:
- GET    /notes                -> list notes, optional `?q=search`
- POST   /notes                -> create note `{ title, content }`
- GET    /notes/:id            -> fetch single note
- PUT    /notes/:id            -> update note `{ title, content }`
- DELETE /notes/:id            -> delete note

2) Install dependencies and run:

```bash
npm install
npm run dev
```

Open http://localhost:3000 to use the app.

## Project Structure

- src/lib/api.ts — API client utilities (PUBLIC_INTERFACE functions for CRUD)
- src/components/* — UI components (Header, Sidebar, NotesList, NoteEditor)
- src/app/page.tsx — Main app page wiring up the layout and behavior
- src/app/layout.tsx — Root layout and metadata
- src/app/globals.css — Theme styles

## Notes

- If your backend has different endpoints, adjust `src/lib/api.ts`.
- The app uses environment variable `NEXT_PUBLIC_NOTES_API_BASE` (do not hardcode URLs).

