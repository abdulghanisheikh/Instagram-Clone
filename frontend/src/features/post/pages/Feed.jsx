import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
    const {feed, handleGetFeed, loading, handlePostLike, handlePostDislike, updateFeedPost} = usePost();

    async function handleLikeButton(post) {
        if(post.isLiked) {
            handlePostDislike(post._id);
        } else {
            handlePostLike(post._id);
        }

        // update the feed state locally without fetching from the backend
        updateFeedPost(post._id, !post.isLiked);
    }

    useEffect(() => {
        handleGetFeed();
    }, []);

    if(loading || !feed) {
        return <main className="min-h-screen w-screen bg-black flex justify-center items-center text-white py-4">
            <h1 className="text-3xl">Loading feed...</h1>
        </main>
    }

    if(feed.length === 0) {
        return <main className="min-h-screen w-screen flex justify-center items-center bg-black text-white py-4">
            <h1 className="text-xl">No post available</h1>
        </main>
    }

    return <main className="min-h-screen w-screen bg-black text-white py-4 px-5 relative">
        <div className="feed flex flex-col gap-2 lg:w-1/4 w-full mx-auto mb-15">
            {feed.map((post) => {
                return <Post key={post._id} post={post} user={post.user} handleLikes={() => handleLikeButton(post)}></Post>
            })}
        </div>
        <Navbar page="Feed"/>
    </main>
}

export default Feed;