require('dotenv').config();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const { roomSchema } = require('./room');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      require: true,
    },
    username: {
      type: String,
      trim: true,
      require: true,
      unique: true,
      lowercase: true,
      // validate (profanity, slurs)
    },
    email: {
      type: String,
      unique: true,
      require: true,
      trim: true,
      lowercase: true,
      // validate
    },
    password: {
      type: String,
      minLength: 7,
      require: true,
      trim: true,
      // validate
    },
    avatar: {
      type: Buffer
    },
    tokens: [
      {
        token: {
          type: String,
          require: true
        }
      }
    ],
    createdRooms: [
      {
        type: String
      }
    ],
    favoriteRooms: [
      {
      type: String
      }
    ],
  },
  {
  timestamps: true
  }
)

userSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET);

  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
}

userSchema.methods.toJSON = function () {
  const user = this;
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.tokens;

  return userObject;
}

userSchema.statics.findByCredentials = async (username, password) => {
  function LoginError(message) {
      this.message = message;
      this.name = 'Error';
  }

  const user = await User.findOne({ username });
  if (!user) {
    throw new LoginError('The username or password is incorrect')
  }
  console.log('loginUser', user)

  const passwordMatch = await bcrypt.compare(password, user.password);
   if (!passwordMatch) {
     throw new LoginError('The username or password is incorrect')
   }

  return user;
}

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next();
})

const User = mongoose.model('User', userSchema);

module.exports = { User, userSchema };