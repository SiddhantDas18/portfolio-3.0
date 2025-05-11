'use client';

import { useEffect, useState } from 'react';

export default function SpotifyTest() {
  const [authUrl, setAuthUrl] = useState<string>('');
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const getAuthUrl = async () => {
      try {
        const response = await fetch('/api/spotify/auth');
        const data = await response.json();
        if (data.error) {
          setError(data.error);
        } else {
          setAuthUrl(data.authUrl);
        }
      } catch (err) {
        setError('Failed to get authorization URL');
      }
    };

    getAuthUrl();
  }, []);

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Spotify Token Setup</h1>
        
        {error ? (
          <div className="bg-red-900/20 p-4 rounded-lg mb-6">
            <p className="text-red-500">{error}</p>
          </div>
        ) : authUrl ? (
          <div className="space-y-6">
            <p className="text-gray-300">
              Click the button below to authorize Spotify access. You'll be redirected to Spotify to grant permissions.
            </p>
            <a
              href={authUrl}
              className="inline-block bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors"
            >
              Authorize Spotify
            </a>
          </div>
        ) : (
          <div className="animate-pulse">
            <p className="text-gray-400">Loading...</p>
          </div>
        )}

        <div className="mt-8 p-4 bg-gray-800/50 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Instructions:</h2>
          <ol className="list-decimal list-inside space-y-2 text-gray-300">
            <li>Click the "Authorize Spotify" button above</li>
            <li>Log in to your Spotify account if prompted</li>
            <li>Grant the requested permissions</li>
            <li>You'll be redirected back to this page with your tokens</li>
            <li>Copy the refresh_token value</li>
            <li>Add it to your .env.local file as SPOTIFY_REFRESH_TOKEN</li>
          </ol>
        </div>
      </div>
    </div>
  );
} 