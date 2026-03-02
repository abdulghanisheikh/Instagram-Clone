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

    return <main className="min-h-screen w-screen bg-black text-white relative py-15">

        <form onSubmit={handleSubmit} className="createPostForm lg:w-1/4 mx-auto w-full flex flex-col gap-5 px-5">
            <div className="w-full flex items-center justify-between py-4">
                <h1 className="text-xl font-semibold">New Post</h1>
                <button type="submit" className="text-lg cursor-pointer border border-emerald-500 bg-emerald-950 px-4 rounded-md active:scale-95 duration-300 ease-in-out">Post</button>
            </div>

            <input ref={postImageInputFieldRef} hidden type="file" name="postImage" id="postImage" />

            <label htmlFor="postImage" className="h-80 flex flex-col cursor-pointer justify-center gap-1 items-center rounded-xl w-full border-2 border-dashed">
                <div className="p-2 rounded-full bg-zinc-800 text-white">
                    <RiImageAddFill size={26}/>
                </div>
                <h2 className="font-semibold">Select from Gallery</h2>
            </label>

            <div className="flex items-start w-full p-2 gap-1">
                <img src={`https://images.unsplash.com/photo-1772107756927-a3975482b1ef?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw1fHx8ZW58MHx8fHx8`} alt="" className="p-1 rounded-full h-10 w-11" />
                <textarea type="text" 
                value={caption} 
                onChange={(e) => setCaption(e.target.value)} 
                placeholder="caption" name="postCaption"
                className="w-full max-h-30 bg-zinc-950 outline-none border-none rounded-md p-2 text-sm" />
            </div>
        </form>

        <Navbar page="New Post" />
    </main>
}

export default CreatePost;