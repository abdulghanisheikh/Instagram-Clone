const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");

const imageKit = new ImageKit({
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
});

async function createPost(req, res) {
    const { caption } = req.body;
    const file = req.file;
    const userID = req.user.id;

    const result = await imageKit.files.upload({
        file: await toFile(file.buffer, "file"),
        fileName: file.originalname,
        folder: "insta-clone-posts"
    });

    const post = await postModel.create({
        caption,
        imageURL: result.url,
        user: userID
    });
    
    res.status(201).json({
        success: true,
        message: "Post created",
        post
    });
}

async function getPosts(req, res) {
    const userId = decoded.id;
    const posts = await postModel.find({ user: userId });

    res.status(200).json({
        success: true,
        message: "Posts fetched",
        posts
    });
}

async function getPostDetails(req, res) {
    const userId = req.user.id;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);
    
    if(!post) {
        return res.status(404).json({
            success: false,
            message: "Post not found"
        });
    }

    const isValidUser = post.user.toString() === userId;
    if(!isValidUser) {
        return res.status(403).json({
            success: false,
            message: "Forbidden content"
        });
    }

    res.status(200).json({
        success: true,
        message: "Post details fetched",
        post
    });
}

async function getFeed(req, res) {
    // lean(): mongoose objects => plain JS objects
    const posts = await Promise.all((await postModel.find().populate("user").sort({ _id: -1 }).lean())
    .map(async(post) => {
        const liked = await likeModel.findOne({
            post: post._id,
            user: req.user.username
        });

        post.isLiked = liked ? true : false;
        return post;
    }));

    res.status(200).json({
        success: true,
        message: "Feed fetched",
        posts
    });
}

module.exports = {
    createPost,
    getPosts,
    getPostDetails,
    getFeed
}