import express from "express";

import { getProfile, getUser } from "../controllers/user.controller.js";

const router = express.Router();

router.get("/profile", getProfile);
router.get("/user/:username", getUser);

export default router;
