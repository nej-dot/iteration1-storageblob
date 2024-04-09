// pages/_middleware.js

import { NextResponse } from 'next/server';

export default function middleware(request) {
    const { headers } = request;
    const auth = headers.get('authorization');

    if (!auth) {
        return new Response('Authorization required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    const encodedCredentials = auth.split(' ')[1];
    const [username, password] = Buffer.from(encodedCredentials, 'base64').toString().split(':');
    const expectedPassword = process.env.PASSWORD_PROTECT;

    if (password !== expectedPassword) {
        return new Response('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
}
