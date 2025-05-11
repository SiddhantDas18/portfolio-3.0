'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

interface Track {
  name: string;
  artists: Array<{ name: string }>;
  album: {
    images: Array<{ url: string }>;
  };
  external_urls: {
    spotify: string;
  };
}

interface NowPlaying {
  isPlaying: boolean;
  item?: Track;
  error?: string;
}

export default function Spotify() {
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ isPlaying: false });
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Fetch top tracks
        console.log('Fetching top tracks...');
        const topTracksRes = await fetch('/api/spotify?type=top-tracks');
        if (!topTracksRes.ok) {
          const errorData = await topTracksRes.json();
          throw new Error(`Failed to fetch top tracks: ${errorData.error || topTracksRes.statusText}`);
        }
        const topTracksData = await topTracksRes.json();
        console.log('Top tracks data:', topTracksData);
        setTopTracks(topTracksData.tracks || []);

        // Fetch now playing
        console.log('Fetching now playing...');
        const nowPlayingRes = await fetch('/api/spotify?type=now-playing');
        if (!nowPlayingRes.ok) {
          const errorData = await nowPlayingRes.json();
          throw new Error(`Failed to fetch now playing: ${errorData.error || nowPlayingRes.statusText}`);
        }
        const nowPlayingData = await nowPlayingRes.json();
        console.log('Now playing data:', nowPlayingData);
        setNowPlaying(nowPlayingData);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
        setError(error instanceof Error ? error.message : 'Failed to load Spotify data');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <section className="py-10 px-10 md:px-40" id="spotify">
        <div>
          <div>
            <p className="bg-grad">Spotify</p>
          </div>
          <div className="pt-5">
            <p className="text-red-500">Error: {error}</p>
            <p className="text-gray-400 mt-2">Please check your Spotify credentials in .env.local file</p>
          </div>
        </div>
      </section>
    );
  }

  if (isLoading) {
    return (
      <section className="py-10 px-10 md:px-40" id="spotify">
        <div>
          <div>
            <p className="bg-grad">Spotify</p>
          </div>
          <div className="pt-5">
            <p>Loading Spotify data...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-10 px-10 md:px-40" id="spotify">
      <div>
        <div>
          <p className="bg-grad">Spotify</p>
        </div>

        <div className="pt-5">
          <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
          {nowPlaying.isPlaying && nowPlaying.item ? (
            <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
              {nowPlaying.item.album.images?.[0] && (
                <Image
                  src={nowPlaying.item.album.images[0].url}
                  alt={nowPlaying.item.name}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
              )}
              <div>
                <a
                  href={nowPlaying.item.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:underline"
                >
                  {nowPlaying.item.name}
                </a>
                <p className="text-gray-400">{nowPlaying.item.artists[0].name}</p>
              </div>
            </div>
          ) : (
            <p className="text-gray-400">Not currently playing</p>
          )}
        </div>

        <div className="pt-5">
          <h2 className="text-2xl font-bold mb-4">Top 10 Tracks</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.isArray(topTracks) && topTracks.length > 0 ? (
              topTracks.map((track, index) => (
                <div key={index} className="bg-gray-800 p-4 rounded-lg">
                  {track.album.images?.[0] && (
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={200}
                      height={200}
                      className="w-full aspect-square object-cover rounded-md mb-2"
                    />
                  )}
                  <a
                    href={track.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium hover:underline block"
                  >
                    {track.name}
                  </a>
                  <p className="text-gray-400 text-sm">{track.artists[0].name}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No top tracks available</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}