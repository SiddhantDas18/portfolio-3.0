import SpotifyNowPlaying from "@/Components/SpotifyNowPlaying";
import TypingEffect from "@/Components/TypingEffect";
import HeroElement from "@/Sections/Hero";
import Projects from "@/Sections/Projects";
import SpotifyTopTracks from '@/Components/SpotifyTopTracks';


export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8">
        <HeroElement/>
        <Projects/>
      </div>
      
      {/* TypingEffect outside the container to take full width */}
      <div className="w-full">
        <TypingEffect/>
      </div>
      

      <div className="w-full max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8 mt-8">
        <SpotifyNowPlaying/>
      </div>
      

      <div className="w-full max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8 mt-8">
        <div className="flex justify-center">
          <div className="flex flex-col gap-8 w-full max-w-xl">
            <SpotifyTopTracks />
          </div>
        </div>
      </div>
    </main>
  );
}
