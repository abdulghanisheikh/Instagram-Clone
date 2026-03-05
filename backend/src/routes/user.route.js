const express = require("express");
const identifyUser = require("../middlewares/auth.middleware.js");
const userController = require("../controllers/user.controller.js");
const userRouter = express.Router();

/**
 * @route POST /api/users/followRequest/:username
 * @description send a follow request to user
 */
userRouter.post("/follow/:username", identifyUser, userController.sendFollowRequest);

/**
 * @route POST /api/users/unfollow/:username
 * @description unfollows a user
 */
userRouter.post("/unfollow/:username", identifyUser, userController.unfollowUser);

/**
 * @route POST /api/users/like/:postID
 * @description like a post
 */
userRouter.post("/like/:postID", identifyUser, userController.likePost);

/**
 * @route POST /api/users/dislike/postID
 * @description dislike a post
 */
userRouter.post("/dislike/:postID", identifyUser, userController.dislikePost);

/**
 * @route POST /api/users/follow/:followID/accept
 * @description accept the follow request
 */
userRouter.post("/follow/:followID/accept", identifyUser, userController.acceptFollowRequest);

/**
 * @route POST /api/users/follow/:followID/reject
 * @description reject the follow request
 */
userRouter.post("/follow/:followID/reject", identifyUser, userController.rejectFollowRequest);

/**
 * @route GET /api/users/followRequest
 * @description get all follow requests
 */
userRouter.get("/followRequest", identifyUser, userController.getFollowRequests);

/**
 * @route GET /api/users/allFollows
 * @description gets all follow documents from DB
 */
userRouter.get("/allFollows", identifyUser, userController.getAllFollows);

/**
 * @route POST /api/users/removeFollower/:username
 * @description removes a follower
 */
userRouter.post("/removeFollower/:username", identifyUser, userController.removeFollower);

/**
 * @route POST /api/users/cancelRequest/:username
 * @description cancels follow request
 */
userRouter.post("/cancelRequest/:username", identifyUser, userController.cancelRequest);

module.exports = userRouter;