'use client';

import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { motion } from 'framer-motion';

interface Track {
  name: string;
  artists: string;
  album: {
    name: string;
    images: { url: string }[];
  };
  external_urls: {
    spotify: string;
  };
}

interface TracksResponse {
  tracks: Track[];
}

interface ArtistSection {
  title: string;
  query: string;
}

const artistSections: ArtistSection[] = [
  { title: "KK's Top Tracks", query: "artist:KK" },
  { title: "Sunidhi Chauhan's Songs", query: "artist:Sunidhi Chauhan" }
];

export default function SpotifyArtistTracks() {
  const [tracksByArtist, setTracksByArtist] = useState<Record<string, Track[]>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArtistTracks = async () => {
      try {
        const tracksData: Record<string, Track[]> = {};
        
        for (const section of artistSections) {
          const response = await fetch(`/api/spotify?type=search&query=${encodeURIComponent(section.query)}`);
          const data = await response.json();
          
          if (!response.ok) {
            throw new Error(data.error?.message || data.details || `Failed to fetch ${section.title}`);
          }

          tracksData[section.title] = data.tracks;
        }

        setTracksByArtist(tracksData);
      } catch (err) {
        console.error('Error fetching artist tracks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load artist tracks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtistTracks();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-4 bg-[#1DB954]/10 rounded-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1DB954]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-500/10 rounded-lg text-red-500">
        <p>Error: {error}</p>
      </div>
    );
  }

  // Combine all tracks into a single array
  const allTracks = artistSections.flatMap(section => 
    tracksByArtist[section.title]?.map(track => ({
      ...track,
      section: section.title
    })) || []
  );

  return (
    <div className="bg-[#1DB954]/5 rounded-xl p-6 space-y-4">
      <div className="flex items-center gap-2 text-[#1DB954]">
        <FaSpotify className="text-2xl" />
        <h2 className="text-xl font-bold">Recommended Tracks</h2>
      </div>
      
      <div className="grid gap-4 max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
        {allTracks.map((track, index) => (
          <motion.a
            key={`${track.section}-${track.name}`}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-4 bg-[#1DB954]/5 hover:bg-[#1DB954]/10 rounded-lg transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="relative w-12 h-12 flex-shrink-0">
              {track.album.images[0] && (
                <img
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  className="w-full h-full object-cover rounded"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 hover:opacity-100 transition-opacity">
                <FaSpotify className="text-[#1DB954] text-xl" />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <h3 className="font-medium truncate">{track.name}</h3>
              <p className="text-sm text-gray-500 truncate">{track.artists}</p>
              <p className="text-xs text-gray-400 truncate">{track.album.name}</p>
              <p className="text-xs text-[#1DB954] mt-1">{track.section}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 