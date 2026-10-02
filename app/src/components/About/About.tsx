import { useTranslation } from "react-i18next";
import { useState } from "react";
import Rays from "@/components/Rays/Rays";
import PostcardDialog from "@/components/Postcards/PostcardDialog";
import PostcardTrigger from "@/components/Postcards/PostcardTrigger";
import type { PostcardKey } from "@/components/Postcards/postcards.data";
import "@/components/About/About.css";

export default function About() {
  const { t } = useTranslation();
  const [postcard, setPostcard] = useState<PostcardKey | null>(null);

  return (
    <section className="about split" id="about" aria-labelledby="about-heading">
      <div className="about-image">
        <img src="assets/about.jpg" alt={t("about.alt")} loading="lazy" />
      </div>
      <div className="about-copy panel">
        <div className="about-title-group">
          <h2 id="about-heading">
            {t("about.titleStart")}{" "}
            <span className="word-anchor about-word">
              {t("about.titleAccent")}
              <Rays className="about-rays" />
            </span>
            <br />
            {t("about.titleEnd")}
          </h2>
        </div>
        <p>{t("about.intro")}</p>
        <p>{t("about.values")}</p>
        <p>
          {t("about.mountains")}
          <PostcardTrigger postcard="mountains" onOpen={setPostcard} />,{" "}
          {t("about.japan")}
          <PostcardTrigger postcard="japan" onOpen={setPostcard} />
          {t("about.or")} {t("about.metal")}
          <PostcardTrigger postcard="metal" onOpen={setPostcard} />.
        </p>
      </div>
      <PostcardDialog postcard={postcard} onClose={() => setPostcard(null)} />
    </section>
  );
}
