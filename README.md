# ExamBoard (UI-first)

ExamBoard is a Vite + React + TypeScript project for managing exam information (search/edit), browsing an archive, and generating learning materials.

This repository is currently **UI-first**: the screens are implemented with local state + mock data to validate UX quickly. Refactoring and data persistence/API integration will come later.

## Tech stack

- React 19
- React Router 7
- TypeScript (strict)
- Tailwind CSS (via `@tailwindcss/vite`)
- ESLint (flat config)

## Getting started

From the `examboard/` directory:

```bash
npm install
npm run dev
```

Build/preview:

```bash
npm run build
npm run preview
```

Lint:

```bash
npm run lint
```

## App routes

- `/login`: Login placeholder page
- `/search`: Exam search + record details + edit flow (main UI)
- `/archive`: Archive list view with expandable details (read-only from mock data)
- `/materials`: Materials placeholder page
- `/settings`: Settings page (school list CRUD + fixed subjects panel)

Router: `src/app/router/index.tsx`  
Layout: `src/app/layout/MainLayout.tsx`

## Current UI scope (what’s implemented)

### Search (`/search`)

- Filter bar: season/school/grade/subject
- Search action: finds a record in `mockData` or creates a new empty draft
- Detail view: structured sections (exam date, textbooks, attachments)
- Edit mode: form inputs/selects + file-name selection (UI-only)
- Save: updates/creates records **in local component state only**
- Create season modal: create a season label and append to season options (UI-only)

Main file: `src/pages/SearchPage.tsx`

### Archive (`/archive`)

- Filter bar + reset
- Result list: expandable rows with detail + attachment “download” buttons
- Data source: `mockData` (currently not connected to edits from `/search`)

Main file: `src/pages/ArchivePage.tsx`

### Settings (`/settings`)

- School list CRUD (add/edit/delete) with basic validation (empty/duplicate)
- “Fixed subjects” panel (static UI)

Main file: `src/pages/SettingsPage.tsx`

## Data & types (UI-first)

- Mock data and select options: `src/data/mockData.ts`
- Types: `src/types/exam.ts`
- “Download” behavior is a placeholder that downloads a text blob:
  - `src/utils/downloadFile.ts`

## Folder structure

```text
src/
  app/
    layout/          # Layouts (e.g. Sidebar + Outlet)
    router/          # Route definitions
  components/
    common/          # Reusable UI components (SelectField, SectionCard, etc.)
    layout/          # Sidebar components
    season/          # Season-related UI (modal)
  data/              # UI mock data + select options
  pages/             # Route pages
  styles/            # CSS tokens
  types/             # Shared TS types
  utils/             # Small utilities (UI placeholders)
```

## UI conventions (for contributors / other AIs)

- **UI-first policy**: prioritize UI completion and consistency over architectural refactors.
- **Keep pages readable**: prefer extracting reusable UI blocks into `src/components/**` when duplication appears.
- **Tailwind + tokens**:
  - Tailwind is used directly in components.
  - Design tokens exist in `src/styles/tokens.css` (font/colors/radius/shadows). Use them when it helps consistency.
- **No backend yet**:
  - Treat `mockData` as the source of truth for UI iteration.
  - If you need persistence for demos, prefer a small `localStorage` layer (but avoid heavy refactors for now).

## UI TODO (next steps)

Suggested UI-first tasks (safe to do before refactoring):

- Search page
  - Split long forms into sub-sections/components (visual grouping) without changing data flow
  - Improve empty states and inline hints (placeholders, helper text)
  - Add basic form constraints in UI (required markers, disabled save until valid)
- Archive page
  - Add clear “expanded” affordance and keyboard/accessibility improvements
  - Improve filtering UX (e.g. show active filter chips)
- Login / Materials pages
  - Replace placeholders with real UI screens
  - Align typography/spacing with existing pages
- Global UI polish
  - Add top-level responsive behavior for smaller screens (Sidebar handling)
  - Unify button styles (primary/secondary/danger) into small reusable components

## Known limitations (intentional for now)

- Data persistence: none (local state + `mockData`)
- File handling: UI-only (stores selected file name; “download” is a placeholder blob)
- Shared state between pages: not implemented (e.g. `/search` edits don’t reflect in `/archive`)
- i18n: UI strings may be mixed across languages; will be standardized later

## Notes for AI handoff

When proposing changes, please:

- Keep the UI-first intent: minimize architectural churn.
- Prefer incremental improvements with small, reviewable diffs.
- Call out any behavior changes that affect UX flows (search/edit/archive).


