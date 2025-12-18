# WebGator — Features & Overview


<div align="center" id="top"> 
  <img style="width:130px; border-radius:50%" src="./icons/icon.png" alt="WebGator" />
</div>


---

## Overview

A **desktop-only floating browser navigation bar** that appears only when needed, adapts to website themes, and enhances navigation speed without clutter.

---

## Core Features

### 🧭 Smart Navigation

* Back
* Forward
* Reload
* Home (custom start page)

All actions use native browser APIs.

---

### 🎯 Intelligent Visibility

* Appears only when cursor reaches **top-center** of the page
* Auto-hides after inactivity
* Hides on scroll-down, reappears on scroll-up


---

### 🎨 Adaptive Theme Engine

* Detects page brightness
* Automatically switches between light and dark styles
* Prevents blending with page UI
* Maintains strong contrast at all times

#### Dark View
![Light Theme](./icons/Shot-1.png)
#### Light View
![Dark Theme](./icons/Shot-2.png)

---

### ✨ Modern UI / UX

* Glassmorphism container (blur + saturation)
* Smooth fade & slide animation
* Micro-interactions (hover, tap, press)
* SVG icons (crisp at any DPI)


---

### 💬 Tooltips (All Buttons)

* Hover-based tooltip reveal
* Context-aware labels
* Right-click / long-hover support
* Non-blocking, lightweight tooltips


---

## How To Use

### 1️⃣ Normal Browsing

Toolbar stays hidden.

### 2️⃣ Reveal Toolbar

Move cursor to the **top center** of the screen.

### 3️⃣ Navigate

Click any SVG icon to perform navigation instantly.

### 4️⃣ Tooltip Help

Hover or right-click icons for instant hints.

---

## Customization

### Change Home Page

```js
const START_PAGE = "https://your-homepage-url";
```

### Change Trigger Area

```js
const TOP_TRIGGER_HEIGHT = 60;
const CENTER_TRIGGER_WIDTH = 180;
```

---

## Design Philosophy

* Minimal, not distracting
* Appears only when intentional
* Browser-native feel
* Performance first
* No visual pollution

---

## Ideal Use Cases

* Power users
* Large screens
* Touchpad / mouse workflows
* Clean UI enthusiasts
* Custom browser extensions

---

## Summary

✔ Smart
✔ Adaptive
✔ Minimal
✔ Fast
✔ Professional

This navigation bar behaves like a **native browser feature**, not a website overlay.
