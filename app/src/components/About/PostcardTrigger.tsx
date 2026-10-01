import { postcards, type PostcardKey } from "@/components/About/postcards.data";
import "@/components/About/PostcardTrigger.css";

export default function PostcardTrigger({
  postcard,
  onOpen,
}: {
  postcard: PostcardKey;
  onOpen: (postcard: PostcardKey) => void;
}) {
  const photo = postcards[postcard];
  return (
    <button
      className="hidden-postcard-trigger"
      type="button"
      aria-label={photo.label}
      aria-haspopup="dialog"
      onClick={() => onOpen(postcard)}
    >
      <svg viewBox="0 0 42 42" aria-hidden="true">
        {photo.paths.map((path) => (
          <path key={path} d={path} />
        ))}
        {postcard === "japan" && <circle cx="21" cy="21" r="2" />}
      </svg>
    </button>
  );
}
