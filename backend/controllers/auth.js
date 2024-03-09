import bcrypt from "bcrypt"
import User from "../models/User.js";
import { generateToken } from "../middlewares/generateToken.js";

// REGISTER
export const register = async (req, res, next) => {
    try {
        const { profileImage, name, email, password } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            res.status(409);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: passwordHash,
            profileImage,
        });
        res.status(201).json({ newUser });
    } catch (error) {
        next(error)
    }
};

// LOGIN
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ msg: "User does not exist." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(404).json({ msg: "Invalid password." });
        }

        generateToken(res, user._id);
        delete user.password;
        res.status(200).json({ user });
    } catch (error) {
        next(error);
    }
};


// LOGOUT
export const logout = async (req, res, next) => {
    res.cookie('user_jwt', '', {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: 'Logged out successfully' });
}

// GET USER PROFILE
export const getUserProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            });
        }
    } catch (error) {
        next(error);
    }
};


// ALREADY LOGGED IN
export const alreadyLoggedIn = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            return res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            });
        }
    } catch (error) {
        next(error);
    }
};


// GET OTHERs PROFILE
export const getOtherProfile = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (user) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                profileImage: user.profileImage
            });
        }
    } catch (error) {
        next(error);
    }
};