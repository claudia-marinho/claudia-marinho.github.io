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
          <a href="mailto:claudia.m.r.marinho@gmail.com">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="4" width="20" height="16" rx="2" />
              <path d="m3 6 9 7 9-7" />
            </svg>
            Email
          </a>
          <a
            href="https://www.linkedin.com/in/claudia-marinho/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="2" y="2" width="20" height="20" rx="2" />
              <path d="M7 10v8m0-11v.1M11 18v-8m0 3a3 3 0 0 1 6 0v5" />
            </svg>
            LinkedIn
          </a>
          <a
            href="https://github.com/claudia-marinho"
            target="_blank"
            rel="noopener noreferrer"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M9 20c-4 .9-4-2-6-2m12 4v-3.2a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.3 4.3 0 0 0-.1-3s-1.2-.3-3.3 1.5a11.3 11.3 0 0 0-6 0C6.9 3.7 5.7 4 5.7 4a4.3 4.3 0 0 0-.1 3 4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18.8V22" />
            </svg>
            GitHub
          </a>
          <a
            href="assets/CV_Claudia_Marinho.pdf"
            download="CV_Claudia_Marinho.pdf"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z" />
              <path d="M14 2v6h5M8 12h8M8 16h8" />
            </svg>
            Save as PDF
          </a>
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
