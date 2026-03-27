@AGENTS.md

# Project Context: QR Attendance System (Fast-Track)

## Technical Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database/Auth:** Supabase
- **Scanner:** html5-qrcode
- **UI:** Tailwind CSS + Lucide React

## Development Principles

- **Speed over Perfection:** Prioritize a working MVP. Use pre-built hooks and libraries.
- **Client/Server Separation:** Use `'use client'` strictly for the QR scanner and UI interactions.
- **Security:** Use Supabase Row Level Security (RLS) to ensure attendance can't be spoofed easily.
- **Mobile First:** The UI must be optimized for scanning on a smartphone.

## Database Schema (Required)

- `profiles`: id (uuid), student_id (text), full_name (text)
- `attendance`: id (uuid), student_id (text), scanned_at (timestamp), session_id (text)

## Core Features to Build

1. Scanner page (`/scan`) using `html5-qrcode`.
2. Supabase client setup in `/lib/supabase.ts`.
3. Server Action/API for recording attendance.
4. Simple Admin Dashboard (`/admin`) to view logs.

## New Logic: Section Validation

- The app must capture a `room` query parameter from the URL (e.g., `/scan?room=3CS-A`).
- Before saving to Supabase, compare the scanned `room` with the user's selected `section`.
- If they don't match, block the database write and show a "Wrong Classroom" alert.
