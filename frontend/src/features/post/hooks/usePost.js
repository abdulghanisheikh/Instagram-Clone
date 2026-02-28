import { getFeed, like, dislike } from "../services/post.api";
import { useContext } from "react";
import { PostContext } from "../post.context.jsx";

export function usePost() {
    const context = useContext(PostContext);
    const {feed, setFeed, loading, setLoading} = context;

    async function handleGetFeed() {
        setLoading(true);
        try {
            const data = await getFeed();
            setFeed(data.posts);
        }
        catch(err) {
            console.log(err.message);
        }
        finally {
            setLoading(false);
        }
    }

    async function handlePostLike(postID) {
        try {
            const data = await like(postID);
            console.log(data);
        }
        catch(err) {
            console.log(err.message);
        }
    }

    async function handlePostDislike(postID) {
        try {
            const data = await dislike(postID);
            console.log(data);
        }
        catch(err) {
            console.log(err.message);
        }
    }

    return { feed, loading, handleGetFeed, handlePostLike, handlePostDislike };
}