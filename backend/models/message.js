import mongoose from "mongoose";

// const date = Date.now();
const messageSchema = mongoose.Schema({
  message: {
    type: String,
    require: true,
  },
  from: {
    type: String,
    require: true,
  },
  to: {
    type: String,
    require: true,
  },
  time: {
    type: Date,
    default: Date.now
  },
});

const Message = mongoose.model("Message", messageSchema);
export default Message;
