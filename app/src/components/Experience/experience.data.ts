// Companies and their roles are listed newest first, matching the timeline.
type ExperienceRole = {
  id: string;
  title: string;
  dates: string;
  description: string;
};

type Company = {
  id: string;
  // Separate lines preserve the intended company heading layout.
  nameLines: string[];
  dates: string;
  logo: { src: string; alt: string };
  roles: ExperienceRole[];
};

export const companies: Company[] = [
  {
    id: "evs",
    nameLines: ["EVS Broadcast", "Equipment"],
    dates: "November 2024–present",
    logo: { src: "assets/evs-logo.png", alt: "EVS logo" },
    roles: [
      {
        id: "engineer-iii",
        title: "Software Engineer III",
        dates: "April 2026–present",
        description:
          "Building interfaces and Backend-for-Frontend services for professional broadcast products with React, TypeScript and GraphQL.",
      },
      {
        id: "engineer-ii",
        title: "Software Engineer II",
        dates: "November 2024–March 2026",
        description:
          "Worked across XR and sustainable streaming projects, from frontend features and backend integrations to Kubernetes deployments.",
      },
    ],
  },
  {
    id: "mog",
    nameLines: ["MOG Technologies"],
    dates: "January 2019–October 2024",
    logo: { src: "assets/mog-logo.jpg", alt: "MOG Technologies logo" },
    roles: [
      {
        id: "engineer-project-manager",
        title: "Software Engineer & Technical Project Manager",
        dates: "October 2021–October 2024",
        description:
          "Built media, education and streaming platforms while contributing to technical direction, project coordination and mentoring.",
      },
      {
        id: "engineer-junior-project-manager",
        title: "Software Engineer & Junior Technical Project Manager",
        dates: "January 2020–September 2021",
        description:
          "Developed web platforms, dashboards and digital marketplaces across European research projects.",
      },
      {
        id: "junior-engineer",
        title: "Junior Software Engineer",
        dates: "2019",
        description:
          "Built a real-time messaging platform for my Master’s thesis, later integrated into research projects.",
      },
    ],
  },
];
