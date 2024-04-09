// middleware/middleware.js

import { NextResponse } from 'next/server';

export function middleware(request) {
    console.log("Middleware is running."); // This log should appear in the server logs.
    console.log('Authorization Header:', request.headers.get('Authorization'));

    const basicAuth = request.headers.get('authorization');

    if (!basicAuth) {
        console.log("No basic auth provided.");
        return new NextResponse('Authentication required', {
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
        console.log("Incorrect password.");
        return new NextResponse('Unauthorized', { status: 401 });
    }

    console.log("Authentication successful.");
    return NextResponse.next();
}
