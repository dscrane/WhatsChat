require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token,
    })

    if (!user) {
      throw new Error()
    }
    req.token = token;
    req.user = user;

  } catch (e) {
    res.send({ error: 'Please authenticate'})
  }
}

module.exports = authenticate;