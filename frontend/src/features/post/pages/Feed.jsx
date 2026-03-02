import FollowDetails from "../components/FollowDetails";
import FollowRequests from "../components/FollowRequests";
import Post from "../components/Post";
import { usePost } from "../hooks/usePost";
import Navbar from "../../shared/components/Navbar";

const Feed = () => {
    const {feed, loading, handlePostLike, handlePostDislike, updateFeedPost} = usePost();

    async function handleLikeButton(post) {
        if(post.isLiked) {
            handlePostDislike(post._id);
        } else {
            handlePostLike(post._id);
        }

        // update the feed state locally without fetching from the backend
        updateFeedPost(post._id, !post.isLiked);
    }

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

    return <main className="min-h-screen flex justify-center w-screen bg-black text-white py-5 relative">
        <FollowDetails />
        <div className="feed flex flex-col gap-2 mt-15 lg:w-120 w-full mx-auto">
            {feed.map((post) => {
                return <Post key={post._id} post={post} user={post.user} handleLikes={() => handleLikeButton(post)}></Post>
            })}
        </div>
        <FollowRequests />
        <Navbar page="Feed"/>
    </main>
}

export default Feed;