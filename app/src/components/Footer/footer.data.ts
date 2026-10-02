// Keep each destination, its browser behaviour, and its icon together.
// Icons share the 24 × 24 viewBox and styling in Footer.css.
type FooterLink = {
  label: string;
  href: string;
  openInNewTab?: boolean;
  download?: string;
  icon: {
    paths: string[];
    rectangles?: {
      x: number;
      y: number;
      width: number;
      height: number;
      rx: number;
    }[];
  };
};

export const footerLinks: FooterLink[] = [
  {
    label: "footer.email",
    href: "mailto:claudia.m.r.marinho@gmail.com",
    icon: {
      rectangles: [{ x: 2, y: 4, width: 20, height: 16, rx: 2 }],
      paths: ["m3 6 9 7 9-7"],
    },
  },
  {
    label: "footer.linkedin",
    href: "https://www.linkedin.com/in/claudia-marinho/",
    openInNewTab: true,
    icon: {
      rectangles: [{ x: 2, y: 2, width: 20, height: 20, rx: 2 }],
      paths: ["M7 10v8m0-11v.1M11 18v-8m0 3a3 3 0 0 1 6 0v5"],
    },
  },
  {
    label: "footer.github",
    href: "https://github.com/claudia-marinho",
    openInNewTab: true,
    icon: {
      paths: [
        "M9 20c-4 .9-4-2-6-2m12 4v-3.2a3 3 0 0 0-.8-2.3c2.7-.3 5.5-1.3 5.5-6A4.7 4.7 0 0 0 18.4 7a4.3 4.3 0 0 0-.1-3s-1.2-.3-3.3 1.5a11.3 11.3 0 0 0-6 0C6.9 3.7 5.7 4 5.7 4a4.3 4.3 0 0 0-.1 3 4.7 4.7 0 0 0-1.3 3.5c0 4.7 2.8 5.7 5.5 6A3 3 0 0 0 9 18.8V22",
      ],
    },
  },
  {
    label: "footer.pdf",
    href: "assets/CV_Claudia_Marinho.pdf",
    download: "CV_Claudia_Marinho.pdf",
    icon: {
      paths: [
        "M6 2h8l5 5v14a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1Z",
        "M14 2v6h5M8 12h8M8 16h8",
      ],
    },
  },
];
