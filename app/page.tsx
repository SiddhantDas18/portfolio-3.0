import SpotifyNowPlaying from "@/Components/SpotifyNowPlaying";
import TypingEffect from "@/Components/TypingEffect";
import HeroElement from "@/Sections/Hero";
import Projects from "@/Sections/Projects";

export default function Home() {
  return (
    <>
      <div>
        <HeroElement/>
        <Projects/>
        <SpotifyNowPlaying/>
        <TypingEffect/>
      </div>
    </>
  );
}
