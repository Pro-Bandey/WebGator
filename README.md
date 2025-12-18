# WebGator

<div align="center" id="top"> 
  <img style="width:150px; border-radius:50%" src="./icons/icon.png" alt="WebGator" />
</div>

<p  style="align:left;">
A simple Chrome extension that provides a floating navigation bar with **Back**, **Forward**, and **Reload** **Home** buttons. The navigation bar appears when the user's mouse hovers near the top of the page. It's a great tool to easily navigate between pages without having to use the browser's built-in navigation buttons.
</p>


## Features

- **Back Button**: Navigate back to the previous page in history.
- **Forward Button**: Go forward to the next page in history.
- **Reload Button**: Reload the current page.
- The floating navigation bar appears when the mouse cursor is within 50px of the top of the page.

## Installation

### 1. Download the Extension Files
Create a folder on your computer and save the following files inside the folder:
- `manifest.json`
- `content.js`
- `style.css`

### 2. Load the Extension into Chrome
1. Open **Chrome** and go to `chrome://extensions/`.
2. Enable **Developer mode** in the top-right corner.
3. Click on **Load unpacked** and select the folder where you saved the extension files.

### 3. Test the Extension
- After loading the extension, open a webpage in Chrome.
- Move your mouse to the top of the page (within 50px).
- The floating navigation bar should appear at the top with **Back**, **Forward**, and **Reload** buttons.

## How It Works

- The extension uses a **content script** that adds a floating navigation div to every page you visit.
- The navigation bar is only shown when the mouse is near the top of the page, providing a clean and unobtrusive experience.
- It uses basic **JavaScript** to handle user actions on the buttons (back, forward, reload) and **CSS** to style and position the floating div.
