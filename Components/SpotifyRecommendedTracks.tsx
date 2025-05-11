'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSpotify, FaSearch } from 'react-icons/fa';

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

export default function SpotifyRecommendedTracks() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/spotify/search?q=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch tracks');
      }
      const data = await response.json();
      setTracks(data.tracks);
    } catch (err) {
      setError('Failed to search tracks');
      console.error('Search error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-[#1DB954]/5 rounded-xl p-4 sm:p-6 space-y-4">
      <div className="flex items-center gap-2 text-[#1DB954]">
        <FaSpotify className="text-2xl" />
        <h2 className="text-xl font-bold">Search Tracks</h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for songs or artists..."
          className="flex-1 px-4 py-2 rounded-lg bg-[#1DB954]/10 border border-[#1DB954]/20 focus:outline-none focus:border-[#1DB954] text-white placeholder-gray-400"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-[#1DB954] text-white rounded-lg hover:bg-[#1DB954]/90 transition-colors flex items-center justify-center gap-2"
        >
          <FaSearch />
          <span className="hidden sm:inline">Search</span>
        </button>
      </form>

      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#1DB954]"></div>
        </div>
      )}

      {error && (
        <div className="p-4 bg-red-500/10 rounded-lg text-red-500">
          <p>{error}</p>
        </div>
      )}

      {tracks.length > 0 && (
        <div className="grid gap-4 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
          {tracks.map((track, index) => (
            <motion.a
              key={track.name}
              href={track.external_urls.spotify}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 sm:p-4 bg-[#1DB954]/5 hover:bg-[#1DB954]/10 rounded-lg transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0">
                {track.album.images[0] && (
                  <img
                    src={track.album.images[0].url}
                    alt={track.album.name}
                    className="w-full h-full object-cover rounded"
                  />
                )}
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded opacity-0 hover:opacity-100 transition-opacity">
                  <FaSpotify className="text-[#1DB954] text-lg sm:text-xl" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className="font-medium truncate text-sm sm:text-base">{track.name}</h3>
                <p className="text-xs sm:text-sm text-gray-500 truncate">{track.artists}</p>
                <p className="text-xs text-gray-400 truncate">{track.album.name}</p>
              </div>
            </motion.a>
          ))}
        </div>
      )}

      {!isLoading && !error && tracks.length === 0 && searchQuery && (
        <div className="text-center text-gray-400 py-8">
          No tracks found for "{searchQuery}"
        </div>
      )}
    </div>
  );
} 