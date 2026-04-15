# WebGator

## Changelog

## Current Status

✅ Stable  
✅ Desktop & Mobile (Firefox Android)
✅ Native Browser UI (Chrome/Firefox)  
✅ Cross-Browser Compatible  
✅ Settings-driven Persistence

---

## v9.0 — The "Universal" Update (Firefox & Mobile)

- **Firefox Support:** Full compatibility with Firefox Desktop and Firefox for Android.
- **Touch Engine:** Implemented `touchstart`, `touchmove`, and `touchend` logic for mobile dragging.
- **API Abstraction:** Migrated to a universal `browser` / `chrome` wrapper for cross-browser stability.
- **Smart Static Mode:** Added `margin-top` document pushing to prevent overlapping website headers.
- **Mobile UX:** Automatically disables tooltips on touch devices to prevent "sticky" hover states.

---

## v8.6 — UX Streamlining & "Push" Logic

- **Static Bar Fix:** In Static mode, the extension now pushes the website content down (48px) so it never covers the site's own navigation.
- **Minimalist Action:** Removed right-click history menu to reduce clutter and focus on core navigation.
- **Refined Auto-Hide:** Static bar now auto-hides after 1.5 seconds of inactivity.
- **Edge-Reveal:** Move cursor to the top 50px of the screen to instantly reveal the hidden Static bar.

---

## v8.5 — Modular Refactor & Settings System

- **Architecture Upgrade:** Refactored into a scalable modular system (Popup, Content, Storage).
- **Settings Popup:** New UI to enable/disable WebGator per-site.
- **Global Homepage:** Users can now set a custom homepage URL via the extension popup.
- **Position Persistence:** Floating mode now saves its X/Y coordinates per domain using `storage.local`.
- **Display Modes:** Toggle between `Floating` (Draggable Pill) and `Static` (Fixed Top Bar).

---

## v8.4 — Native UI & Adaptive Theming

- **Adaptive Color Engine:** Advanced color extraction detects the website's background to blend the UI perfectly.
- **Glassmorphism 2.0:** Updated backdrop filters (blur + saturate) to match modern browser aesthetics.
- **Chrome Native Design:** Adopted "Pill" shapes and hover states consistent with Chrome’s Material You design.

---

## v8.3 — UX Hardening

- No UI mixing between light/dark modes.
- Readability preserved across websites.
- Conflict-free styling (isolated scope).

---

## v7.5 — History Preview Tooltips

- Hover / long-press / right-click preview.
- Tooltip for **Back / Forward**.
- Non-intrusive, lightweight tooltip UI.
- Keyboard-safe and pointer-safe.

---

## v7.0 — Toolbar Simplification

- Reduced to **5 core buttons** (Back, Forward, Reload, Home, Close).
- Removed bookmarks & extra clutter.
- Clean, minimal, browser-native feel.

---

## v6.0 — Smart Visibility Behavior

- Toolbar auto-hides on scroll down.
- Reappears on scroll up.
- Cursor-based reveal refined.
- Reduced accidental popups.

---

## v1.0 — Initial Prototype

- Floating navigation bar injected via content script.
- Buttons: **Back, Forward, Reload**.
- Desktop-only detection.
