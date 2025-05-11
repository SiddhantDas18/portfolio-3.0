import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Check if credentials are available
if (!client_id || !client_secret || !refresh_token) {
  console.error('Missing Spotify credentials:', {
    hasClientId: !!client_id,
    hasClientSecret: !!client_secret,
    hasRefreshToken: !!refresh_token
  });
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term';

async function getAccessToken() {
  if (!refresh_token) {
    throw new Error('No refresh token available');
  }

  try {
    console.log('Getting access token...');
    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token,
      }).toString(),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting access token:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log('Successfully got access token');
    return data;
  } catch (error) {
    console.error('Error in getAccessToken:', error);
    throw error;
  }
}

async function getNowPlaying() {
  try {
    console.log('Getting now playing...');
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (response.status === 204) {
      console.log('No active playback');
      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting now playing:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return NextResponse.json({ isPlaying: false, error: 'Failed to get now playing' });
    }

    const song = await response.json();
    console.log('Successfully got now playing:', song.item?.name);
    
    return NextResponse.json({
      isPlaying: true,
      item: {
        name: song.item.name,
        artists: song.item.artists,
        album: {
          images: song.item.album.images
        },
        external_urls: {
          spotify: song.item.external_urls.spotify
        }
      }
    });
  } catch (error) {
    console.error('Error in getNowPlaying:', error);
    return NextResponse.json({ isPlaying: false, error: 'Failed to get now playing' });
  }
}

async function getTopTracks() {
  try {
    console.log('Getting top tracks...');
    const { access_token } = await getAccessToken();

    const response = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Error getting top tracks:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      throw new Error(`Failed to fetch top tracks: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    console.log(`Successfully got ${data.items.length} top tracks`);
    return data.items;
  } catch (error) {
    console.error('Error in getTopTracks:', error);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    console.log('API request type:', type);

    if (type === 'now-playing') {
      return getNowPlaying();
    }

    if (type === 'top-tracks') {
      const tracks = await getTopTracks();
      return NextResponse.json({ tracks });
    }

    return NextResponse.json({ error: 'Invalid type parameter' });
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json({ error: 'Internal server error' });
  }
}
