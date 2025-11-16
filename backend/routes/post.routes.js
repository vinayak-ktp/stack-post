import express from "express";

import {
	createPost,
	getPosts,
	getPostById,
	updatePost,
	deletePost,
} from "../controllers/post.controller.js";
import upload from "../config/upload.js";

const router = express.Router();

router.post("/create", upload.single("image"), createPost);
router.get("/getposts", getPosts);
router.get("/posts/:id", getPostById);
router.put("/edit/:id", upload.single("image"), updatePost);
router.delete("/delete/:id", deletePost);

export default router;
