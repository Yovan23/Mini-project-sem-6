const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Unauthorized: No token provided' });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(token, 'YOVANCHHETA', (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: 'Unauthorized: Invalid token' });
        } else {
            req.user = decoded;
            // // req.user = {
            // //     userId: decoded.userid,
            // //     username: decoded.username,
            // //     role: decoded.role
            // // };
            // const username = decoded.username;
            // req.user = decoded;
            // req.username = username;
            next();
        }
    });
};

module.exports = {
    authenticateUser,
};
