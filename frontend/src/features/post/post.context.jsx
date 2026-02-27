import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({children}) {
    const [feed, setFeed] = useState([]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    return <PostContext.Provider value={{feed, setFeed, loading, setLoading, post, setPost}}>
        {children}
    </PostContext.Provider>
}