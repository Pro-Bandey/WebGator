# WebGator

<div align="center" id="top"> 
  <img style="width:150px; border-radius:50%" src="./icons/icon.png" alt="WebGator" />
</div>


<p  style="align:left;">
A simple Chrome extension that provides a floating navigation bar with **Back**, **Forward**,  **Reload**, **Home**, and **Close** buttons. The navigation bar appears when the user's mouse hovers near the top of the page. It's a great tool to easily navigate between pages without having to use the browser's built-in navigation buttons.
</p>

## Give a Star ⭐ 
If you like this project give this  repo a star ⭐ and we very thankful if you give this repo a star ⭐ 

## Features

- **Back Button**: Navigate back to the previous page in history.
- **Forward Button**: Go forward to the next page in history.
- **Reload Button**: Reload the current page.
- **Home Button**: Change current tab in our online version [homepage](https://online-homepage.vercel.app/)
- **Close Button**: Close Current tab if you open else if chrome Open
- The floating navigation bar appears when the mouse cursor is within 50px of the top of the page.

## [Take a full Overview](https://github.com/Pro-Bandey/WebGator/blob/main/Overview.md)

## Installation

### 1. Download the Extension Files
Create a folder on your computer and save the following files inside the folder:

* `WebGator/`
  - `|__manifest.json`
  - `|__content.js`
  - `|__style.css`
  - `|__icons/`
    - `|__16.png`
    - `|__32.png`
    - `|__48.png`
    - `|__icon.png`

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

## OnwerShip
- If you able publish our project in WebStore, Firefox add-on or edge add-on, you don't able to remove our identity completely
- 50% ownership is our in you version of our property to show our identity 
- If you make new changes like
  - features
  - improvements
  - UI design
  - resources
- You are responsible create pr to main repo
- then we like that changes we 5ake them for nnext version of WebGator1
