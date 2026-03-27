# Antigravity Agent Roles

## 🏗️ Architect Agent
- **Role:** Designs the folder structure and database relations.
- **Focus:** Ensuring `next.config.js` and `tsconfig.json` are correct for the scanner library.
- **Task:** Verify that the `attendance` table in Supabase matches the frontend scanning logic.

## 📸 Scanner Specialist (Frontend)
- **Role:** Handles the hardware integration (Camera API).
- **Focus:** Managing the `Html5QrcodeScanner` lifecycle (start/stop/clear) to prevent memory leaks in React.
- **Task:** Build the `QRScanner.tsx` component with error handling for "Permission Denied" states.

## 🛰️ Integration Agent (Backend)
- **Role:** Connects the Scanner to Supabase.
- **Focus:** Writing the Server Actions to `upsert` attendance data.
- **Task:** Implement a "one-scan-per-day" check to prevent duplicate entries.

## 🎨 UI/UX Agent
- **Role:** Rapidly styles the application using Tailwind.
- **Focus:** Making the "Success" and "Failure" states extremely clear for the user after a scan.
- **Task:** Create a responsive layout that works perfectly on mobile Chrome and Safari.