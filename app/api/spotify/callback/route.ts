import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET;
const redirect_uri = 'http://localhost:3000/api/spotify/callback';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'No code provided' }, { status: 400 });
  }

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(`${client_id}:${client_secret}`).toString('base64')}`,
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        code: code,
        redirect_uri: redirect_uri,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error_description || 'Failed to get access token');
    }

    // Return the tokens and instructions
    return NextResponse.json({
      access_token: data.access_token,
      refresh_token: data.refresh_token,
      message: 'Add these to your .env.local file:',
      env_vars: {
        SPOTIFY_CLIENT_ID: client_id,
        SPOTIFY_CLIENT_SECRET: client_secret,
        SPOTIFY_REFRESH_TOKEN: data.refresh_token,
      },
    });
  } catch (error) {
    console.error('Error in callback:', error);
    return NextResponse.json({ error: 'Failed to get access token' }, { status: 500 });
  }
} 