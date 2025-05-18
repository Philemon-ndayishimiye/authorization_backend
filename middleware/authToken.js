
const dotenv = require('dotenv');
dotenv.config();

const jwt = require('jsonwebtoken')

const secreteKey = process.env.SECRETE_KEY 

 exports.authenticateToken = (req, res, next) => {

  const authHeader = req.headers['authorization'];

  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.status(401).json({ message: 'Access token missing' });

  jwt.verify(token,secreteKey , (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    req.user = user;
    next();
  });
};
 

