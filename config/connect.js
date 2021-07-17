import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export default () => {

const uri = process.env.MONGODB_URI
// * mongoDB connect *
    mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log(`mongoDB connected`))
  .catch((err) => console.error(`failed connection cause ${err}`));

}
