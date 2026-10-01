import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { postcards, type PostcardKey } from "@/components/About/postcards.data";
import "@/components/About/PostcardDialog.css";

export default function PostcardDialog({
  postcard,
  onClose,
}: {
  postcard: PostcardKey | null;
  onClose: () => void;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const locationId = useId();
  const photo = postcard ? postcards[postcard] : null;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!postcard || !dialog) return;
    const opener =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    const scrollPosition = { left: window.scrollX, top: window.scrollY };
    dialog.showModal();
    document.documentElement.classList.add("postcard-open");
    window.scrollTo({ ...scrollPosition, behavior: "instant" });
    return () => {
      dialog.close();
      document.documentElement.classList.remove("postcard-open");
      opener?.focus({ preventScroll: true });
      window.scrollTo({ ...scrollPosition, behavior: "instant" });
    };
  }, [postcard]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="postcard-dialog"
      aria-labelledby={captionId}
      aria-describedby={locationId}
      onClose={onClose}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        if (
          event.clientX < bounds.left ||
          event.clientX > bounds.right ||
          event.clientY < bounds.top ||
          event.clientY > bounds.bottom
        ) {
          event.currentTarget.close();
        }
      }}
    >
      <button
        className="postcard-close"
        type="button"
        aria-label="Close photo"
        onClick={() => dialogRef.current?.close()}
      >
        ×
      </button>
      {photo && (
        <figure className="postcard">
          <img src={`assets/postcard-${postcard}.jpg`} alt={photo.alt} />
          <figcaption id={captionId}>{photo.caption}</figcaption>
          <p className="postcard-location" id={locationId}>
            {photo.location}
          </p>
        </figure>
      )}
    </dialog>,
    document.body,
  );
}
