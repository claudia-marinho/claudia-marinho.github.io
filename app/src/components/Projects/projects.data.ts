export interface Project {
  name: string;
  subtitle: string;
  description: string;
  image: string;
  alt: string;
  theme: "blue" | "green";
}
export const projects: readonly Project[] = [
  {
    name: "CinEd",
    subtitle: "European cinema in classrooms",
    description:
      "I worked on CinEd over several years, developing features, adding localisation and migrating users from the previous platform. It’s a multilingual film-education platform serving 3,000+ users across 12+ countries.",
    image: "assets/cined-composition.png",
    alt: "CinEd film education platform shown in layered screen views",
    theme: "blue",
  },
  {
    name: "XReco",
    subtitle: "Finding and working with XR media",
    description:
      "I was the main contributor to XReco’s core web application. My work brought together asset uploads, multimodal search, AI-generated metadata, 3D reconstruction and licensing workflows.",
    image: "assets/xreco-composition.png",
    alt: "XReco media discovery platform shown across layered screens",
    theme: "green",
  },
  {
    name: "TRUE",
    subtitle: "A newsroom for every school",
    description:
      "I worked as a full-stack developer and technical coordinator on TRUE, building editorial tools, dashboards and publishing workflows for students and teachers in 200+ Portuguese schools.",
    image: "assets/true-composition.png",
    alt: "TRUE school newsroom and publishing platform shown in layered screens",
    theme: "blue",
  },
];
