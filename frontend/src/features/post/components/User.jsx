import { usePost } from "../hooks/usePost.js";
import { useEffect } from "react";

const User = ({otherUser, status, followDetails}) => {
    const {follower, followee} = followDetails;
    let username;
    let profileImage;
    if(otherUser) {
        username = otherUser.username;
        profileImage = otherUser.profileImage;
    }

    const {handleGetMe, user} = usePost();
    const myUsername = user.username;
    
    useEffect(() => {
        handleGetMe();
    }, []);

    function renderButton() {
        if(myUsername === follower && username === followee) {
            if(status === "accepted") {
                return <button className="border px-2 rounded-md py-0.5 cursor-pointer">Unfollow</button>
            } else if(status === "pending"){
                return <button className="border px-2 rounded-md py-0.5 cursor-pointer">Cancel</button>
            }
        } else if(myUsername === followee && username === follower) {
            if(status === "accepted") {
                return <button className="border px-2 rounded-md py-0.5 cursor-pointer">Remove</button>
            } else if(status === "pending") {
                return <button className="border px-2 rounded-md py-0.5 cursor-pointer">Accept</button>
            }
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