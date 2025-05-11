import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

// Validate environment variables
if (!client_id || !client_secret || !refresh_token) {
  console.error('Missing Spotify credentials:', {
    hasClientId: !!client_id,
    hasClientSecret: !!client_secret,
    hasRefreshToken: !!refresh_token
  });
  throw new Error('Missing required Spotify credentials');
}

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

async function getAccessToken() {
  try {
    console.log('Getting access token...');
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token as string);

    console.log('Request details:', {
      endpoint: TOKEN_ENDPOINT,
      hasClientId: !!client_id,
      hasClientSecret: !!client_secret,
      hasRefreshToken: !!refresh_token,
      refreshTokenLength: refresh_token?.length
    });

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to get access token:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        headers: Object.fromEntries(response.headers.entries())
      });
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    console.log('Successfully obtained access token');
    return data;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function getNowPlaying() {
  try {
    console.log('Fetching now playing...');
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 30 }, // Cache for 30 seconds
    });

    if (response.status === 204) {
      console.log('No track currently playing');
      return { isPlaying: false };
    }

    if (!response.ok) {
      const error = await response.text();
      console.error('Failed to fetch now playing:', {
        status: response.status,
        statusText: response.statusText,
        error
      });
      throw new Error(`Failed to fetch now playing: ${response.status} ${response.statusText}`);
    }

    const song = await response.json();
    console.log('Successfully fetched now playing:', {
      isPlaying: !!song?.item,
      trackName: song?.item?.name
    });

    if (!song?.item) {
      return { isPlaying: false };
    }

    return {
      isPlaying: true,
      item: {
        name: song.item.name,
        artists: song.item.artists.map((artist: any) => artist.name).join(', '),
        album: {
          name: song.item.album.name,
          images: song.item.album.images
        },
        external_urls: {
          spotify: song.item.external_urls.spotify
        }
      }
    };
  } catch (error) {
    console.error('Error fetching now playing:', error);
    throw error;
  }
}

export async function GET() {
  try {
    console.log('Handling GET request for now playing');
    const nowPlaying = await getNowPlaying();
    return NextResponse.json(nowPlaying);
  } catch (error) {
    console.error('Error in API route:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch Spotify data',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
} 