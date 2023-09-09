// server/middleware/auth.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  //   const authHeader = req.headers['authorization'];
  //   console.log(req.header('Authorization'))
  // const token = authHeader && authHeader.split(' ')[1];
  const token = req.header('Authorization');
  // console.log(token);
  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }
  try{
    const decoded = jwt.verify(token,process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (error) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};

module.exports = verifyToken;
