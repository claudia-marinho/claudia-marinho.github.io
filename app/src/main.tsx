import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import LanguageSelector from "@/localization/LanguageSelector";
import "@/localization/i18n";
import "@/styles/tokens.css";
import "@/styles/global.css";
import "@/styles/layout.css";
import "@/styles/motion.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
    <LanguageSelector />
  </StrictMode>,
);
