import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.model.js";

export const register = async (req, res) => {
	const { username, email, password } = req.body;
	try {
		const user = await userModel.create({
			username,
			email,
			password: await bcrypt.hash(password, 10),
		});
		res.json(user);
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to register user" });
	}
};

export const login = async (req, res) => {
	const { username, password } = req.body;
	try {
		const user = await userModel.findOne({ username });
		if (!user) {
			return res.status(404).json("User Not Found!");
		}
		const passOk = await bcrypt.compare(password, user.password);
		if (passOk) {
			const token = jwt.sign(
				{ username, email: user.email, id: user._id },
				process.env.SECRET_KEY,
			);
			res.cookie("token", token).json({
				username,
				email: user.email,
				id: user._id,
			});
		} else {
			return res.status(400).json("Incorrect Credentials");
		}
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: "Failed to login" });
	}
};

export const logout = (req, res) => {
	res.cookie("token", "");
	res.json("OK");
};
