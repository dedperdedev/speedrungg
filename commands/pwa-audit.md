---
name: pwa-audit
description: PWA audit — manifest, service worker, offline, install, update flow.
---

# /pwa-audit

Invokes `web-platform-specialist`.

## Checks

### Manifest (`public/manifest.webmanifest`)

- [ ] `name`, `short_name` set
- [ ] `start_url` and `scope` correct
- [ ] `display: standalone` (or `fullscreen` for games)
- [ ] `icons` — 192 and 512, `purpose: any maskable` on 512
- [ ] `theme_color` and `background_color` match splash screen
- [ ] `orientation` set if game is landscape-or-portrait-only

### Service Worker (`public/sw.js`)

- [ ] Registered in `main.js` after `load` event
- [ ] Cache-first for hashed assets
- [ ] Network-first for `index.html`
- [ ] Version bumped on every deploy
- [ ] `self.skipWaiting()` + `self.clients.claim()` with update flow
- [ ] Update prompt shown to user, not forced silently

### Install flow

- [ ] `beforeinstallprompt` captured
- [ ] Install button only shown when prompt is available
- [ ] Handled `appinstalled` event

### Offline

- [ ] Offline route serves cached shell
- [ ] Game state persists to IndexedDB
- [ ] Reconnect logic restores state

## Output

`docs/perf-reports/pwa-<date>.md`: checklist results + remediation plan.
