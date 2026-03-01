import Navbar from "../../shared/components/Navbar";
import { RiImageAddFill } from "react-icons/ri";
import { useState, useRef } from "react";
import { useNavigate } from "react-router";
import { usePost } from "../hooks/usePost.js";

const CreatePost = () => {
    const postImageInputFieldRef = useRef(null);
    const [caption, setCaption] = useState("");

    const navigate = useNavigate();

    const { handleCreatePost, loading } = usePost();

    async function handleSubmit(e) {
        e.preventDefault();
        const file = postImageInputFieldRef.current.files[0];
        
        await handleCreatePost(file, caption);

        navigate("/");
    }

    if(loading) {
        return <main className="min-h-screen w-screen bg-black text-white relative flex justify-center items-center">
            <h1 className="text-3xl">Creating Post...</h1>
        </main>
    }

    return <main className="min-h-screen w-screen bg-black text-white relative">

        <form onSubmit={handleSubmit} className="createPostForm lg:w-1/4 mx-auto w-full flex flex-col">
            <div className="w-full flex items-center justify-between py-4 px-5">
                <h1 className="text-lg">New Post</h1>
                <button type="submit" className="text-lg cursor-pointer">Post</button>
            </div>

            <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage" />

            <label htmlFor="postImage" className="h-80 flex flex-col cursor-pointer justify-center gap-1 items-center rounded-xl w-full border-2 border-dashed">
                <div className="p-2 rounded-full bg-zinc-800 text-white">
                    <RiImageAddFill size={26}/>
                </div>
                <h2 className="font-semibold">Select from Gallery</h2>
                <p className="text-xs text-white/40">Or drag and drop an image</p>
            </label>

            <div className="flex items-center w-full">
                <img src="" alt="" className="bg-zinc-950 p-1 rounded-full" />
                <input type="text" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} 
                placeholder="caption" name="postCaption" />
            </div>
        </form>

        <Navbar page="New Post" />
    </main>
}

export default CreatePost;