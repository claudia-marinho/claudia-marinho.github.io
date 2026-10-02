import { useTranslation } from "react-i18next";
import { footerLinks } from "@/components/Footer/footer.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Footer/Footer.css";

export default function Footer() {
  const { t } = useTranslation();
  return (
    <footer className="footer split">
      <div className="footer-copy panel">
        <h2>
          <span className="footer-line-one">{t("footer.titleStart")}</span>
          <br />
          <span className="word-anchor footer-word">
            {t("footer.titleEnd")}
            <Rays className="footer-rays" />
          </span>
        </h2>
        <p>{t("footer.description")}</p>
        <div className="footer-links">
          {/* Link destinations and icon geometry live in footer.data.ts. */}
          {footerLinks.map(({ label, href, openInNewTab, download, icon }) => (
            <a
              key={label}
              href={href}
              target={openInNewTab ? "_blank" : undefined}
              rel={openInNewTab ? "noopener noreferrer" : undefined}
              download={download}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {icon.rectangles?.map((rectangle, index) => (
                  <rect key={index} {...rectangle} />
                ))}

                {icon.paths.map((path) => (
                  <path key={path} d={path} />
                ))}
              </svg>

              {t(label)}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-image">
        <img src="assets/mountains.jpg" alt={t("footer.alt")} loading="lazy" />
      </div>
    </footer>
  );
}
