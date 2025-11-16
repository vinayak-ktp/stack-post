import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

import db from "./config/mongoose-connection.js";
import authRoutes from "./routes/auth.js";
import postRoutes from "./routes/post.routes.js";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/", authRoutes);
app.use("/", postRoutes);

app.listen(PORT);
