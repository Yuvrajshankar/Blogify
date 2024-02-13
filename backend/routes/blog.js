import express from "express";
import { deleteBlog, getAllBlogs, getBlog, getOtherUserBlogs, getUserBlogs } from "../controllers/blog.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const router = express.Router();

router.get("/allblogs", getAllBlogs);
router.get("/blogs", verifyToken, getUserBlogs);
router.get("/:id", getBlog);
router.get("/user/:userId", getOtherUserBlogs);
router.delete("/:id", verifyToken, deleteBlog);

export default router;