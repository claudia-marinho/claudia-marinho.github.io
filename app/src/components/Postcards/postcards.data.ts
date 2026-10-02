export const postcards = {
  mountains: {
    label: "postcards.mountains.label",
    caption: "postcards.mountains.caption",
    alt: "postcards.mountains.alt",
    location: "postcards.mountains.location",
    paths: ["m3 25 11-18 7 11 5-7 9 14H3Z", "m10 13 4 3 4-3"],
  },
  japan: {
    label: "postcards.japan.label",
    caption: "postcards.japan.caption",
    alt: "postcards.japan.alt",
    location: "postcards.japan.location",
    paths: [
      "M19 17C9 5 5 15 13 20 0 24 11 33 18 25 20 39 31 30 25 23 39 23 33 11 25 16 31 3 18 3 19 17Z",
    ],
  },
  metal: {
    label: "postcards.metal.label",
    caption: "postcards.metal.caption",
    alt: "postcards.metal.alt",
    location: "postcards.metal.location",
    paths: [
      "M10 22V7a3 3 0 0 1 6 0v11-3a3 3 0 0 1 6 0v3-2a3 3 0 0 1 6 0V7a3 3 0 0 1 6 0v19c0 8-5 12-12 12-5 0-8-3-10-7l-6-8a3 3 0 0 1 4-4l6 5",
    ],
  },
} as const;

export type PostcardKey = keyof typeof postcards;
