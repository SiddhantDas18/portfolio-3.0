import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'https://siddhant.space/api/spotify/callback';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      console.error('Spotify authorization error:', error);
      return NextResponse.json(
        { error: `Authorization failed: ${error}` },
        { status: 400 }
      );
    }

    if (!code) {
      console.error('No authorization code provided');
      return NextResponse.json(
        { error: 'No authorization code provided' },
        { status: 400 }
      );
    }

    if (!client_id || !client_secret) {
      console.error('Missing credentials:', { hasClientId: !!client_id, hasClientSecret: !!client_secret });
      return NextResponse.json(
        { error: 'Missing Spotify credentials' },
        { status: 500 }
      );
    }

    console.log('Exchanging code for tokens...');
    const basic = Buffer.from(`${client_id}:${client_secret}`).toString('base64');
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${basic}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Failed to get tokens:', {
        status: response.status,
        statusText: response.statusText,
        data
      });
      return NextResponse.json(
        { error: 'Failed to get tokens', details: data },
        { status: response.status }
      );
    }

    console.log('Successfully obtained tokens');
    // Return the tokens in a user-friendly format
    return NextResponse.json({
      message: 'Successfully obtained tokens',
      refresh_token: data.refresh_token,
      access_token: data.access_token,
      expires_in: data.expires_in,
      token_type: data.token_type,
    });
  } catch (error) {
    console.error('Error in callback:', error);
    return NextResponse.json(
      { error: 'Failed to process callback', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 