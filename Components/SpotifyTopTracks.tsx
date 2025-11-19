'use client';

import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { motion } from 'motion/react';
import Image from 'next/image';

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

export default function SpotifyTopTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchTopTracks = async () => {
      try {
        const response = await fetch('/api/spotify?type=top-tracks');
        if (response.ok) {
          const data = await response.json();
          setTracks(data.tracks);
        }
      } catch (err) {
        console.error('Error fetching top tracks:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTopTracks();
  }, []);

  if (isLoading) return null;

  return (
    <div className="w-full">
      <div className="flex items-center gap-2 mb-6 opacity-60">
        <FaSpotify className="text-xl" />
        <h2 className="text-lg font-medium">Top Tracks</h2>
      </div>

      <div className="grid grid-cols-1 gap-2">
        {tracks.slice(0, 5).map((track, index) => (
          <motion.a
            key={track.name}
            href={track.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors group bw-hover"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <span className="text-white/20 font-mono text-sm w-4 text-right group-hover:text-white/40 transition-colors">{index + 1}</span>

            <div className="relative w-10 h-10 rounded overflow-hidden flex-shrink-0 transition-all duration-500">
              {track.album.images[0] && (
                <Image
                  src={track.album.images[0].url}
                  alt={track.album.name}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-medium text-white/90 truncate group-hover:text-white transition-colors">{track.name}</h3>
              <p className="text-xs text-white/50 truncate group-hover:text-white/70 transition-colors">{track.artists}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
} 