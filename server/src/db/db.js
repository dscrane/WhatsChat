import mongoose from 'mongoose';

const connectionURL = process.env.MONGO_URL;

export const db = () => {
  try {
    mongoose.connect(connectionURL, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },).then(() => {console.log('connection successful')}, err => {console.log(err)})
  } catch (e) {
    console.log(e)
  }
}
