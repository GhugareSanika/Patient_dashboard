import { Router } from "express";
import { getProgress } from "../controllers/progess.controller";

const router = Router();

router.get("/", getProgress);

export default router;
