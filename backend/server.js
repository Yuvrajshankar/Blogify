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

// MIDDLEWARES
app.use(express.json());
app.use(cookieParser());

// ROUTES
app.use(errorHandler);

/* auth */
app.use("/auth", authRoutes);

/* blog */
app.use("/blog", blogRoutes);

// --------------- Deployment ---------------
const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname1, "/frontend/build")));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
    })
} else {
    console.log("API is Running Successfully");
}


// LISTEN / CONNECTION
const PORT = process.env.PORT;
mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
    })
    .catch((error) => console.log(`${error} did not connect`));

