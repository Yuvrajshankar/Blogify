import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
    {
        userId: {
            type: String,
            required: true,
            ref: "User",
        },
        name: {
            type: String,
            required: true,
            ref: "User",
        },
        profileImage: {
            type: String,
            default: "",
            ref: "User",
        },
        image: {
            type: String,
            default: "",
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        summary: {
            type: String,
            required: true,
            max: 200,
        },
        fullBlog: {
            type: [String],
            required: true,
            trim: true,
        },
    },
    { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;