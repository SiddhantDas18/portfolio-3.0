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
const TOP_TRACKS_ENDPOINT = 'https://api.spotify.com/v1/me/top/tracks?limit=10&time_range=short_term';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';

async function getAccessToken() {
  try {
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', refresh_token as string);

    const response = await fetch(TOKEN_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params,
    });

    if (!response.ok) {
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function getNowPlaying() {
  try {

    const { access_token } = await getAccessToken();

    if (!access_token) {
      console.error('No access token available');
      return NextResponse.json({ isPlaying: false, error: 'No access token' });
    }



    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });



    if (response.status === 204) {

      return NextResponse.json({ isPlaying: false });
    }

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Failed to fetch now playing:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText
      });
      return NextResponse.json({ 
        isPlaying: false, 
        error: `Failed to fetch now playing: ${response.status} ${response.statusText}` 
      });
    }

    const song = await response.json();


    if (!song?.item) {

      return NextResponse.json({ isPlaying: false });
    }

    if (!song.is_playing) {

      return NextResponse.json({ isPlaying: false });
    }

    const formattedResponse = {
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


    return NextResponse.json(formattedResponse);

  } catch (error) {
    console.error('Error in getNowPlaying:', error);
    return NextResponse.json({ 
      isPlaying: false, 
      error: error instanceof Error ? error.message : 'Unknown error occurred'
    });
  }
}

async function getTopTracks() {
  try {

    const { access_token } = await getAccessToken();

    if (!access_token) {
      throw new Error('No access token available');
    }

    const response = await fetch(TOP_TRACKS_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch top tracks: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();


    if (!data.items || !Array.isArray(data.items)) {
      throw new Error('Invalid response format from Spotify API');
    }

    return NextResponse.json({
      tracks: data.items.map((track: any) => ({
        name: track.name,
        artists: track.artists.map((artist: any) => artist.name).join(', '),
        album: {
          name: track.album.name,
          images: track.album.images
        },
        external_urls: {
          spotify: track.external_urls.spotify
        }
      }))
    });
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return NextResponse.json(
      { 
        error: 'Failed to fetch top tracks',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

async function searchTracks(query: string) {
  try {

    const { access_token } = await getAccessToken();

    if (!access_token) {
      throw new Error('No access token available');
    }

    const searchUrl = new URL(SEARCH_ENDPOINT);
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('type', 'track');
    searchUrl.searchParams.append('limit', '10');

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to search tracks: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();


    return NextResponse.json({
      tracks: data.tracks.items.map((track: any) => ({
        name: track.name,
        artists: track.artists.map((artist: any) => artist.name).join(', '),
        album: {
          name: track.album.name,
          images: track.album.images
        },
        external_urls: {
          spotify: track.external_urls.spotify
        }
      }))
    });
  } catch (error) {
    console.error('Error searching tracks:', error);
    return NextResponse.json(
      { 
        error: 'Failed to search tracks',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const query = searchParams.get('query');



    if (type === 'top-tracks') {
      return getTopTracks();
    }

    if (type === 'search' && query) {
      return searchTracks(query);
    }

    // Default to now playing
    return getNowPlaying();
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