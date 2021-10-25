import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

const authenticate = async (req, res, next) => {
  console.log(req.body);
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    if (!token) {
      throw new Error();
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({
      _id: decoded._id,
      "tokens.token": token,
    });

    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    req.body = req.body;

    next();
  } catch (e) {
    console.log(e);
    res.send({ message: "Please authenticate" });
  }
};

export { authenticate };
