const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config'); // Adjusted import path

// Ensure JWT_SECRET is set
if (!JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is not set');
}

console.log('JWT_SECRET in authMiddleware:', JWT_SECRET);

const authMiddleware = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = {
      id: decoded.userId,
      role: decoded.role // Add role or any other information from token if needed
    };
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Authentication error:', error.message);

    // Provide more specific error messages based on error type
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token has expired' });
    }
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ message: 'Invalid token' });
    }

    // Generic error handling for other JWT errors
    res.status(401).json({ message: 'Authentication error' });
  }
};

module.exports = authMiddleware;
