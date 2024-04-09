// pages/api/auth/[...path].js
export default function handler(req, res) {
    const { authorization } = req.headers;
    const { PASSWORD_PROTECT } = process.env;

    if (!authorization) {
        res.setHeader('WWW-Authenticate', 'Basic realm="Secure Area"');
        return res.status(401).json({ message: 'No credentials sent!' });
    }

    const [username, password] = Buffer.from(authorization.split(' ')[1], 'base64').toString().split(':');
    
    if (password !== PASSWORD_PROTECT) {
        return res.status(401).json({ message: 'Unauthorized' });
    }

    // Redirect to the requested path
    res.writeHead(307, { Location: `/${req.query.path.join('/')}` });
    res.end();
}
