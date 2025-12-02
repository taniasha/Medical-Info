import express from "express";
import {
  findByMobile,
  forgetPassword,
  index,
  orderMedicine,
  resetPassword,
  signin,
  signup,
  validateUser,
} from "../controller/user.js";
import { verifyRole, verifyToken } from "../helper/auth.js";
const router = express.Router({ mergeParams: true });
// import sendMail from "../utils/sendMail.js";


router.get("/", verifyToken, index);
router.get('/find-user', findByMobile);
router.post("/signup", signup);
router.post("/signin", signin);
router.post("/forget-pass", forgetPassword);
router.post("/medicine/order", verifyToken, verifyRole("user"), orderMedicine);
router.post("/validate", validateUser);
router.post("/reset-pass", verifyToken, verifyRole("user"), resetPassword);

export default router;
