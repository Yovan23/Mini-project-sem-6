const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET_KEY;

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }
    req.userId = decoded.userId; // Store decoded userId in request object
    next(); // Proceed to the next middleware
  });
};

module.exports = verifyToken;
