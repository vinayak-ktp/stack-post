import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const getProfile = (req, res) => {
	try {
		const { token } = req.cookies;
		if (token) {
			const user = jwt.verify(token, process.env.SECRET_KEY);
			res.json(user);
		} else {
			res.status(401).json({ error: "No token found" });
		}
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch profile" });
	}
};

export const getUser = async (req, res) => {
	const username = req.params.username;
	try {
		const user = await userModel.findOne({ username });
		if (!user) {
			return res.status(404).json("User Not Found!");
		}
		res.json(user);
	} catch (err) {
		console.error(err);
		res.status(500).json({ error: "Failed to fetch user" });
	}
};
