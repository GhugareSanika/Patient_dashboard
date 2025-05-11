import { Router } from "express";
import {
  getShipments,
  getShipmentById,
} from "../controllers/shipments.controller";

const router = Router();

// Properly typed route handlers
router.get("/", getShipments);
router.get("/:id", getShipmentById);

export default router;
