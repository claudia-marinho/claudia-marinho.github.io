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
    subtitle: "projects.cined.subtitle",
    description: "projects.cined.description",
    image: "assets/cined-composition.png",
    alt: "projects.cined.alt",
    theme: "blue",
  },
  {
    name: "XReco",
    subtitle: "projects.xreco.subtitle",
    description: "projects.xreco.description",
    image: "assets/xreco-composition.png",
    alt: "projects.xreco.alt",
    theme: "green",
  },
  {
    name: "TRUE",
    subtitle: "projects.true.subtitle",
    description: "projects.true.description",
    image: "assets/true-composition.png",
    alt: "projects.true.alt",
    theme: "blue",
  },
];
