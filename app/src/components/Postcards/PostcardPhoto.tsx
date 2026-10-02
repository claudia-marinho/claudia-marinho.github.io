import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function PostcardPhoto({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  const { t } = useTranslation();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading",
  );

  return (
    <div className={`postcard-photo postcard-photo-${status}`}>
      {/* Keep feedback visible until the browser has loaded the photo. */}
      {status !== "ready" && (
        <div className="postcard-placeholder" role="status">
          {status === "loading" ? t("postcards.loading") : t("postcards.error")}
        </div>
      )}

      <img
        src={src}
        alt={alt}
        onLoad={() => setStatus("ready")}
        onError={() => setStatus("error")}
      />
    </div>
  );
}
