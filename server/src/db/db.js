import mongoose from 'mongoose';

const connectionURL = process.env.MONGO_URL;

export const db = () => mongoose.connect(connectionURL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
