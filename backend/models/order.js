import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = new Schema({
  userId: {
    type: String,
    require: true,
  },
  medicines: [
    {
      name: {
        type: String,
        require: true,
      },
      quantity: {
        type: Number,
        require: true,
      },
    },
  ],
});

const Order = mongoose.model("Order", orderSchema);
export default Order;
