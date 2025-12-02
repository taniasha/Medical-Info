import mongoose from "mongoose";

const Schema = mongoose.Schema;

const pharmacistSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  mobile: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  availableTime: {
    start: {
      type: String,
      require: true,
    },
    end: {
      type: String,
      require: true,
    },
  },
});

//collection name,it's Schema
const Pharmacist = mongoose.model("Pharmacist", pharmacistSchema);

export default Pharmacist;
