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
}

export default function Spotify() {
  const [topTracks, setTopTracks] = useState<Track[]>([]);
  const [nowPlaying, setNowPlaying] = useState<NowPlaying>({ isPlaying: false });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch top tracks
        const topTracksRes = await fetch('/api/spotify?type=top-tracks');
        const topTracksData = await topTracksRes.json();
        setTopTracks(topTracksData.tracks);

        // Fetch now playing
        const nowPlayingRes = await fetch('/api/spotify?type=now-playing');
        const nowPlayingData = await nowPlayingRes.json();
        setNowPlaying(nowPlayingData);
      } catch (error) {
        console.error('Error fetching Spotify data:', error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Update every 30 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-10 px-10 md:px-40" id="spotify">
      <div>
        <div>
          <p className="bg-grad">Spotify</p>
        </div>

        <div className="pt-5">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Now Playing</h2>
            {nowPlaying.isPlaying && nowPlaying.item ? (
              <div className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                <Image
                  src={nowPlaying.item.album.images[0].url}
                  alt={nowPlaying.item.name}
                  width={64}
                  height={64}
                  className="rounded-md"
                />
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

          <div>
            <h2 className="text-2xl font-bold mb-4">Top 10 Tracks</h2>
            <div className="space-y-4">
              {topTracks && topTracks.length > 0 ? (
                topTracks.map((track, index) => (
                  <div key={index} className="flex items-center space-x-4 bg-gray-800 p-4 rounded-lg">
                    <span className="text-xl font-bold w-8">{index + 1}</span>
                    <Image
                      src={track.album.images[0].url}
                      alt={track.name}
                      width={64}
                      height={64}
                      className="rounded-md"
                    />
                    <div>
                      <a
                        href={track.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-medium hover:underline"
                      >
                        {track.name}
                      </a>
                      <p className="text-gray-400">{track.artists[0].name}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No tracks available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}