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
- `/materials`: Materials generation UI (study packet preview / calendar preview)
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

### Materials (`/materials`)

- Mode switcher:
  - Study packet: select exam papers/prints and preview grouped output
  - Calendar: monthly calendar preview of exam schedules
- Filters: school/grade/subject (UI-first)
- Selection list: select all / clear visible + checkbox selection
- Preview:
  - Study packet: grouped by exam record, removable items, output buttons (UI-only)
  - Calendar: color-coded chips by school, monthly grid preview (UI-only)

Main file: `src/pages/MaterialsPage.tsx`  
Related: `src/components/materials/**`, `src/data/materials.ts`, `src/types/materials.ts`, `src/utils/materials.ts`

## Data & types (UI-first)

- Mock data and select options: `src/data/mockData.ts`
- Types: `src/types/exam.ts`
- Materials UI config: `src/data/materials.ts`
- Materials types: `src/types/materials.ts`
- Materials helpers (build/filter/group): `src/utils/materials.ts`
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
    materials/       # Materials UI (sidebar, selection list, previews, etc.)
    season/          # Season-related UI (modal)
  data/              # UI mock data + select options
  pages/             # Route pages
  styles/            # CSS tokens
  types/             # Shared TS types
  utils/             # Small utilities (UI helpers / placeholders)
```

## Reusable components (available now)

These are the basic UI components you can reuse immediately when building new screens.

### `src/components/common/`

- `SectionCard`
  - Card container with title + optional right-side action slot.
  - Used across pages for consistent section layout.
- `SelectField`
  - Styled `<select>` with placeholder + options.
  - Use for all dropdown inputs to keep visuals consistent.
- `ExamFilterBar`
  - Prebuilt filter row: season/school/grade/subject + right-side action button.
  - Accepts an optional `seasonActionSlot` (e.g. “+ 新規シーズン” button).
- `Field`
  - Simple label/value row (read-only display).
  - Useful for detail pages and summaries.
- `FileBox`
  - File name display + download button (disabled if empty).
  - Download behavior is currently UI-only (see `src/utils/downloadFile.ts`).

### `src/components/layout/`

- `Sidebar`
  - Left navigation container (desktop: `lg` and up).
- `SidebarButton`
  - Styled nav button with active state.

### `src/components/season/`

- `CreateSeasonModal`
  - Modal UI for creating a “season label” (year/term/exam type) and selecting schools.
  - Currently used in `/search` as UI-first flow.

### `src/components/materials/`

- `MaterialsModeSwitcher`
  - Switch between material modes (`studyPacket` / `calendar`).
- `MaterialsSidebar`
  - Left panel: filters + selection controls (mode-dependent).
- `MaterialsFilter`
  - Small labeled select used in the materials sidebar.
- `MaterialsSelectionList`
  - Checkbox list with “select all visible / clear” controls.
- `MaterialsStudyPacketPreview`
  - Preview panel that groups selected items by exam record and allows removing items.
- `MaterialsCalendarPreview`
  - Monthly calendar preview UI (currently fixed month demo) with school color legend.
- `MaterialsButton`
  - Mode card-style button used by the switcher.

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
- Login page
  - Replace placeholder with real UI screen
  - Align typography/spacing with existing pages
- Materials page
  - Wire “output” actions (currently UI-only)
  - Add season filter (optional) and improve empty/disabled states
  - Calendar: support month navigation + dynamic day grid (currently fixed month demo)
- Global UI polish
  - Add top-level responsive behavior for smaller screens (Sidebar handling)
  - Unify button styles (primary/secondary/danger) into small reusable components

## Known limitations (intentional for now)

- Data persistence: none (local state + `mockData`)
- File handling: UI-only (stores selected file name; “download” is a placeholder blob)
- Shared state between pages: not implemented (e.g. `/search` edits don’t reflect in `/archive`)
- Materials output: UI-only (preview and buttons exist; no real export yet)
- i18n: UI strings may be mixed across languages; will be standardized later

## Notes for AI handoff

When proposing changes, please:

- Keep the UI-first intent: minimize architectural churn.
- Prefer incremental improvements with small, reviewable diffs.
- Call out any behavior changes that affect UX flows (search/edit/archive).


