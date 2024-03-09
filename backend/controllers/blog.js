import Blog from "../models/Blog.js";
import User from "../models/User.js";

// CREATE
export const createBlog = async (req, res, next) => {
    try {
        const { image, title, summary, fullBlog } = req.body;

        const userId = req.user._id;
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        const newBlog = new Blog({
            userId: user._id,
            name: user.name,
            profileImage: user.profileImage,
            image,
            title,
            summary,
            fullBlog,
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        next(error);
    }
};

// GET_ALL_BLOGS
export const getAllBlogs = async (req, res, next) => {
    try {
        const blog = await Blog.find();
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

// GET_ONE_BLOG
export const getBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

// GET_USER_BLOGS
export const getUserBlogs = async (req, res, next) => {
    try {
        const userId = req.user._id;
        const blog = await Blog.find({ userId });
        res.status(200).json(blog);
    } catch (error) {
        next(error);
    }
};

// GET_OTHER_USER_BLOGS
export const getOtherUserBlogs = async (req, res, next) => {
    try {
        const { userId } = req.params; // Correctly extract userId from req.params
        const blogs = await Blog.find({ userId });
        res.status(200).json(blogs);
    } catch (error) {
        next(error);
    }
};


// DELETE
export const deleteBlog = async (req, res, next) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findById(id);
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        if (blog.userId.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized to delete this blog" });
        }

        const deleteBlog = await Blog.findByIdAndDelete(id);
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        next(error);
    }
};

