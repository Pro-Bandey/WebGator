(() => {
  const extAPI = typeof browser !== "undefined" ? browser : chrome;

  const DEFAULT_SETTINGS = {
    global: { homepage: "https://online-homepage.vercel.app/", defaultMode: "floating" },
    sites: {}
  };

  let settings = DEFAULT_SETTINGS;
  let currentDomain = window.location.hostname.replace(/^www\./, '');

  let nav;
  let isDragging = false, dragStartX = 0, dragStartY = 0, initialX = 0, initialY = 0;
  let lastScroll = window.scrollY;
  let scrollRAF;

  /* ---------- INITIALIZATION ---------- */
  async function init() {
    const { webgatorSettings } = await extAPI.storage.local.get("webgatorSettings");
    if (webgatorSettings) settings = webgatorSettings;

    extAPI.storage.onChanged.addListener((changes) => {
      if (changes.webgatorSettings) {
        settings = changes.webgatorSettings.newValue;
        render();
      }
    });

    render();
    setupScroll();
    setupThemeObserver();
  }

  function getSiteSettings() {
    return settings.sites[currentDomain] || { enabled: true, mode: "floating", position: null };
  }

  function render() {
    const siteSettings = getSiteSettings();
    if (!siteSettings.enabled) {
      removeUI();
      return;
    }
    buildUI();
    applyModeAndPosition(siteSettings);
    applyNativeTheme();
  }

  function removeUI() {
    document.getElementById("wg-container")?.remove();
    document.documentElement.style.marginTop = '';
    nav = null;
  }

  /* ---------- DOM BUILDER ---------- */
  function buildUI() {
    if (document.getElementById("wg-container")) return;

    const container = document.createElement("div");
    container.id = "wg-container";

    nav = document.createElement("div");
    nav.id = "wg-nav";
    nav.innerHTML = `
      ${btn("back", "Go back", iconBack())}
      ${btn("forward", "Go forward", iconForward())}
      ${btn("reload", "Reload page", iconReload())}
      ${btn("home", "Open Home", iconHome())}
      ${btn("close", "Close tab", iconClose())}
    `;

    container.appendChild(nav);
    document.body.appendChild(container);

    attachNavEvents();
    attachDragEvents();
  }

  /* ---------- MODES, POSITIONING & AUTO-HIDE ---------- */
  let hideTimer;
  const AUTO_HIDE_DELAY = 1500;

  function applyModeAndPosition(siteSettings) {
    const mode = siteSettings.mode || settings.global.defaultMode;
    nav.className = "";

    document.documentElement.style.marginTop = '';
    if (hideTimer) clearTimeout(hideTimer);

    if (mode === "floating") {
      nav.classList.add("wg-floating");
      if (siteSettings.position) {
        nav.style.left = `${siteSettings.position.x}px`;
        nav.style.top = `${siteSettings.position.y}px`;
        nav.style.transform = "none";
      } else {
        nav.style.left = `50%`;
        nav.style.top = `10px`;
        nav.style.transform = `translateX(-50%)`;
      }
    } else {
      nav.classList.add("wg-static");
      resetStaticAutoHide();
    }
  }

  function resetStaticAutoHide() {
    const siteSettings = getSiteSettings();
    const mode = siteSettings.mode || settings.global.defaultMode;

    if (mode !== "static" || !nav) return;

    nav.classList.remove("wg-scroll-hide");
    if (hideTimer) clearTimeout(hideTimer);

    hideTimer = setTimeout(() => {
      if (!nav.matches(':hover')) {
        nav.classList.add("wg-scroll-hide");
      }
    }, AUTO_HIDE_DELAY);
  }

  /* ---------- DRAG & DROP (WITH MOBILE TOUCH SUPPORT) ---------- */
  function attachDragEvents() {
    const startDrag = (e) => {
      if (e.target.closest("button") || !nav.classList.contains("wg-floating")) return;
      isDragging = true;

      // Determine if touch or mouse
      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      dragStartX = clientX;
      dragStartY = clientY;

      const rect = nav.getBoundingClientRect();
      initialX = rect.left;
      initialY = rect.top;

      nav.style.transform = "none";
      nav.style.transition = "none";

      if (e.type === 'mousedown') e.preventDefault();
    };

    const doDrag = (e) => {
      if (!isDragging) return;

      const clientX = e.type.includes('touch') ? e.touches[0].clientX : e.clientX;
      const clientY = e.type.includes('touch') ? e.touches[0].clientY : e.clientY;

      let newX = initialX + (clientX - dragStartX);
      let newY = initialY + (clientY - dragStartY);

      newX = Math.max(0, Math.min(newX, window.innerWidth - nav.offsetWidth));
      newY = Math.max(0, Math.min(newY, window.innerHeight - nav.offsetHeight));

      nav.style.left = `${newX}px`;
      nav.style.top = `${newY}px`;
    };

    const endDrag = async () => {
      if (!isDragging) return;
      isDragging = false;
      nav.style.transition = "opacity .3s cubic-bezier(.22, 1, .36, 1), transform .3s cubic-bezier(.22, 1, .36, 1)";

      const siteSettings = getSiteSettings();
      siteSettings.position = { x: parseInt(nav.style.left), y: parseInt(nav.style.top) };
      settings.sites[currentDomain] = siteSettings;
      await extAPI.storage.local.set({ webgatorSettings: settings });
    };

    // Mouse events
    nav.addEventListener("mousedown", startDrag);
    document.addEventListener("mousemove", doDrag);
    document.addEventListener("mouseup", endDrag);

    // Touch events for Firefox Mobile
    nav.addEventListener("touchstart", startDrag, { passive: true });
    document.addEventListener("touchmove", doDrag, { passive: true });
    document.addEventListener("touchend", endDrag);
  }

  /* ---------- SCROLL & MOUSE BEHAVIOR ---------- */
  function setupScroll() {
    window.addEventListener("scroll", () => {
      if (!nav) return;

      const siteSettings = getSiteSettings();
      const mode = siteSettings.mode || settings.global.defaultMode;

      if (mode !== "static") {
        nav.classList.remove("wg-scroll-hide");
        return;
      }

      if (scrollRAF) cancelAnimationFrame(scrollRAF);
      scrollRAF = requestAnimationFrame(() => {
        const y = window.scrollY;

        if (y > lastScroll && y > 60) {
          nav.classList.add("wg-scroll-hide");
          if (hideTimer) clearTimeout(hideTimer);
        } else if (y < lastScroll) {
          resetStaticAutoHide();
        }
        lastScroll = y;
      });
    }, { passive: true });

    document.addEventListener("mousemove", (e) => {
      if (!nav) return;
      const siteSettings = getSiteSettings();
      const mode = siteSettings.mode || settings.global.defaultMode;

      if (mode === "static" && e.clientY <= 50) {
        resetStaticAutoHide();
      }
    });

    document.addEventListener("mouseover", (e) => {
      if (!nav) return;
      if (nav.contains(e.target)) {
        if (hideTimer) clearTimeout(hideTimer);
        nav.classList.remove("wg-scroll-hide");
      }
    });

    document.addEventListener("mouseout", (e) => {
      if (!nav) return;
      if (nav.contains(e.target)) {
        resetStaticAutoHide();
      }
    });
  }

  /* ---------- ACTION EVENTS ---------- */
  function attachNavEvents() {
    nav.addEventListener("click", (e) => {
      const btn = e.target.closest("button");
      if (!btn) return;

      btn.classList.add("tap");
      setTimeout(() => btn.classList.remove("tap"), 150);

      const actions = {
        back: () => history.back(),
        forward: () => history.forward(),
        reload: () => location.reload(),
        home: () => (location.href = settings.global.homepage),
        close: () => {
          window.close();
          setTimeout(() => alert("Firefox security prevents scripts from closing unowned tabs."), 200);
        },
      };
      actions[btn.dataset.action]?.();
    });
  }

  /* ---------- NATIVE COLOR EXTRACTION & THEMING ---------- */
  function getDominantBackgroundColor() {
    let currentElement = document.body;
    let bg = 'rgba(0, 0, 0, 0)';

    while (currentElement && currentElement !== document) {
      const computed = window.getComputedStyle(currentElement).backgroundColor;
      if (computed !== 'rgba(0, 0, 0, 0)' && computed !== 'transparent') {
        bg = computed;
        break;
      }
      currentElement = currentElement.parentNode;
    }

    if (bg === 'rgba(0, 0, 0, 0)' || bg === 'transparent') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      // Adjusted slightly to match Firefox Proton dark UI fallback
      bg = isDark ? 'rgb(28, 27, 34)' : 'rgb(255, 255, 255)';
    }

    return bg;
  }

  function applyNativeTheme() {
    if (!nav) return;

    const bg = getDominantBackgroundColor();
    const rgbMatch = bg.match(/\d+/g);
    const rgb = rgbMatch ? rgbMatch.map(Number) : [255, 255, 255];

    const brightness = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;
    const isLight = brightness > 140;

    nav.style.setProperty('--wg-bg', `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.85)`);
    nav.style.setProperty('--wg-border', isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.08)');
    nav.style.setProperty('--wg-shadow', isLight
      ? '0 4px 12px rgba(0,0,0,0.1), 0 1px 3px rgba(0,0,0,0.08)'
      : '0 4px 12px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.2)');

    // Firefox Proton specifics
    nav.style.setProperty('--wg-icon-color', isLight ? '#1c1b22' : '#fbfbfe');
    nav.style.setProperty('--wg-hover-bg', isLight ? 'rgba(0, 0, 0, 0.08)' : 'rgba(255, 255, 255, 0.12)');
    nav.style.setProperty('--wg-active-bg', isLight ? 'rgba(0, 0, 0, 0.12)' : 'rgba(255, 255, 255, 0.18)');

    nav.style.setProperty('--wg-tooltip-bg', isLight ? '#1c1b22' : '#fbfbfe');
    nav.style.setProperty('--wg-tooltip-text', isLight ? '#ffffff' : '#1c1b22');
  }

  function setupThemeObserver() {
    let timeout;
    new MutationObserver(() => {
      clearTimeout(timeout);
      timeout = setTimeout(applyNativeTheme, 300);
    }).observe(document.documentElement, { attributes: true, childList: true, subtree: true });
  }

  /* ---------- SVG ICONS ---------- */
  function btn(action, tip, svg) {
    return `<button data-action="${action}">${svg}<span class="tooltip">${tip}</span></button>`;
  }
  function iconBack() { return `<svg viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6"/></svg>`; }
  function iconForward() { return `<svg viewBox="0 0 24 24"><path d="M10 6l6 6-6 6"/></svg>`; }
  function iconReload() { return `<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6"/></svg>`; }
  function iconHome() { return `<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9h-6v-6H9v6H3z"/></svg>`; }
  function iconClose() { return `<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6l-12 12"/></svg>`; }

  init();
})();