'use client';

import { useEffect, useState } from 'react';
import { FaSpotify } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

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
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNowPlaying = async () => {
      try {
        console.log('Fetching now playing data...');
        const response = await fetch('/api/spotify');
        const data = await response.json();
        console.log('Now playing response:', data);

        if (data.error) {
          console.error('Error in now playing data:', data.error);
          setError(data.error);
          setNowPlaying(null);
          return;
        }

        setNowPlaying(data);
        setError(null);
      } catch (err) {
        console.error('Failed to fetch Spotify data:', err);
        setError('Failed to fetch Spotify data');
        setNowPlaying(null);
      }
    };

    fetchNowPlaying();
    const interval = setInterval(fetchNowPlaying, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-10 md:px-40">
      <div>
        <p className="bg-grad">Now Playing</p>
        <div className="pt-5">
          {error ? (
            <div className="flex items-center justify-center p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <FaSpotify className="w-5 h-5 text-red-500 mr-2" />
              <span className="text-red-500">{error}</span>
            </div>
          ) : !nowPlaying ? (
            <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg animate-pulse">
              <FaSpotify className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400">Loading...</span>
            </div>
          ) : !nowPlaying.isPlaying ? (
            <div className="flex items-center justify-center p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
              <FaSpotify className="w-5 h-5 text-gray-400 mr-2" />
              <span className="text-gray-400">Not playing anything right now</span>
            </div>
          ) : (
            <AnimatePresence>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-lg blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative flex items-center space-x-4 p-4 bg-white/10 dark:bg-gray-800/50 backdrop-blur-sm rounded-lg border border-gray-200/20 dark:border-gray-700/50 hover:border-green-500/50 dark:hover:border-green-500/50 transition-all duration-300">
                  {nowPlaying.item?.album.images[0] && (
                    <motion.img
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3 }}
                      src={nowPlaying.item.album.images[0].url}
                      alt={nowPlaying.item.album.name}
                      className="w-16 h-16 rounded-lg shadow-lg"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <a
                      href={nowPlaying.item?.external_urls.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <div className="flex items-center space-x-2">
                        <FaSpotify className="w-4 h-4 text-green-500" />
                        <span className="text-sm text-green-500 font-medium">Now Playing</span>
                      </div>
                      <h3 className="font-bold text-gray-900 dark:text-white truncate">
                        {nowPlaying.item?.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 truncate">
                        {nowPlaying.item?.artists}
                      </p>
                      <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                        {nowPlaying.item?.album.name}
                      </p>
                    </a>
                  </div>
                  <div className="flex items-center">
                    <div className="flex space-x-1">
                      <div className="w-1 h-3 bg-green-500 rounded-full animate-[music_1s_ease-in-out_infinite]" />
                      <div className="w-1 h-3 bg-green-500 rounded-full animate-[music_1s_ease-in-out_infinite_0.2s]" />
                      <div className="w-1 h-3 bg-green-500 rounded-full animate-[music_1s_ease-in-out_infinite_0.4s]" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
} 