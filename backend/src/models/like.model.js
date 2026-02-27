const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        required: [true, "Post ID is required"]
    },
    user: {
        type: String,
        required: [true, "username is required"]
    } 
}, { timestamps: true });

likeSchema.index({ post: 1, username: 1 }, { unique: true });
const likeModel = mongoose.model("like", likeSchema);

module.exports = likeModel;