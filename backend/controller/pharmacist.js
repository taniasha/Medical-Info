import Pharmacist from "../models/pharmacist.js";
import { comparePassword, sendToken } from "../helper/auth.js";
import { client } from "../helper/connectRedis.js";



export const signin = async (req, res) => {
  const { email, password } = req.body;

  const pharmacist = await Pharmacist.findOne({ email });

  if (!pharmacist) {
    res.send({ success: false, message: "Email not registered!!!" });
    return;
  }

  const result = comparePassword(password, pharmacist.password);

  if (result) {
    const token = sendToken(pharmacist._id, email, "pharmacist");

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    await client.set("expert", pharmacist.mobile);

    res.send({ success: true, pharmacist, message: "Pharmacist Signin successfully!!!" });
  } else {
    res.send({ success: false, message: "Invalid Email OR Password" });
  }
};



export const index = async (req, res) => {
  const allExpert = await Pharmacist.find({});

  res.send(allExpert);
}




export const findByMobile = async (req, res) => {
  const {mobile} = req.query;

  const expert = await Pharmacist.findOne({mobile});

  if(!expert) {
    res.send({success: false, message: "Failed to get Expert detail..."});
    return;
  }

  res.send({success: true, expert})
}




export const addPharmacist = async (req, res) => {
  try {
    const { name, email, password, mobile, startTime, endTime } = req.body;

    // Validate if pharmacist exists
    const existing = await Pharmacist.findOne({ email });
    if (existing) return res.status(400).send({ success: false, message: "Pharmacist already exists" });

    const pharmacist = await Pharmacist.create({ name, email, password, mobile, availableTime: { start: startTime, end: endTime } });

    res.send({ success: true, pharmacist, message: "Pharmacist added successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).send({ success: false, message: "Something went wrong" });
  }
};

