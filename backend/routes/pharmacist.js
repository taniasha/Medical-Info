import express from "express";
import { findByMobile, index, signin, addPharmacist} from "../controller/pharmacist.js";
import { verifyToken } from "../helper/auth.js";
const router = express.Router({ mergeParams: true });

router.get('/', verifyToken, index);
router.get('/find-expert', findByMobile)
router.post('/signin', signin);

router.post("/add", addPharmacist);


export default router;