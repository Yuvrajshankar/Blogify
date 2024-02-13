// IMPORTS
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import { errorHandler } from "./middlewares/errorHandler.js";
import { register } from "./controllers/auth.js";
import { verifyToken } from "./middlewares/verifyToken.js";
import { createBlog } from "./controllers/blog.js";
import authRoutes from "./routes/auth.js";
import blogRoutes from "./routes/blog.js";
// CONFIGURATION
dotenv.config();
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());
app.use("/pics", express.static(path.join(__dirname, "images")));

// FILE STORAGE
const uploadDirectory = path.join(__dirname, "images");
if (!fs.existsSync(uploadDirectory)) {
    fs.mkdirSync(uploadDirectory);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDirectory);
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// ROUTES
app.use(errorHandler);

/* auth */
app.post("/auth/register", upload.single("profileImage"), register);
app.use("/auth", authRoutes);

/* blog */
app.post("/blog/create", verifyToken, upload.single("image"), createBlog);
app.use("/blog", blogRoutes);

// LISTEN / CONNECTION
const PORT = process.env.PORT;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

