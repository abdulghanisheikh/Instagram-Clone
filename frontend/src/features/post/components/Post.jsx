import { FaRegHeart } from "react-icons/fa6";
import { FaRegComment } from "react-icons/fa";
import { TbShare3 } from "react-icons/tb";
import { FaRegBookmark } from "react-icons/fa";
import { GoHeartFill } from "react-icons/go";

const Post = ({user, post, handleLikes}) => {
    return <div className="post bg-zinc-900 flex flex-col gap-3 lg:py-4 py-2 w-full rounded-xl">
        
        <div className="top flex items-center w-full px-7 gap-1">
            <img className="w-8 h-8 p-0.5 rounded-full bg-conic from-red-500 via-purple-500 to-red-500" src={user.profileImage ? user.profileImage : `https://thumbs.dreamstime.com/b/default-avatar-profile-icon-vector-social-media-user-portrait-176256935.jpg`} alt="" />

            {user.username ? <p className="text-sm">@{user.username}</p> : <p className="text-sm">@username</p>}
        </div>

        <div className="bottom flex flex-col items-center w-full gap-3 px-7">
            <img className="w-full h-100 object-cover object-center rounded-lg" src={post.imageURL ? post.imageURL : `https://images.unsplash.com/photo-1772107756927-a3975482b1ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8`} alt="" />

            <div className="icons flex items-center justify-between w-full px-1">
                <div className="left flex items-center gap-3">
                    {
                        post.isLiked ? 
                        <button className="cursor-pointer" onClick={handleLikes}><GoHeartFill size={24} color="red" /></button> :
                        <button className="cursor-pointer" onClick={handleLikes}><FaRegHeart size={24} /></button>
                    }
                    <button className="cursor-pointer"><FaRegComment size={24} /></button>
                    <button className="cursor-pointer"><TbShare3 size={24} /></button>
                </div>
                <div className="right">
                    <FaRegBookmark size={22} className="cursor-pointer" />
                </div>
            </div>

            <div className="caption flex gap-1 w-full text-xs overflow-y-hidden">
                {user.username ? <p className="font-semibold">@{user.username}</p> : <p className="font-semibold">@username</p>}
                <p>{post.caption}</p>
            </div>
        </div>
    </div>
}

export default Post;