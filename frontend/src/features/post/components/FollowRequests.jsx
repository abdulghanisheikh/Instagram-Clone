import { usePost } from "../hooks/usePost.js";
import { useEffect } from "react";
import User from "./User.jsx";
import Suggestions from "./Suggestions.jsx";

const FollowRequests = () => {
    const {handleGetAllFollows, loading, followDocs, user, handleGetSuggestedUsers, suggestedUsers} = usePost();

    async function callHandlers() {
        await Promise.all([handleGetAllFollows(), handleGetSuggestedUsers()]);
    }

    useEffect(() => {
        callHandlers();
    }, []);

    const requests = [];
    followDocs.forEach((followDoc) => {
        const username = user.username;
        
        if(username === followDoc.followee && followDoc.status === "pending") {
            requests.push(followDoc);
        }
    });

    return <main className="h-screen flex flex-col items-center gap-2 mt-15 w-120 fixed top-1 right-3">

    <div className="Follow-Requests flex flex-col w-full h-1/2 gap-2 px-5 bg-zinc-950 rounded-lg">

        <h1 className="text-xl">Follow Requests</h1>
        <ol className="overflow-y-auto flex flex-col gap-1.5 justify-center">
            
            {loading && (
                <li className="text-sm text-center">Loading requests...</li>
            )}

            {(!requests || requests.length === 0) && (
                <li className="text-center text-sm opacity-50">No follow requests yet.</li>
            )}

            {requests.length > 0 && requests.map((request, index) => {
                return <User key={index} status={request.status} followDetails={request} otherUser={request.followerDetail} />
            })}
        </ol>

    </div>

    <div className="Others flex flex-col w-full h-1/2 gap-2 px-5 bg-zinc-950 rounded-lg">
        <h1 className="text-xl">Suggestions</h1>
        <ol className="overflow-y-auto flex flex-col gap-1.5 justify-center">

            {loading && (
                <li className="text-center text-sm">Loading users...</li>
            )}

            {(!suggestedUsers || suggestedUsers.length === 0) && (
                <li className="text-center text-sm opacity-50">No users yet.</li>
            )}

            {suggestedUsers.map((suggestion, index) => {
                return <Suggestions key={index} suggestedUser={suggestion} />
            })}
        </ol>
    </div>
  </main>
}

export default FollowRequests;