// middleware/middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
    const basicAuth = req.headers.get('authorization');

    if (!basicAuth) {
        return new Response('Authorization required', {
            status: 401,
            headers: {
                'WWW-Authenticate': 'Basic realm="Secure Area"',
            },
        });
    }

    const encodedCredentials = basicAuth.split(' ')[1];
    const [username, password] = Buffer.from(encodedCredentials, 'base64').toString().split(':');
    const expectedPassword = process.env.PASSWORD_PROTECT;

    if (password !== expectedPassword) {
        return new Response('Unauthorized', { status: 401 });
    }

    return NextResponse.next();
}