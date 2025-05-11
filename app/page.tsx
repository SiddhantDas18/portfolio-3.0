import SpotifyNowPlaying from "@/Components/SpotifyNowPlaying";
import TypingEffect from "@/Components/TypingEffect";
import HeroElement from "@/Sections/Hero";
import Projects from "@/Sections/Projects";
import SpotifyTopTracks from '@/Components/SpotifyTopTracks';
import SpotifyRecommendedTracks from '@/Components/SpotifyRecommendedTracks';
import SpotifyArtistTracks from '@/Components/SpotifyArtistTracks';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="w-full max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8">
        <HeroElement/>
        <Projects/>
        <SpotifyNowPlaying/>
      </div>
      
      {/* TypingEffect outside the container to take full width */}
      <div className="w-full">
        <TypingEffect/>
      </div>
      
      <div className="w-full max-w-[1400px] px-3 sm:px-4 md:px-6 lg:px-8 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8">
          <SpotifyArtistTracks />
          <SpotifyRecommendedTracks />
        </div>
      </div>
    </main>
  );
}
