import { usePost } from "../hooks/usePost.js";
import { useEffect } from "react";

const User = ({otherUser, status, followDetails}) => {
    const { follower, followee } = followDetails;
    const { handleGetMe, user, handleGetAllFollows, handleFollow, handleUnfollow, handleAcceptRequest, handleRejectRequest, handleRemoveFollower, handleCancelRequest } = usePost();

    const username = otherUser.username;
    const profileImage = otherUser.profileImage;

    const myUsername = user.username;
    
    useEffect(() => {
        handleGetMe();
    }, []);

    function renderButton() {
        if(myUsername === follower && username === followee) {
            if(status === "accepted") {
                return <button
                onClick={async() => {
                    await handleUnfollow(username);
                    await handleGetAllFollows();
                }}
                className="border px-2 rounded-md py-0.5 cursor-pointer">Unfollow</button>
            } else if(status === "pending"){
                return <button
                onClick={async() => {
                    await handleCancelRequest(username);
                    await handleGetAllFollows();
                }}
                className="border px-2 rounded-md py-0.5 cursor-pointer">Cancel</button>
            }
        } else if(myUsername === followee && username === follower) {
            if(status === "accepted") {
                return <button 
                onClick={async() => {
                    await handleRemoveFollower(username);
                    await handleGetAllFollows();
                }}
                className="border px-2 rounded-md py-0.5 cursor-pointer">Remove</button>
            } else if(status === "pending") {
                return <div className="flex items-center gap-1">
                    <button
                    onClick={async() => {
                        await handleAcceptRequest(followDetails._id);
                        await handleGetAllFollows();
                    }}
                    className="border px-2 rounded-md py-0.5 cursor-pointer">Accept</button>
                    <button
                    onClick={async () => {
                        await handleRejectRequest(followDetails._id);
                        await handleGetAllFollows();
                    }}
                    className="border px-2 rounded-md py-0.5 cursor-pointer">Reject</button>
                </div>
            }
        } else {
            return <button 
            onClick={async() => {
                await handleFollow(username);
                await handleGetAllFollows();
            }}
            className="border px-2 rounded-md py-0.5 cursor-pointer">Follow</button>
        }
    }

    return <li className="flex items-center justify-between text-sm bg-zinc-900 px-5 rounded-lg py-0.5">
        <div className="info flex items-center gap-1.5">
            <img src={profileImage} alt="" className="h-9 w-9 p-1 rounded-full" />
            <p>{username}</p>
        </div>
        {renderButton()}
    </li>
}

export default User;