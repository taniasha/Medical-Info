import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
});

//collection name,it's Schema
const User = mongoose.model("User", userSchema);

export default User;
