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
      "I developed features, introduced localisation, migrated users from the previous platform and helped maintain CinEd over several years. The multilingual film-education platform serves 3,000+ users across 12+ countries.",
    image: "assets/cined-composition.png",
    alt: "CinEd film education platform shown in layered screen views",
    theme: "blue",
  },
  {
    name: "XReco",
    subtitle: "Making XR media discoverable",
    description:
      "I was the main contributor to XReco’s core web application, connecting asset upload, multimodal search, AI-generated metadata, 3D reconstruction and licensing workflows into one product.",
    image: "assets/xreco-composition.png",
    alt: "XReco media discovery platform shown across layered screens",
    theme: "green",
  },
  {
    name: "TRUE",
    subtitle: "A newsroom for every school",
    description:
      "As a full-stack developer and technical coordinator, I helped build the editorial tools, dashboards and publishing workflows used by students and teachers in 200+ Portuguese schools.",
    image: "assets/true-composition.png",
    alt: "TRUE school newsroom and publishing platform shown in layered screens",
    theme: "blue",
  },
];
