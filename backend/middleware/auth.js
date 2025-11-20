const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {

  // Checking if token exists in "Bearer <token>" format
  
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).send({ message: "Not authorized, token is missing..." });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).send({ message: 'Not authorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // { id, role }
    next();
  } catch (err) {
    res.status(401).send({ message: 'Token invalid' });
  }
};

const admin = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).send({ message: 'Admin access required' });
  }
  next();
};

module.exports = { protect, admin };