export const config = {
    runtime: 'edge',
    matcher: '/*',  // This applies the function to all routes
  };
  
  export default async function handler(req) {
    const expectedPassword = process.env.VERCEL_PASSWORD;  // Secure password in environment variable
  
    const authHeader = req.headers.get('authorization');
    if (!authHeader) {
      return new Response('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Secure Area"',
        },
      });
    }
  
    const encoded = authHeader.split(' ')[1];
    const decoded = atob(encoded);
    const [_, inputPassword] = decoded.split(':');  // Ignore the username part
  
    if (inputPassword !== expectedPassword) {
      return new Response('Invalid authentication', { status: 403 });
    }
  
    return new Response('Welcome!', { status: 200 });
  }
  