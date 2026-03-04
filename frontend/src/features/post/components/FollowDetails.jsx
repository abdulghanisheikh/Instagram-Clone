import { usePost } from "../hooks/usePost.js";
import User from "../components/User";
import {useEffect} from "react";

const FollowDetails = () => {
    const {loading, handleGetAllFollows, followDocs, user} = usePost();

    const followers = [];
    const followings = [];

    useEffect(() => {
        handleGetAllFollows();
    }, []);

    followDocs.forEach((followDoc) => {
        const {username} = user;

        if(username === followDoc.followee && followDoc.status === "accepted") {
            followers.push(followDoc);
        } else if(username === followDoc.follower && followDoc.status === "accepted") {
            followings.push(followDoc);
        }
    });

    return <main className="h-screen flex flex-col gap-2 items-center mt-15 w-120 fixed top-1 left-3">

        <div className="Followers flex flex-col w-full h-1/2 gap-2 px-5 bg-zinc-950 rounded-lg">
            <h1 className="text-xl">Followers</h1>

            <ol className="overflow-y-auto flex flex-col gap-1.5 justify-center">

                {loading && (
                    <li className="text-sm text-center">loading followers...</li>
                )}

                {(!followers || followers.length === 0) && (
                    <li className="text-sm text-center opacity-50">No follower yet.</li>
                )}

                {followers.length > 0 && followers.map((followDoc, index) => {
                    return <User key={index} followDetails={followDoc} otherUser={followDoc.followerDetail} status={followDoc.status} />
                })}

            </ol>
        </div>

        <div className="Following flex flex-col w-full h-1/2 gap-2 px-5 bg-zinc-950 rounded-lg">
            <h1 className="text-xl">Followings</h1>
            <ol className="overflow-y-auto flex flex-col gap-1.5 justify-center">

                {loading && (
                    <li className="text-sm text-center">loading followings...</li>
                )}

                {(!followings || followings.length === 0) && (
                    <li className="text-sm text-center opacity-50">No followings yet.</li>
                )}

                {followings.length > 0 && followings.map((followDoc, index) => {
                    return <User key={index} followDetails={followDoc} otherUser={followDoc.followeeDetail} status={followDoc.status} />
                })}

            </ol>
        </div>
    </main>
}

export default FollowDetails;