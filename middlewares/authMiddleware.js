const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.headers.authorization;

 
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ msg: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  
  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ msg: 'Server configuration error: JWT_SECRET is missing' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next(); 
  } catch (err) {
    
    if (err instanceof jwt.TokenExpiredError) {
      return res.status(401).json({ msg: 'Token expired' });
    } else if (err instanceof jwt.JsonWebTokenError) {
      return res.status(401).json({ msg: 'Token invalid' });
    } else {
      
      return res.status(401).json({ msg: 'Authentication failed', error: err.message });
    }
  }
};

module.exports = auth;
