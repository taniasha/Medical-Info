
// export const addPharmacist = async (req, res) => {
//   const { email, password, startTime, endTime } = req.body;
//   const newPharmacist = new Pharmacist(req.body);
//   newPharmacist.availableTime.start = startTime;
//   newPharmacist.availableTime.end = endTime;
//   newPharmacist.password = encryptPassword(password);
//   await newPharmacist.save();

//   if (!newPharmacist) {
//     res.send({ success: false, message: "Failed to add pharmacist" });
//   }

//   const url = "http://localhost:5173/pharmacist/signin";

//   const text = `
//   <h3>Credential to Sign In</h3>
//   <p><strong>Email:</strong> ${email}</p>
//   <p><strong>Password:</strong> ${password}</p>
//   <p><strong>Login URL:</strong> <a href="${url}">${url}</a></p>
// `;

//   const result = await sendMail(email, "Credential to signin", "", text);

//   if (result) {
//     res.send({ success: true, message: "Pharmacist added successfully !!!" });
//   } else {
//     res.send({ success: false, message: "Failed to send mail to pharmacist" });
//   }
// };

import Admin from "../models/admin.js";
import Pharmacist from "../models/pharmacist.js";
import { sendToken, encryptPassword } from "../helper/auth.js";
import { sendMail } from "../helper/sendMail.js";

// Hardcoded admin login
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const ADMIN_EMAIL = "admin@gmail.com";
    const ADMIN_PASSWORD = "admin123";

    if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = sendToken("admin-id-001", ADMIN_EMAIL, "admin");
      res.cookie("token", token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 });

      return res.status(200).json({
        success: true,
        message: "Admin login successful",
        token,
      });
    } else {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
  } catch (error) {
    console.error("Admin signin error:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Add Pharmacist API
export const addPharmacist = async (req, res) => {
  const { email, password, startTime, endTime } = req.body;

  try {
    const newPharmacist = new Pharmacist(req.body);
    newPharmacist.availableTime.start = startTime;
    newPharmacist.availableTime.end = endTime;
    newPharmacist.password = encryptPassword(password);
    await newPharmacist.save();

    const url = "http://localhost:5173/pharmacist/signin";
    const text = `
      <h3>Credential to Sign In</h3>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Password:</strong> ${password}</p>
      <p><strong>Login URL:</strong> <a href="${url}">${url}</a></p>
    `;

    const result = await sendMail(email, "Credential to signin", "", text);

    if (result) {
      res.send({ success: true, message: "Pharmacist added successfully!" });
    } else {
      res.send({ success: false, message: "Failed to send mail to pharmacist" });
    }
  } catch (error) {
    console.error("Add Pharmacist error:", error);
    res.status(500).send({ success: false, message: "Server error" });
  }
};
