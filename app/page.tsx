import Spotify from "@/Components/Spotify";
import TypingEffect from "@/Components/TypingEffect";
import HeroElement from "@/Sections/Hero";
import Projects from "@/Sections/Projects";

export default function Home() {
  return (
    <>
      <div>
        <HeroElement/>
        <Projects/>
        <Spotify/>
        <TypingEffect/>
      </div>
    </>
  );
}
