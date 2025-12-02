import express from "express";
const router = express.Router({ mergeParams: true });
import { signin, addPharmacist } from "../controller/admin.js";
import { verifyRole, verifyToken } from "../helper/auth.js";

router.post("/signin", signin);
router.post('/pharmacist/add', verifyToken, verifyRole('admin'), addPharmacist)

export default router;
