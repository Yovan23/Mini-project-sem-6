const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    // Check for the presence of an authentication token in the request headers
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        // If no token is found, return an error response
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    // Extract the token from the authorization header
    const token = authHeader.split(' ')[1];

    // Verify the token
    jwt.verify(token, 'YOVANCHHETA', (err, decoded) => {
        if (err) {
            // If the token verification fails, return an error response
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            // If the token is valid, attach the decoded user information to the request object
            req.user = decoded;
            // Proceed to the next middleware or route handler
            next();
        }
    });
};

module.exports = {
    authenticateUser,
};
