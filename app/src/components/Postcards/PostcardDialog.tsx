import { useTranslation } from "react-i18next";
import { useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import PostcardPhoto from "@/components/Postcards/PostcardPhoto";
import {
  postcards,
  type PostcardKey,
} from "@/components/Postcards/postcards.data";
import "@/components/Postcards/PostcardDialog.css";

export default function PostcardDialog({
  postcard,
  onClose,
}: {
  postcard: PostcardKey | null;
  onClose: () => void;
}) {
  const { t } = useTranslation();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const captionId = useId();
  const locationId = useId();
  const photo = postcard ? postcards[postcard] : null;

  useEffect(() => {
    const dialog = dialogRef.current;

    // A null postcard means the dialog should remain closed.
    if (!postcard || !dialog) return;

    // Save the reader's place before the browser moves focus into the modal.
    const focusedElement = document.activeElement;
    const triggerToRestore =
      focusedElement instanceof HTMLElement ? focusedElement : null;

    const savedScrollPosition = { left: window.scrollX, top: window.scrollY };
    const restoreScrollPosition = () => {
      window.scrollTo({ ...savedScrollPosition, behavior: "instant" });
    };

    // showModal provides focus trapping and Escape dismissal. The CSS class
    // locks background scrolling; restore the position after focus has moved.
    dialog.showModal();
    document.documentElement.classList.add("postcard-open");
    restoreScrollPosition();

    return () => {
      // Closing or changing the postcard releases the lock and returns the
      // reader to the same trigger and scroll position, without smooth scrolling.
      dialog.close();
      document.documentElement.classList.remove("postcard-open");

      triggerToRestore?.focus({ preventScroll: true });
      restoreScrollPosition();
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
        aria-label={t("postcards.close")}
        onClick={() => dialogRef.current?.close()}
      >
        ×
      </button>
      {photo && (
        <figure className="postcard">
          {/* A new postcard starts with its own loading state, including reopening. */}
          <PostcardPhoto
            key={postcard}
            src={`assets/postcard-${postcard}.jpg`}
            alt={t(photo.alt)}
          />
          <figcaption id={captionId}>{t(photo.caption)}</figcaption>
          <p className="postcard-location" id={locationId}>
            {t(photo.location)}
          </p>
        </figure>
      )}
    </dialog>,
    document.body,
  );
}
