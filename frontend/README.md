# „Œ »— «·–ﬂ«¡ ñ Hasan Al-Yasiri Technology Lab

A scalable, production-ready learning management system for vocational students in computer networks, cybersecurity, hardware, motherboards, microprocessors, and operating systems.

## Phase 1 delivered
- Vite + React 19 + TypeScript frontend foundation
- Tailwind CSS styling system
- React Router setup for future route-based pages
- PWA support for installable offline-ready experiences
- ESLint and Prettier for consistent code quality
- GitHub Pages deployment workflow and base-path configuration

## Project structure
- src/components ó reusable UI components
- src/pages ó route-level page modules
- src/hooks ó shared hooks
- src/services ó API and data access layer
- src/types ó centralized TypeScript types
- src/lib ó utilities and shared helpers
- public ó static assets and PWA manifest

## Scripts
- npm run dev ó start the Vite development server
- npm run build ó create a production build
- npm run preview ó preview the production build locally
- npm run lint ó run ESLint
- npm run format ó apply Prettier formatting
- npm run deploy ó build and deploy to GitHub Pages

## Deployment
The project is configured for GitHub Pages through the workflow in .github/workflows/deploy.yml and the Vite base URL in vite.config.ts.
