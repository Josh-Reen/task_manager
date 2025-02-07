const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/config');

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
      return res.status(401).send({ error: 'Authorization header missing.' });
    }

    const token = authHeader.replace('Bearer ', '');
    const decoded = jwt.verify(token, config.jwtSecret);
    const user = await User.findOne({ _id: decoded.userId });

    if (!user) {
      return res.status(401).send({ error: 'User not found.' });
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: 'Please authenticate.' });
  }
};

module.exports = authMiddleware;