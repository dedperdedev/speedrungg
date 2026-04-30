---
name: setup-engine
description: Install and scaffold a chosen web engine. Usage — /setup-engine <engine> [--with-tailwind]
---

# /setup-engine

Usage: `/setup-engine <phaser|pixijs|threejs|babylonjs|vanilla> [--with-tailwind]`

## Steps

1. **Confirm with user.** Show what will be installed, where, and why.
2. **Invoke the matching engine specialist.** E.g. `phaser` → `phaser-specialist`.
3. **Install deps.** Using npm or pnpm (follow what's already present, or ask).
4. **Write scaffolding** into `src/rendering/<engine>/`:
   - `bootstrap.js` — engine init wrapping `src/core/store.js`
   - `adapter.js` — implements the common rendering interface
   - `README.md` — engine-specific notes
5. **If `--with-tailwind`:** invoke `build-engineer` to add Tailwind to Vite config and scaffold `src/ui/styles/index.css`.
6. **Write ADR** — `docs/adr/0001-engine-choice.md` — documenting the choice and rationale.
7. **Smoke test.** Confirm `npm run dev` starts and shows a blank canvas with the engine running.
8. **Update `CLAUDE.md`** engine section if needed.

## Rollback

If user changes their mind: `git restore .` + `rm -rf node_modules`, then try again.
