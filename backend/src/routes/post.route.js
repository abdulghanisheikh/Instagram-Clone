const express = require("express");
const postController = require("../controllers/post.controller.js");
const multer = require("multer");
const upload = multer({
  storage: multer.memoryStorage(),
});
const identifyUser = require("../middlewares/auth.middleware.js");

const postRouter = express.Router();

/**
 * @route POST /api/posts/
 * @description creates the post
 */
postRouter.post("/", upload.single("image"), identifyUser, postController.createPost);

/**
 * @route GET /api/posts/feed
 * @description gets all user posts
 */
postRouter.get("/", identifyUser, postController.getPosts);

/**
 * @route GET /api/posts/details/:postID
 * @description gives the details of the post
 */
postRouter.get("/details/:postId", identifyUser, postController.getPostDetails);

/**
 * @route /api/posts/feed
 * @description gets all posts from the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeed);

module.exports = postRouter;