import { Router } from "express";
import LookupController from "./controller";

const router = Router();

router.post("/", LookupController.getPlateNumberInfo);

export default router;