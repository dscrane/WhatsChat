require('dotenv').config();
const jwt = require('jsonwebtoken');
const { User } = require('../models/user');

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    console.log('jwt-token', token)
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('decoded-token', decoded)
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    console.log('User', user)

    if (!user) {
      throw new Error()
    }
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    console.log(e)
    res.send({message: 'Please authenticate'})
  }
}




module.exports = authenticate;