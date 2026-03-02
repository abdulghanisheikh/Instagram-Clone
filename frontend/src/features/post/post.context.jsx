import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
    const [feed, setFeed] = useState([]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [follows, setFollows] = useState([]);
    const [user, setUser] = useState(null);

    return <PostContext.Provider value={{feed, setFeed, loading, setLoading, post, setPost, follows, setFollows, user, setUser}}>
        {children}
    </PostContext.Provider>
}