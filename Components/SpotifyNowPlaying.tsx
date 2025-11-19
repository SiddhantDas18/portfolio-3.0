'use client';

import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { motion, AnimatePresence } from 'motion/react';
import Image from 'next/image';

interface NowPlaying {
  isPlaying: boolean;
  error?: string;
  item?: {
    name: string;
    artists: string;
    album: {
      name: string;
      images: { url: string }[];
    };
    external_urls: {
      spotify: string;
    };
  };
}

export default function SpotifyNowPlaying() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        const response = await fetch('/api/spotify');
        if (response.ok) {
          const data = await response.json();
          if (!data.error) setNowPlaying(data);
        }
      } catch (err) {
        console.error('Failed to fetch Spotify data:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 10000);
    return () => clearInterval(interval);
  }, []);

  if (isLoading || !nowPlaying?.isPlaying) return null;

  return (
    <section className="py-10 px-6 md:px-20 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm bw-hover"
      >
        <div className="flex items-center gap-4">
          <div className="relative w-12 h-12 rounded-lg overflow-hidden">
            {nowPlaying.item?.album.images[0] && (
              <Image
                src={nowPlaying.item.album.images[0].url}
                alt={nowPlaying.item.album.name}
                fill
                className="object-cover animate-[spin_10s_linear_infinite]"
              />
            )}
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <FaSpotify className="w-4 h-4 text-[#1DB954]" />
              <span className="text-xs font-medium text-[#1DB954] uppercase tracking-wider">Now Playing</span>
            </div>
            <a
              href={nowPlaying.item?.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <h3 className="text-sm font-medium text-white group-hover:underline decoration-white/30 underline-offset-2">
                {nowPlaying.item?.name}
              </h3>
              <p className="text-xs text-white/50">
                {nowPlaying.item?.artists}
              </p>
            </a>
          </div>
        </div>

        <div className="flex gap-1 items-end h-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="w-1 bg-[#1DB954] rounded-full"
              animate={{
                height: ["20%", "100%", "20%"],
              }}
              transition={{
                duration: 0.8,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
} 