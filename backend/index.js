import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
import path from "path";

import authRouter from "./routes/auth.routes.js";
import postRouter from "./routes/post.routes.js";
import userRouter from "./routes/user.routes.js";
import connectDB from "./config/db.js";

const PORT = 3000;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(cookieParser());

// Use routes
app.use("/", authRouter);
app.use("/", postRouter);
app.use("/", userRouter);

app.listen(PORT, () => {
	connectDB(process.env.MONGO_URI);
	console.log(`backend running at port ${PORT}`);
});
