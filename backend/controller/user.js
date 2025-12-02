import User from "../models/user.js";
import Order from "../models/order.js";
import { encryptPassword, sendToken, comparePassword } from "../helper/auth.js";
import { orderMail } from "../helper/sendMail.js";
import {sendMail} from "../helper/sendMail.js";


export const index = async (req, res) => {
  const users = await User.find({});
  res.send(users);
};

export const findByMobile = async (req, res) => {
  const { mobile } = req.query;
  const user = await User.findOne({ mobile });

  if (!user) {
    res.send({ success: false, message: "User Not found" });
    return;
  }

  res.send({ success: true, user });
};

export const signup = async (req, res) => {
  let { email, password } = req.body;

  // Check if email already exists
  const existingUser = await User.findOne({ email });

  if (existingUser !== null) {
    return res.status(200).json({
      success: false,
      message: "Email already exists. Please use a different email.",
    });
  }

  // Create and Save new User into database
  try {
    const user = new User(req.body);
    user.password = encryptPassword(password);
    const savedUser = await user.save();

    const dbUser = await User.findOne({ email });
    const token = sendToken(dbUser._id, email, "user");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    res
      .status(200)
      .send({ success: true, message: "user saved into db", token: token });
  } catch (error) {
    res.status(200).send({ success: false, message: "Internal Server Error" });
  }
};

export const signin = async (req, res) => {
  let { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user === null) {
      return res.status(200).json({
        success: false,
        message: "User not registered",
      });
    }

    const result = comparePassword(password, user.password);

    if (result) {
      const token = sendToken(user._id, email, "user");

      res.cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(200).send({
        success: true,
        message: "User login successfully",
        token: token,
        user
      });
    } else {
      res
        .status(200)
        .send({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    res.status(200).send({ success: false, message: "Server Error" });
  }
};

export const forgetPassword = async (req, res) => {
  const email = req.body.email;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(200)
        .send({ status: false, message: "User Not Registered" });
    }

    const name = user.name;
    const id = user._id;

    // Generate Reset URL
    const url = `http://localhost:5173/reset-password/76b${id}76b`;

    // Send Mail
    const result = await sendMail(
      email,
      "Reset Your Password",
      `Hey ${name}! Your password reset link is: ${url}`,
      `<p>Hey <b>${name}</b>!<br/>Click the link below to reset your password:</p>
       <a href="${url}" style="color:blue;">Reset Password</a>`
    );

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Mail sent successfully" });
    } else {
      return res
        .status(500)
        .send({ status: false, message: "Failed to send mail" });
    }
  } catch (err) {
    console.error("Forget Password Error:", err);
    return res.status(500).send({ status: false, message: "Server Error" });
  }
};

export const orderMedicine = async (req, res) => {
  const { email, medicines } = req.body;

  const user = await User.findOne({ email });

  if (user) {
    let name = user.name;
    const userId = user._id;
    let order = new Order({ userId, medicines });
    let savedOrder = await order.save();
    console.log(savedOrder);

    // Construct HTML table
    let table = `
      <h3>Medicine Order Details</h3>
      <table border="1" cellpadding="8" cellspacing="0" style="border-collapse: collapse;">
        <thead>
          <tr>
            <th>Medicine Name</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          ${medicines
            .map(
              (med) => `
            <tr>
              <td>${med.name}</td>
              <td>${med.quantity}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
      <p>Ordered by: <strong>${name}</strong></p>
      <p>From: ${email}
    `;

    const result = await orderMail(
      email, // to
      "Medicine Order", // subject
      "Medicine Order Details", // text (plain text fallback)
      table // htmlContent (the HTML table)
    );

    if (result) {
      return res
        .status(200)
        .send({ status: true, message: "Mail sent successfully" });
    } else {
      return res
        .status(200)
        .send({ status: false, message: "Fail to send Mail" });
    }
  } else {
    return res
      .status(200)
      .send({ status: false, message: "User Not Registered" });
  }
};

export const validateUser = async (req, res) => {
  try {
    const { id } = req.body;

    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send("User not valid");
    }

    res.status(200).send("User Valid");
  } catch (error) {
    res.status(201).send("Error validating user");
  }
};

export const resetPassword = async (req, res) => {
  const { id, newPassword } = req.body;

  const user = await User.findById(id);
  // user.password = encryptPassword(newPassword);
  user.password = newPassword;
  await user.save();
  res.status(200).send("Password Updated Successfully");
};
