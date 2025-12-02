import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import { createServer } from "node:http";
import { client, connectRedis } from "./helper/connectRedis.js";

//Router
import adminRouter from "./routes/admin.js";
import userRouter from "./routes/user.js";
import medicineRouter from "./routes/medicine.js";
import pharmacistRouter from "./routes/pharmacist.js";

import Message from "./models/message.js";

let port = 3000;
const app = express();
connectRedis();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  credentials: true,
};

const server = createServer(app);
const io = new Server(server, {
  cors: corsOptions,
});

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));

main()
  .then(() => {
    console.log("connection successful");
  })
  .catch((err) => console.log(err));

async function main() {
  await mongoose.connect("mongodb+srv://tania:12345@cluster0.skjhj7o.mongodb.net/medicine");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

app.get("/API/messages", async (req, res) => {
  const { from, to } = req.query;

  const messages = await Message.find({
    $or: [
      { from: from, to: to },
      { to: from, from: to },
    ],
  }).sort({ time: 1 });
  res.send(messages);
});

app.use("/API/admin", adminRouter);
app.use("/API/user", userRouter);
app.use("/API/medicine", medicineRouter);
app.use("/API/pharmacist", pharmacistRouter);

app.get("/API/signout", async (req, res) => {
  res.clearCookie("token", {
    httpOnly: true,
  });

  res.send({ success: true, message: "Cookie Removed Successfully" });
});

app.get("/", (req, res) => {
  res.send(`Server is running at port ${port}`);
});


const onlineUsers = new Map();

io.on("connection", (socket) => {
  console.log("User connected: " + socket.id);

  // Save mobile and notify everyone about online experts
  socket.on("save-id", ({ mobile }) => {
    socket.mobile = mobile;
    onlineUsers.set(mobile, socket.id);
    console.log("Online users:", Array.from(onlineUsers.keys()));

    // Emit the updated list of online users to all clients
    io.emit("update-online", Array.from(onlineUsers.keys()));
  });

  // Handle sending messages
  socket.on("message", async ({ from, to, message }) => {
    const msg = new Message({ message, from, to });
    await msg.save();

    if (onlineUsers.has(to)) {
      socket.to(onlineUsers.get(to)).emit("receive", { from, message });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    if (socket.mobile) {
      onlineUsers.delete(socket.mobile);
      io.emit("update-online", Array.from(onlineUsers.keys())); // update everyone
      console.log("User disconnected:", socket.id);
    }
  });
});


server.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
