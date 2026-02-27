import { getFeed } from "../services/post.api";
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

    return { feed, loading, handleGetFeed };
}