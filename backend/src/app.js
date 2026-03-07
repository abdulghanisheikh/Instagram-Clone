require("dotenv").config();
const express = require("express");
const authRouter = require("./routes/auth.route.js");
const postRouter = require("./routes/post.route.js");
const userRouter = require("./routes/user.route.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: process.env.FRONTEND_URL
}));

// To serve static files from backend
const publicPath = path.join(__dirname, "..", "public");
app.use(express.static(publicPath));

app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.use("/api/users", userRouter);

app.get("*name", (req, res) => {
    res.send("You are at wild card route.");
});

module.exports = app;