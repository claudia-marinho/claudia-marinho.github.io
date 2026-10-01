import { useState } from "react";
import Rays from "@/components/Rays/Rays";
import PostcardDialog from "@/components/Postcards/PostcardDialog";
import PostcardTrigger from "@/components/Postcards/PostcardTrigger";
import type { PostcardKey } from "@/components/Postcards/postcards.data";
import "@/components/About/About.css";

export default function About() {
  const [postcard, setPostcard] = useState<PostcardKey | null>(null);

  return (
    <section className="about split" id="about" aria-labelledby="about-heading">
      <div className="about-image">
        <img
          src="assets/about.jpg"
          alt="Cláudia seated on a mountain slope looking towards the Alps"
          loading="lazy"
        />
      </div>
      <div className="about-copy panel">
        <div className="about-title-group">
          <h2 id="about-heading">
            A{" "}
            <span className="word-anchor about-word">
              BIT
              <Rays className="about-rays" />
            </span>
            <br />
            ABOUT ME
          </h2>
        </div>
        <p>
          I’m a software engineer with 7+ years of experience and a strong
          frontend focus. I like building products that feel good to use and
          make sense under the hood. My work spans interfaces, APIs and taking
          features into production.
        </p>
        <p>
          I care about thoughtful UX, maintainable code, and working with people
          who value clarity and collaboration.
        </p>
        <p>
          Away from the keyboard, you’ll usually find me thinking about
          mountains
          <PostcardTrigger postcard="mountains" onOpen={setPostcard} />,
          planning a trip to Japan
          <PostcardTrigger postcard="japan" onOpen={setPostcard} />, or
          listening to metal
          <PostcardTrigger postcard="metal" onOpen={setPostcard} />.
        </p>
      </div>
      <PostcardDialog postcard={postcard} onClose={() => setPostcard(null)} />
    </section>
  );
}
