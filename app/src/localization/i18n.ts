import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/localization/locales/en.json";
import pt from "@/localization/locales/pt.json";

function initialLanguage() {
  try {
    const saved = localStorage.getItem("portfolio-language");
    if (saved === "pt" || saved === "en") return saved;
  } catch {
    // Detect the browser language even when storage is unavailable.
  }

  const browserLanguage = navigator.language.toLowerCase().split("-")[0];
  return browserLanguage === "pt" ? "pt" : "en";
}

// Keep document language and storage in sync for every language change.
i18n.on("languageChanged", (language: string) => {
  document.documentElement.lang = language === "pt" ? "pt-PT" : "en";
  try {
    localStorage.setItem("portfolio-language", language);
  } catch {
    // Language switching still works when browser storage is unavailable.
  }
});

void i18n.use(initReactI18next).init({
  resources: { en: { translation: en }, pt: { translation: pt } },
  lng: initialLanguage(),
  supportedLngs: ["en", "pt"],
  fallbackLng: "en",
  initAsync: false,
  interpolation: { escapeValue: false },
});

export default i18n;
