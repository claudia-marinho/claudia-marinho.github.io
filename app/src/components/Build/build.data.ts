// Each capability keeps its copy, colour, and SVG geometry together.
// All icons share the same 32 × 32 viewBox and styling in Build.css.
type Capability = {
  id: string;
  title: string;
  description: string;
  technologies?: string;
  icon: {
    colour: "blue" | "lime";
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

export const capabilities: Capability[] = [
  {
    id: "frontend",
    title: "build.frontend.title",
    description: "build.frontend.description",
    technologies: "React · Next.js · TypeScript · HTML/CSS",
    icon: {
      colour: "blue",
      rectangles: [{ x: 3, y: 5, width: 26, height: 22, rx: 2 }],
      paths: ["M3 11h26M13 16l-4 4 4 4m6-8 4 4-4 4"],
    },
  },
  {
    id: "backend",
    title: "build.backend.title",
    description: "build.backend.description",
    technologies: "Node.js · Express · GraphQL · REST · Python",
    icon: {
      colour: "lime",
      rectangles: [
        { x: 3, y: 7, width: 10, height: 7, rx: 1 },
        { x: 19, y: 7, width: 10, height: 7, rx: 1 },
        { x: 11, y: 21, width: 10, height: 7, rx: 1 },
      ],
      paths: ["M8 14v4h8v3m8-7v4h-8"],
    },
  },
  {
    id: "delivery",
    title: "build.delivery.title",
    description: "build.delivery.description",
    technologies: "Docker · Kubernetes · Helm · CI/CD",
    icon: {
      colour: "blue",
      paths: ["M16 3v18m-6-6 6 6 6-6M5 23v5h22v-5"],
    },
  },
  {
    id: "guidance",
    title: "build.guidance.title",
    description: "build.guidance.description",
    icon: {
      colour: "lime",
      paths: ["M6 7h20v15H15l-6 5v-5H6zM11 12h10m-10 5h7"],
    },
  },
];
