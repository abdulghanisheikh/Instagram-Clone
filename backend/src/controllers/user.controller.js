const followModel = require("../models/follow.model.js");
const userModel = require("../models/user.model.js");
const postModel = require("../models/post.model.js");
const likeModel = require("../models/like.model.js");

async function sendFollowRequest(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername === followeeUsername) {
        return res.status(403).json({
            success: false,
            message: "You can not follow yourself."
        });
    }

    const isFolloweeExists = await userModel.findOne({ username: followeeUsername });

    if(!isFolloweeExists) {
        return res.status(409).json({
            success: false,
            message: "User you're trying to follow does not exist."
        });
    }

    const alreadyRequested = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: {
            $in: ["pending", "accepted"]
        }
    });

    if(alreadyRequested) {
        if(alreadyRequested.status === "accepted") {
            return res.status(409).json({
                success: false,
                message: "request already accepted."
            });
        }
        if(alreadyRequested.status === "pending") {
            return res.status(409).json({
                success: false,
                message: "request already sent."
            });
        }
    }

    const followRequest = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    });

    res.status(201).json({
        success: true,
        message: `Request sent to ${followeeUsername}`,
        follow: followRequest
    });
}

async function unfollowUser(req, res) {
    const followerUsername = req.user.username;
    const followeeUsername = req.params.username;

    if(followerUsername === followeeUsername) {
        return res.status(403).json({
            success: false,
            message: "You can not unfollow yourself."
        });
    }

    const isFolloweeExists = await userModel.findOne({ username: followeeUsername });

    if(!isFolloweeExists) {
        return res.status(409).json({
            success: false,
            message: "User you're unfollowing doest not exists."
        });
    }

    const isFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
        status: "accepted"
    });

    if(!isFollowing) {
        return res.status(200).json({
            success: true,
            message: "Already unfollowed"
        });
    }

    const followRecord = await followModel.findByIdAndDelete(isFollowing._id);

    res.status(200).json({
        success: true,
        message: `You unfollowed ${followeeUsername}.`,
        follow: followRecord
    });
}

async function acceptFollowRequest(req, res) {
    const followID = req.params.followID;
    const followeeUsername = req.user.username;

    const follow = await followModel.findById(followID);

    if(!follow) {
        return res.status(409).json({
            success: false,
            message: "Follow request not found."
        });
    }

    if(follow.status !== "pending") {
        if(follow.status === "accepted") {
            return res.status(409).json({
                success: true,
                message: "Request already accepted."
            });
        }
        if(follow.status === "rejected") {
            return res.status(409).json({
                success: false,
                message: "Request already rejected."
            });
        }
    }

    if(follow.followee !== followeeUsername) {
        return res.status(403).json({
            success: true,
            message: "Request can be accepted only by followee."
        });
    }

    follow.status = "accepted";
    await follow.save();

    return res.status(200).json({
        success: true,
        message: "Follow request accepted.",
        follow
    });
}

async function rejectFollowRequest(req, res) {
    const followeeUsername = req.user.username;
    const followID = req.params.followID;

    const follow = await followModel.findById(followID);

    if(!follow) {
        return res.status(409).json({
            success: false,
            message: "Request not found"
        });
    }

    if(follow.followee !== followeeUsername) {
        return res.status(409).json({
            success: false,
            message: "Request can be rejected only by followee."
        });
    }

    if(follow.status !== "pending") {
        if(follow.status === "accepted") {
            return res.status(409).json({
                success: true,
                message: "Request already accepted."
            });
        }
        if(follow.status === "rejected") {
            return res.status(409).json({
                success: false,
                message: "Request already rejected."
            });
        }
    }

    follow.status = "rejected";
    await follow.save();

    res.status(200).json({
        success: true,
        message: "Request rejected",
        follow
    });
}

async function likePost(req, res) {
    const postID = req.params.postID;
    const username = req.user.username;

    const post = await postModel.findById(postID);

    if(!post) {
        return res.status(409).json({
            success: false,
            message: "Post not found"
        });
    }

    const alreadyLiked = await likeModel.findOne({
        post: postID,
        user: username
    });

    if(alreadyLiked) {
        return res.status(200).json({
            success: true,
            message: "Post already liked"
        });
    }

    const like = await likeModel.create({
        post: post._id,
        user: username
    });

    res.status(200).json({
        success: true,
        message: "Post liked",
        like
    });
}

async function dislikePost(req, res) {
    const postID = req.params.postID;
    const username = req.user.username;

    const post = await postModel.findById(postID);

    if(!post) {
        return res.status(409).json({
            success: false,
            message: "Post not found."
        });
    }

    const alreadyLiked = await likeModel.findOne({
        post: postID,
        user: username
    });

    if(!alreadyLiked) {
        return res.status(403).json({
            success: true,
            message: "Post is already disliked."
        });
    }

    await likeModel.findOneAndDelete({
        post: postID,
        user: username
    });

    res.status(200).json({
        success: true,
        message: "Post disliked"
    });
}

async function getFollowRequests(req, res) {
    const followeeUsername = req.user.username;

    const followRequests = await followModel.find({
        followee: followeeUsername,
        status: "pending"
    });

    if(!followRequests) {
        return res.status(409).json({
            success: false,
            message: "Follow requests not found."
        });
    }

    return res.status(200).json({
        success: true,
        message: "Follow requests fetched.",
        requests: followRequests
    });
}

async function getFollowers(req, res) {
    const followeeUsername = req.user.username;

    const followers = await followModel.find({ followee: followeeUsername });

    if(!followers) {
        return res.status(409).json({
            success: false,
            message: "No followers"
        });
    }

    res.status(200).json({
        success: true,
        message: "Followers fetched",
        followers
    });
}

module.exports = {
    sendFollowRequest,
    unfollowUser,
    likePost,
    dislikePost,
    acceptFollowRequest,
    rejectFollowRequest,
    getFollowRequests
}