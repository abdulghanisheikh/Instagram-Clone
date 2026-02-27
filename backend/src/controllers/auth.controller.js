const userModel = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
    const { username, password, email, profileImage, bio } = req.body;

    //checked for both email and username in a single DB call
    const isUserAlreadyExist = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (isUserAlreadyExist) {
        return res.status(409).json({
            success: false,
            message: isUserAlreadyExist.username === username ? "Username already exist" : "Email already registered"
        });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hash,
        bio,
        profileImage
    });

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.cookie("token", token);

    res.status(201).json({
        success: true,
        message: "User Registered",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio
        }
    });
};

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    const user = await userModel.findOne({
        $or: [
            { username: username },
            { email: email },
        ]
    }).select("+password");

    if (!user) {
        return res.status(409).json({
            success: false,
            message: "User not found"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(401).json({
            success: false,
            message: "Incorrect password"
        });
    }

    const token = jwt.sign(
        { id: user._id, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );
    res.cookie("token", token);

    res.status(200).json({
        success: true,
        message: "User LoggedIn",
        user: {
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    });
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id);
    
    res.status(200).json({
        success: true,
        message: "User information fetched.",
        user
    });
}

module.exports = {
    registerUser,
    loginUser,
    getMe
};