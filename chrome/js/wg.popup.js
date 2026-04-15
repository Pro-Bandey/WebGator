const DEFAULT_SETTINGS = {
  global: { homepage: "https://online-homepage.vercel.app/", defaultMode: "floating" },
  sites: {}
};

const getDomain = (url) => {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch { return ''; }
};

const isValidUrl = (string) => {
  try { new URL(string); return true; } catch { return false; }
};

document.addEventListener("DOMContentLoaded", async () => {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
  const currentDomain = getDomain(tabs[0]?.url || "");
  
  const { webgatorSettings } = await chrome.storage.local.get("webgatorSettings");
  const settings = webgatorSettings || DEFAULT_SETTINGS;
  
  if (!settings.sites[currentDomain]) {
    settings.sites[currentDomain] = { enabled: true, mode: "floating", position: null };
  }
  const siteSet = settings.sites[currentDomain];

  const elEnabled = document.getElementById("site-enabled");
  const elMode = document.getElementById("site-mode");
  const elHomepage = document.getElementById("global-homepage");
  const btnReset = document.getElementById("reset-pos");
  const btnSaveGlobal = document.getElementById("save-global");
  const elStatus = document.getElementById("status");

  elEnabled.checked = siteSet.enabled;
  elMode.value = siteSet.mode || "floating";
  elHomepage.value = settings.global.homepage;

  const showStatus = (msg, error = false) => {
    elStatus.textContent = msg;
    elStatus.style.color = error ? "#d93025" : "#188038";
    setTimeout(() => elStatus.textContent = "", 2000);
  };

  const saveSettings = async () => {
    siteSet.enabled = elEnabled.checked;
    siteSet.mode = elMode.value;
    settings.sites[currentDomain] = siteSet;
    await chrome.storage.local.set({ webgatorSettings: settings });
  };

  elEnabled.addEventListener("change", saveSettings);
  elMode.addEventListener("change", saveSettings);

  btnReset.addEventListener("click", async () => {
    siteSet.position = null;
    await saveSettings();
    showStatus("Position reset!");
  });

  btnSaveGlobal.addEventListener("click", async () => {
    const url = elHomepage.value.trim();
    if (!isValidUrl(url)) {
      showStatus("Invalid URL format!", true);
      return;
    }
    settings.global.homepage = url;
    await chrome.storage.local.set({ webgatorSettings: settings });
    showStatus("Settings saved!");
  });
});