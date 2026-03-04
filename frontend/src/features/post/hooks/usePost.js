import { getFeed, like, dislike, createPost } from "../services/post.api.js";
import { getMe } from "../../auth/services/auth.api.js";
import { getAllFollows } from "../services/follow.api.js";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

export function usePost() {
    const context = useContext(PostContext);
    const {feed, setFeed, loading, setLoading, follows, user, setUser, followDocs, setFollowDocs} = context;

    async function handleGetFeed() {
        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts);
        } catch(err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handlePostLike(postID) {
        try {
            const data = await like(postID);
            console.log(data);
        } catch(err) {
            console.log(err.message);
        }
    }

    async function handlePostDislike(postID) {
        try {
            const data = await dislike(postID);
            console.log(data);
        } catch(err) {
            console.log(err.message);
        }
    }

    function updateFeedPost(postID, like) {
        setFeed(prev => prev.map((post) => {
            if(post._id === postID) {
                post.isLiked = like;
            }
            return post;
        }));
    }

    async function handleCreatePost(imageFile, caption) {
        setLoading(true);
        try {
            // API call
            const data = await createPost(imageFile, caption);
            // update feed array
            setFeed([data.post, ...feed]);
        } catch(err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleGetAllFollows() {
        setLoading(true);
        try {
            const data = await getAllFollows();
            setFollowDocs(data.follows);
        } catch(err) {
            console.log(err.message);
        } finally {
            setLoading(false);
        }
    }

    async function handleGetMe() {
        try {
            const data = await getMe();
            setUser(data.user);
        } catch(err) {
            console.log(err.message);
        }
    }

    return { feed, loading, follows, handlePostLike, handlePostDislike, updateFeedPost, handleCreatePost, user, handleGetFeed, handleGetAllFollows, handleGetMe, followDocs };
}