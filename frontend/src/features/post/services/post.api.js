import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_API_URL}/api/posts`,
    withCredentials: true
});

export async function getFeed() {
    const response = await api.get("/feed");
    return response.data;
}