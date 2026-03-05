import { createContext, useState } from "react";

export const PostContext = createContext();

export function PostContextProvider({ children }) {
    const [feed, setFeed] = useState([]);
    const [suggestedUsers, setSuggestedUsers] = useState([]);
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [followDocs, setFollowDocs] = useState([]);
    const [user, setUser] = useState(null);

    return <PostContext.Provider value={{feed, setFeed, loading, setLoading, post, setPost, followDocs, setFollowDocs, user, setUser, suggestedUsers, setSuggestedUsers}}>
        {children}
    </PostContext.Provider>
}