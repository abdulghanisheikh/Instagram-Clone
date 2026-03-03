import { usePost } from "../hooks/usePost.js";
import User from "../components/User";
import {useEffect} from "react";

const FollowDetails = () => {
    const {follows, user, loading, handleGetAllFollows} = usePost();
    
    const followers = [];
    const followings = [];
    const requests = [];
    const others = [];

    useEffect(() => {
        handleGetAllFollows();
    }, []);

    follows.forEach((follow) => {
        const username = user.username;

        if(username === follow.followee && follow.status === "accepted") {
            followers.push(follow);
        } else if(username === follow.follower && follow.status === "accepted") {
            followings.push(follow);
        } else if(follow.followee === username && follow.status === "pending") {
            requests.push(follow);
        } else if(follow.followee !== username && follow.follower !== username) {
            others.push(follow);
        }
    });

    return <main className="h-screen flex flex-col items-center px-3 mt-15 w-120 fixed top-1 left-3">

        <div className="Followers flex flex-col w-full h-1/2 gap-2">
            <h1 className="text-xl">Followers</h1>

            <ol className="overflow-y-auto">

                {loading && (
                    <div>loading followers...</div>
                )}

                {followers.length > 0 && followers.map((followDoc, index) => {
                    return <User key={index} user={followDoc.followerDetail} status={followDoc.status} />
                })}

            </ol>
        </div>

        <div className="Following flex flex-col w-full h-1/2 gap-2">
            <h1 className="text-xl">Following</h1>
            <ol className="overflow-y-auto">

                {followings.length > 0 && followings.map((followDoc, index) => {
                    return <User key={index} user={followDoc.followeeDetail} status={followDoc.status} />
                })}

            </ol>
        </div>
    </main>
}

export default FollowDetails;