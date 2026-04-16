# GEMINI.md

This file provides guidance to Gemini (Antigravity) when working with code in this repository. 
It serves as a bridge to the established guidelines in `CLAUDE.md`.

## Primary Instruction

**You must prioritize and follow all instructions, patterns, and guidelines defined in [CLAUDE.md](file:///c:/Desarrollo/flexigom/CLAUDE.md).**

## Project Overview

**Flexigom** is an MVP for a bed, mattress, and pillow shop with a Strapi CMS backend and React frontend. 

- **Frontend**: React 19 + TypeScript + Vite + TailwindCSS 4 + shadcn/ui
- **Backend**: Strapi 5.23.1 + PostgreSQL + REST API + MercadoPago
- **Package Manager**: pnpm (always use pnpm for commands)

## Active Tasks (feat/improve-filtering-products)

- [ ] Audit current filtering implementation in `use-product-filters.ts` and `products-page.tsx`
- [ ] Improve URL parameter handling and synchronization
- [ ] Enhance UX for multi-select filters
- [ ] Optimize filter performance (debounce search, memoize results)
- [ ] Validate responsive design for filter sidebar

## Session Log (2026-04-16)

- **12:07 PM**: Initialized project memory via `/init`. Focus set to `feat/improve-filtering-products`.

## Key Guidelines from CLAUDE.md

- **Tech Stack**: React Router 7 (lazy loading, loaders), TanStack Query (server state), Zustand (client state/cart).
- **Styling**: TailwindCSS 4 + shadcn/ui.
- **Workflow**: Always run `pnpm pre-commit` in `frontend/` before suggesting or finalizing commits.
- **Null Handling**: Sections should return `null` when data is empty.
- **Language**: Core logic and responses should be in English (unless UI copy is requested in Spanish).

For detailed command references, project structure, and integration logic, refer directly to [CLAUDE.md](file:///c:/Desarrollo/flexigom/CLAUDE.md).
