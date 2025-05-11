import { NextResponse } from 'next/server';

const client_id = process.env.SPOTIFY_CLIENT_ID;
const redirect_uri = 'http://localhost:3000/api/spotify/callback';

export async function GET() {
  const scope = 'user-read-currently-playing user-top-read';
  const authUrl = new URL('https://accounts.spotify.com/authorize');
  
  const params = {
    response_type: 'code',
    client_id: client_id!,
    scope: scope,
    redirect_uri: redirect_uri,
    show_dialog: true,
  };

  // Convert boolean to string to satisfy URLSearchParams type requirements
  const searchParams = {
    ...params,
    show_dialog: params.show_dialog.toString()
  };

  authUrl.search = new URLSearchParams(searchParams).toString();
  
  return NextResponse.json({ url: authUrl.toString() });
} 