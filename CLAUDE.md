# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

A showcase marketing site for a beauty salon, built on **Nuxt 4** (Vue 3, vue-router). The repo is currently a fresh Nuxt minimal starter — `app/app.vue` still renders the default `NuxtWelcome` component, so most feature work starts from a near-empty baseline.

## Commands

- `npm run dev` — start the dev server at `http://localhost:3000`
- `npm run build` — production build
- `npm run generate` — static-site generation (likely the deploy target for a showcase site)
- `npm run preview` — preview the production build locally
- `npm install` — installs deps and runs `nuxt prepare` (postinstall) to generate `.nuxt/` types

No test runner or linter is configured yet. If you add one, document its commands here.

## Architecture

Nuxt 4 uses the `app/` directory as the source root (set automatically; not the Nuxt 3 layout). Use Nuxt's convention-based directories under `app/` as the app grows:

- `app/app.vue` — root component
- `app/pages/` — file-based routes (adding this dir activates vue-router routing)
- `app/components/` — auto-imported components
- `app/layouts/`, `app/composables/`, `app/assets/` — standard Nuxt conventions
- `public/` — static assets served at the root (`favicon.ico`, `robots.txt`)

TypeScript config is delegated to the generated `.nuxt/tsconfig.*.json` references; do not hand-edit `.nuxt/`. Configure the framework in `nuxt.config.ts`.

## Conventions

The user's global `~/.claude/CLAUDE.md` defines mandatory CSS, HTML, accessibility, and TypeScript conventions that apply here — notably: `clamp()` for all font sizes and fluid layout, color tokens as `:root` CSS custom properties (no raw hex in components), semantic HTML5 elements, WCAG 2.1 AA compliance, explicit return types on exported functions (no `any`), and a `position: absolute`-on-wrappers-only rule. A `JOURNAL.md` changelog entry is required before every commit.
- Language: all code must be in English — variable names, function names, type names, CSS class names, constants, and comments; Spanish is reserved exclusively for user-facing text (UI strings, labels, copy) since the site targets a Mexican audience.
