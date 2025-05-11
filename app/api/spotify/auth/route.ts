import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = 'https://siddhant.space/api/spotify/callback';

export async function GET() {
  try {
    if (!client_id) {
      console.error('Missing SPOTIFY_CLIENT_ID');
      return NextResponse.json(
        { error: 'Missing Spotify Client ID. Please check your .env.local file.' },
        { status: 500 }
      );
    }

    console.log('Starting Spotify authorization...');
    const scope = [
      'user-read-currently-playing',
      'user-read-playback-state',
      'user-modify-playback-state',
      'user-read-private',
      'user-read-email'
    ].join(' ');

    const authUrl = new URL('https://accounts.spotify.com/authorize');
    
    const params = {
      response_type: 'code',
      client_id: client_id,
      scope: scope,
      redirect_uri: redirect_uri,
      show_dialog: 'true',
      state: Math.random().toString(36).substring(7)
    };

    authUrl.search = new URLSearchParams(params).toString();
    
    console.log('Generated auth URL:', authUrl.toString());
    return NextResponse.json({ authUrl: authUrl.toString() });
  } catch (error) {
    console.error('Error in auth route:', error);
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    );
  }
} 