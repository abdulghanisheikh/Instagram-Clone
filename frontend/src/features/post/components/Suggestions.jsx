import {usePost} from "../hooks/usePost.js";

const Suggestions = ({suggestedUser}) => {

    const {username, profileImage, requestedTo} = suggestedUser;
    const { handleFollow, handleCancelRequest, handleGetAllFollows } = usePost();

    return <li className="flex items-center justify-between text-sm bg-zinc-900 px-5 rounded-lg py-0.5">
        <div className="info flex items-center gap-1.5">
            <img src={profileImage} alt="" className="h-9 w-9 p-1 rounded-full" />
            <p>{username}</p>
        </div>

        { 
        requestedTo === true ?
        <button 
        onClick={async() => {
            await handleCancelRequest(username);
            await handleGetAllFollows();
        }}
        className="border px-2 rounded-md py-0.5 cursor-pointer">Cancel</button> :
        <button 
        onClick={async() => {
            await handleFollow(username);
            await handleGetAllFollows();
        }}
        className="px-2 rounded-md py-0.5 cursor-pointer bg-blue-600">Follow</button>
        }
    </li>
}

export default Suggestions;