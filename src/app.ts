import express from "express";
import cors from "cors";
import { analyticsRouter } from "./routes/analytics";
import { basicAuth } from "./middleware/auth";
import { errorHandler } from "./middleware/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());

// Protect all /api endpoints
app.use("/api", basicAuth, analyticsRouter);

app.use(errorHandler);

export default app;