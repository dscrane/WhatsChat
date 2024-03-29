import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';

const authenticate = async (req, res, next) => {
  try {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) {
      new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      'tokens.token': token
    });

    if (!user) {
      new Error()
    }
    req.token = token;
    req.user = user;

    next();
  } catch (e) {
    res.send({message: 'Please authenticate'})
  }
}




export { authenticate };