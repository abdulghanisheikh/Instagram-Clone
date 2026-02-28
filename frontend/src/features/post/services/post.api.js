import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true
});

export async function getFeed() {
    const response = await api.get("/api/posts/feed");
    return response.data;
}

export async function like(postID) {
    const response = await api.post(`/api/users/like/${postID}`);
    return response.data;
}

export async function dislike(postID) {
    const response = await api.post(`/api/users/dislike/${postID}`);
    return response.data;
}