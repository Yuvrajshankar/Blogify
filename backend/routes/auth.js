import express from "express";
import { alreadyLoggedIn, getOtherProfile, getUserProfile, login, logout, register } from "../controllers/auth.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", verifyToken, logout);
router.get("/profile", verifyToken, getUserProfile);
router.get("/already", verifyToken, alreadyLoggedIn);
router.get("/:id", getOtherProfile);

export default router;