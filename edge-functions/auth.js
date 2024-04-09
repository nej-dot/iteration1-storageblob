export const config = {
    runtime: 'edge',
    matcher: '/*',  // This ensures the auth runs on all routes
  };
  
  export default async function handler(req) {
    const username = process.env.VERCEL_USERNAME;
    const password = process.env.VERCEL_PASSWORD;
  
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
    const [inputUsername, inputPassword] = decoded.split(':');
  
    if (inputUsername !== username || inputPassword !== password) {
      return new Response('Invalid authentication', { status: 403 });
    }
  
    return new Response('Welcome!', { status: 200 });
  }
  