import { useTranslation } from "react-i18next";
import "@/localization/language.css";

export default function LanguageSelector() {
  const { t, i18n } = useTranslation();

  return (
    <div
      className="language-selector"
      role="group"
      aria-label={t("language.label")}
    >
      {(["pt", "en"] as const).map((locale) => (
        <button
          key={locale}
          type="button"
          lang={locale}
          aria-label={locale === "pt" ? "Português" : "English"}
          aria-pressed={i18n.resolvedLanguage === locale}
          onClick={() => void i18n.changeLanguage(locale)}
        >
          {locale.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
