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

export async function createPost(imageFile, caption) {
    const formData = new FormData();
    formData.append("image", imageFile);
    formData.append("caption", caption);

    const response = await api.post("/api/posts/", formData);
    return response.data;
}

export async function getUsers() {
    const response = await api.get("/api/users/");
    return response.data;
}