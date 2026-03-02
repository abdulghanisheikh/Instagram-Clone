import { getFeed, like, dislike, createPost } from "../services/post.api.js";
import { useContext, useEffect } from "react";
import { PostContext } from "../post.context.jsx";

export function usePost() {
    const context = useContext(PostContext);
    const {feed, setFeed, loading, setLoading} = context;

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

    useEffect(() => {
        handleGetFeed();
    }, []);

    return { feed, loading, handleGetFeed, handlePostLike, handlePostDislike, updateFeedPost, handleCreatePost };
}