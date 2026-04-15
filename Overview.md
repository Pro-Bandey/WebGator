# WebGator — Features & Overview

<div align="center" id="top"> 
  <img style="width:130px; border-radius:50%" src="./src/icon.png" alt="WebGator" />
  <h3>Universal Browser Navigation Suite</h3>
</div>

---

## 🚀 Overview

WebGator is a high-performance, **Manifest V3** navigation extension that replaces clunky browser toolbars with a sleek, adaptive interface. Now rebuilt with a modular architecture, it supports **Chrome, Edge, and Firefox (Desktop & Mobile)**, offering a truly native feel that evolves with the website you are browsing.

---

## 🧭 Core Navigation

- **Back/Forward:** Smooth page traversal.
- **Reload:** Instant page refresh.
- **Home:** User-configurable start page via the settings menu.
- **Close:** Quick tab termination (where browser policy allows).

---

## 🛠 Advanced Display Modes

WebGator now offers two distinct behaviors to suit your workflow:

### 1. Floating Mode (Draggable)

- **Persistence:** Drag the bar anywhere; WebGator remembers the exact `(x, y)` coordinates for every domain.
- **Boundary Intelligence:** Prevents the UI from being dragged off-screen.
- **Non-Intrusive:** Floats above content without shifting the page layout.

### 2. Static Mode (Adaptive Top Bar)

- **Document Shifting:** Automatically pushes the website content down (using smart `margin-top` logic) to ensure WebGator never covers the site's original header or navigation.
- **Auto-Hide Logic:** Slides out of view after 1.5 seconds of inactivity to maximize screen real estate.
- **Edge Reveal:** Simply move your cursor to the top edge of the screen or scroll up to bring the bar back.

---

## 🎨 Contextual Color Extraction (Theme Engine 2.0)

WebGator doesn't just switch between "Light" and "Dark." It **adopts the soul of the website**:

- **Native Adoption:** Analyzes the page's dominant background color and adjusts its own transparency, border, and icon contrast to match.
- **Glassmorphism:** High-end backdrop blur and saturation filters for a premium "OS-native" aesthetic.
- **Dynamic Updates:** Monitors page changes (like dark mode toggles) and updates its theme in real-time.

---

## 📱 Mobile & Cross-Browser Ready

- **Firefox Mobile (Android):** Fully optimized for touch. Includes `touchstart/move` listeners for smooth dragging on mobile browsers.
- **Responsive FAB:** On mobile devices, utilizes a compact "Static" mode to preserve limited vertical space.
- **Universal API:** Built on a `browser`/`chrome` abstraction layer for 100% compatibility across Gecko and Chromium engines.

---

## ⚙️ Settings & Privacy

Access the new **WebGator Popup Menu** to customize your experience:

- **Per-Site Toggles:** Enable or disable WebGator on specific domains.
- **Mode Selector:** Choose between Floating or Static per site.
- **Global Homepage:** Set your custom "Home" URL with built-in validation.
- **Storage Sync:** All settings are stored via `storage.local`, ensuring fast load times and minimal resource impact.

---

## 🕹 How To Use

### Reveal the Bar

- **In Floating Mode:** Always visible (unless disabled).
- **In Static Mode:** Scroll **UP** or hover your mouse at the **top 50px** of the viewport.

### Drag & Position

- Click and hold the empty space between buttons to move the bar. Release to save the position automatically.

### Settings

- Click the WebGator icon in your browser's extension tray to change the homepage or reset the bar's position.

---

## 🧱 Technical Summary

| Feature              | Specification                                           |
| :------------------- | :------------------------------------------------------ |
| **Manifest Version** | V3 (Modern, Secure, Faster)                             |
| **Permissions**      | Minimal (`storage`)                                     |
| **Compatibility**    | Chrome, Edge, Brave, Firefox (Desktop/Android)          |
| **Performance**      | Throttled MutationObservers & RAF-based scroll logic    |
| **Z-Index**          | `2147483647` (Ensures visibility over all web elements) |

---

## 🎯 Design Philosophy

WebGator is designed for users who want a **clean, full-screen browsing experience** without losing the utility of navigation buttons. It behaves like a **native part of the browser's chrome**, adopting the colors of the web while staying out of the way until you need it.
