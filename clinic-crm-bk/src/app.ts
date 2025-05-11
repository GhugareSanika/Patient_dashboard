import express from "express";
import cors from "cors";
import progressRoutes from "./routes/progress.routes";
import shipmentsRoutes from "./routes/shipments.routes";
import { config } from "./config";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/progress", progressRoutes);
app.use("/api/shipments", shipmentsRoutes);

// Start server
app.listen(config.port, () => {
  console.log(`Server running on port ${config.port}`);
});
