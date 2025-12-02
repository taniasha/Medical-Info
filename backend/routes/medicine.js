import express from "express";
const router = express.Router({ mergeParams: true });
import {
  createMedicine,
  deleteMedicine,
  filterMedicine,
  index,
  updateMedicine,
  viewMedicine,
} from "../controller/medicine.js";
import { verifyRole, verifyToken } from "../helper/auth.js";

router.get("/", index);

router
  .route("/:id")
  .get(viewMedicine)
  .post(verifyToken, verifyRole('admin'), createMedicine)
  .put(verifyToken, verifyRole('admin'), updateMedicine)
  .delete(verifyToken, verifyRole('admin'), deleteMedicine);

router.get("/search/:search", filterMedicine);

export default router;
