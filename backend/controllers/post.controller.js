import jwt from "jsonwebtoken";
import postModel from "../models/post.model.js";

export const createPost = async (req, res) => {
	const { title, content } = req.body;
	const image = req.file ? req.file.filename : null;
	try {
		const user = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
		const post = await postModel.create({
			title,
			content,
			image,
			author: user.id,
		});
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to create post" });
	}
};

export const getPosts = async (req, res) => {
	try {
		const posts = await postModel.find().populate("author");
		res.json(posts);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch posts" });
	}
};

export const getPostById = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await postModel.findById(id).populate("author");
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to fetch post" });
	}
};

export const updatePost = async (req, res) => {
	const { id } = req.params;
	const { title, content } = req.body;
	try {
		const existingPost = await postModel.findById(id);
		if (!existingPost) {
			return res.status(404).json({ error: "Post not found" });
		}

		const updatedFields = {
			title,
			content,
			image: req.file ? req.file.filename : existingPost.image,
		};

		const post = await postModel.findByIdAndUpdate(id, updatedFields, {
			new: true,
		});
		res.json(post);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to update post" });
	}
};

export const deletePost = async (req, res) => {
	const { id } = req.params;
	try {
		const post = await postModel.findByIdAndDelete(id);
		if (!post) {
			return res.status(404).json({ error: "Post not found" });
		}
		res.json({ message: "Post deleted successfully" });
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to delete post" });
	}
};
