// pages/_middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
  const basicAuth = request.headers.get('authorization');

  if (!basicAuth) {
    return new Response('Authorization required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Secure Area"',
      },
    });
  }

  const auth = basicAuth.split(' ')[1];
  const [username, password] = Buffer.from(auth, 'base64').toString().split(':');
  const expectedPassword = process.env.PASSWORD_PROTECT;

  if (password !== expectedPassword) {
    return new Response('Unauthorized', { status: 401 });
  }

  return NextResponse.next();
}
