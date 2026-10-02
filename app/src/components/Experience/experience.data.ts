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
    dates: "experience.evs.dates",
    logo: { src: "assets/evs-logo.png", alt: "experience.evs.alt" },
    roles: [
      {
        id: "engineer-iii",
        title: "experience.engineerIII.title",
        dates: "experience.engineerIII.dates",
        description: "experience.engineerIII.description",
      },
      {
        id: "engineer-ii",
        title: "experience.engineerII.title",
        dates: "experience.engineerII.dates",
        description: "experience.engineerII.description",
      },
    ],
  },
  {
    id: "mog",
    nameLines: ["MOG Technologies"],
    dates: "experience.mog.dates",
    logo: { src: "assets/mog-logo.jpg", alt: "experience.mog.alt" },
    roles: [
      {
        id: "engineer-project-manager",
        title: "experience.manager.title",
        dates: "experience.manager.dates",
        description: "experience.manager.description",
      },
      {
        id: "engineer-junior-project-manager",
        title: "experience.juniorManager.title",
        dates: "experience.juniorManager.dates",
        description: "experience.juniorManager.description",
      },
      {
        id: "junior-engineer",
        title: "experience.junior.title",
        dates: "experience.junior.dates",
        description: "experience.junior.description",
      },
    ],
  },
];
