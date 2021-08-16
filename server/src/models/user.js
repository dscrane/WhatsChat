import crypto from "crypto";
import bcrypt from "bcrypt";
import Identicon from "identicon.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
      // validate (profanity, slurs)
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      lowercase: true,
      // validate
    },
    password: {
      type: String,
      minLength: 7,
      required: true,
      trim: true,
      // validate
    },
    avatar: {
      type: String,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
    createdRooms: [
      {
        type: String,
      },
    ],
    currentRooms: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

userSchema.methods.generateAvatar = async function () {
  const user = this;
  const randomHash = crypto
    .createHash("sha1")
    .update(user._id.toString())
    .digest("hex");
  user.avatar = new Identicon(randomHash, 250).toString();
  await user.save();
};

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
};

userSchema.statics.findByCredentials = async (username, password) => {
  function LoginError(message) {
    this.message = message;
    this.name = "Error";
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new LoginError("The username or password is incorrect");
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    throw new LoginError("The username or password is incorrect");
  }

  return user;
};

userSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }

  next();
});

export const User = mongoose.model("User", userSchema);
