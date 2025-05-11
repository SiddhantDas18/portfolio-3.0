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

interface TopTracksResponse {
  tracks: Track[];
}

export default function SpotifyTopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch('/api/spotify?type=top-tracks');
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error?.message || data.details || 'Failed to fetch top tracks');
        }

        setTracks(data.tracks);
      } catch (err) {
        console.error('Error fetching top tracks:', err);
        setError(err instanceof Error ? err.message : 'Failed to load top tracks');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
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

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 text-[#1DB954]">
        <FaSpotify className="text-2xl" />
        <h2 className="text-xl font-bold">My Top Tracks</h2>
      </div>
      
      <div className="grid gap-4">
        {tracks.map((track, index) => (
          <motion.a
            key={track.name}
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
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 