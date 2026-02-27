import { useEffect } from "react";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";

const Feed = () => {
    const {feed, handleGetFeed, loading} = usePost();

    useEffect(() => {
        handleGetFeed();
    }, []);

    if(loading || !feed) {
        <main className="min-h-screen w-screen bg-black flex justify-center items-center text-white py-4">
            <h1 className="text-3xl">Loading feed...</h1>
        </main>
    }

    if(feed.length === 0) {
        return <main className="min-h-screen w-screen flex justify-center items-center bg-black text-white py-4">
            <h1 className="text-xl">No post available</h1>
        </main>
    }

    return <main className="min-h-screen w-screen bg-black text-white py-4 px-5">
        <div className="feed flex flex-col gap-2 lg:w-1/4 w-full mx-auto">
            {feed && feed.map((item, index) => {
                return <Post key={index} post={item} user={item.user}></Post>
            })}
        </div>
    </main>
}

export default Feed;