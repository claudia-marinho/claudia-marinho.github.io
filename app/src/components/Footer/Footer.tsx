import { footerLinks } from "@/components/Footer/footer.data";
import Rays from "@/components/Rays/Rays";
import "@/components/Footer/Footer.css";

export default function Footer() {
  return (
    <footer className="footer split">
      <div className="footer-copy panel">
        <h2>
          <span className="footer-line-one">LET’S BUILD</span>
          <br />
          <span className="word-anchor footer-word">
            WHAT’S NEXT.
            <Rays className="footer-rays" />
          </span>
        </h2>
        <p>
          Want to talk about a project or working together? I’d love to hear
          from you.
        </p>
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

              {label}
            </a>
          ))}
        </div>
      </div>
      <div className="footer-image">
        <img
          src="assets/mountains.jpg"
          alt="Mountain landscape with alpine wildflowers at dusk"
          loading="lazy"
        />
      </div>
    </footer>
  );
}
