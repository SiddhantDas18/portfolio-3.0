import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN;

const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
const TOKEN_ENDPOINT = 'https://accounts.spotify.com/api/token';
const SEARCH_ENDPOINT = 'https://api.spotify.com/v1/search';
const NOW_PLAYING_ENDPOINT = 'https://api.spotify.com/v1/me/player/currently-playing';

const artistSections = [
  { title: "KK's Top Tracks", query: "artist:KK" },
  { title: "Sunidhi Chauhan's Songs", query: "artist:Sunidhi Chauhan" }
];

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
      const errorText = await response.text();
      throw new Error(`Failed to get access token: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
}

async function getNowPlaying() {
  try {
    const { access_token } = await getAccessToken();

    const response = await fetch(NOW_PLAYING_ENDPOINT, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 30 }, 
    });

    if (response.status === 204) {
      return { isPlaying: false };
    }

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Failed to fetch now playing: ${response.status} ${response.statusText}`);
    }

    const song = await response.json();

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

async function searchTracks(query: string) {
  try {
    const { access_token } = await getAccessToken();

    const searchUrl = new URL(SEARCH_ENDPOINT);
    searchUrl.searchParams.append('q', query);
    searchUrl.searchParams.append('type', 'track');
    searchUrl.searchParams.append('limit', '10');

    const response = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
      next: { revalidate: 3600 }, 
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to search tracks: ${response.status} ${response.statusText} - ${errorText}`);
    }

    const data = await response.json();
    return data.tracks.items.map((track: any) => ({
      name: track.name,
      artists: track.artists.map((artist: any) => artist.name).join(', '),
      album: {
        name: track.album.name,
        images: track.album.images
      },
      external_urls: {
        spotify: track.external_urls.spotify
      }
    }));
  } catch (error) {
    console.error('Error searching tracks:', error);
    throw error;
  }
}

export async function GET() {
  try {
    const [nowPlaying, recommendations] = await Promise.all([
      getNowPlaying(),
      Promise.all(
        artistSections.map(async (section) => {
          const tracks = await searchTracks(section.query);
          return {
            section: section.title,
            tracks
          };
        })
      )
    ]);

    return NextResponse.json({
      success: true,
      data: {
        nowPlaying,
        recommendations
      }
    });
  } catch (error) {
    console.error('Error in recommendations API:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch recommendations'
      },
      { status: 500 }
    );
  }
} 