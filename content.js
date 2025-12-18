(() => {
  const TOP_TRIGGER_HEIGHT = 60;
  const CENTER_TRIGGER_WIDTH = 180;
  const HIDE_DELAY = 200;
  const START_PAGE = "https://homepage-gamma-dun.vercel.app/";

  const ALLOWED_HOSTS = [
    "google.com",
    "github.com",
    "youtube.com",
    "vercel.app",
    "chatgpt.com",
    "facebook.com",
    "meta.ai",
    "claude.com",
    "whatsapp.com",
    "canva.com",
    "x.com",
    "instagram.com",
    "linkedin.com",
    "openai.com",
  ];

  const isDesktop =
    !("ontouchstart" in window) &&
    window.matchMedia("(pointer: fine)").matches &&
    window.innerWidth >= 1024;

  if (!isDesktop) return;
  if (!ALLOWED_HOSTS.some((h) => location.hostname.includes(h))) return;
  if (document.getElementById("floating-nav")) return;

  const nav = document.createElement("div");
  nav.id = "floating-nav";
  nav.innerHTML = `
    ${btn("back", "Go back", iconBack())}
    ${btn("forward", "Go forward", iconForward())}
    ${btn("reload", "Reload page", iconReload())}
    ${btn("home", "Open Home", iconHome())}
  `;
  document.body.appendChild(nav);

  let hideTimer,
    lastScroll = window.scrollY;

  const toggleNav = (show) => nav.classList.toggle("show", show);

  document.addEventListener("mousemove", (e) => {
    const centerX = window.innerWidth / 2;
    const nearTop = e.clientY <= TOP_TRIGGER_HEIGHT;
    const nearCenter = Math.abs(e.clientX - centerX) <= CENTER_TRIGGER_WIDTH;

    clearTimeout(hideTimer);
    nearTop && nearCenter
      ? toggleNav(true)
      : (hideTimer = setTimeout(() => toggleNav(false), HIDE_DELAY));
  });

  window.addEventListener("scroll", () => {
    const y = window.scrollY;
    y > lastScroll && y > 50 ? toggleNav(false) : toggleNav(true);
    lastScroll = y;
  });

  nav.addEventListener("click", (e) => {
    const btn = e.target.closest("button");
    if (!btn) return;

    btn.classList.add("tap");
    setTimeout(() => btn.classList.remove("tap"), 120);

    ({
      back: () => history.back(),
      forward: () => history.forward(),
      reload: () => location.reload(),
      home: () => (location.href = START_PAGE),
    })[btn.dataset.action]?.();
  });

  // ===== Adaptive Theme =====
  function applyTheme() {
    const bg = getComputedStyle(document.body).backgroundColor;
    const rgb = bg.match(/\d+/g)?.map(Number) || [255, 255, 255];
    const bright = (rgb[0] * 299 + rgb[1] * 587 + rgb[2] * 114) / 1000;

    nav.style.background = bright > 180 ? "#c9c9c959" : "#5c5c5c47";
    nav.style.backdropFilter = "blur(14px) saturate(180%)";
    nav.style.boxShadow = bright > 180 ? "0px 0px 10px -4px" : "0 0 0 0";

    nav.querySelectorAll("button").forEach((b) => {
      b.style.background =
        bright > 180 ? "#b9b9b95c" : "#ffffff70";
      b.style.color = bright > 180 ? "#000" : "#fff";
    });
  }

  applyTheme();
  new MutationObserver(applyTheme).observe(document.documentElement, {
    subtree: true,
    attributes: true,
  });

  // ===== Helpers =====
  function btn(action, tip, svg) {
    return `
      <button data-action="${action}">
        ${svg}
        <span class="tooltip">${tip}</span>
      </button>
    `;
  }

  function iconBack() {
    return `<svg viewBox="0 0 24 24"><path d="M14 6l-6 6 6 6" /></svg>`;
  }
  function iconForward() {
    return `<svg viewBox="0 0 24 24"><path d="M10 6l6 6-6 6" /></svg>`;
  }
  function iconReload() {
    return `<svg viewBox="0 0 24 24"><path d="M20 12a8 8 0 1 1-2.34-5.66M20 4v6h-6" /></svg>`;
  }
  function iconHome() {
    return `<svg viewBox="0 0 24 24"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z" /></svg>`;
  }
})();
