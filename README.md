# note-keeper-18191-18218

This workspace contains the Next.js notes_frontend implementing a modern, minimal notes app (view, create, edit, delete, search).

Quick start:
- cd notes_frontend
- copy .env.example to .env and set NEXT_PUBLIC_NOTES_API_BASE to your backend URL
- npm install
- npm run dev
- open http://localhost:3000

Backend expected REST endpoints:
- GET /notes (?q=search)
- POST /notes
- GET /notes/:id
- PUT /notes/:id
- DELETE /notes/:id