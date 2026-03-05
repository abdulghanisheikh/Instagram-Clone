import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    withCredentials: true
});

export async function follow(followeeUsername) {
    const response = await api.post(`/api/users/follow/${followeeUsername}`);
    return response.data;
}

export async function unfollow(followeeUsername) {
    const response = await api.post(`/api/users/unfollow/${followeeUsername}`);
    return response.data;
}

export async function acceptFollow(followID) {
    const response = await api.post(`/api/users/follow/${followID}/accept`);
    return response.data;
}

export async function rejectFollow(followID) {
    const response = await api.post(`/api/users/follow/${followID}/reject`);
    return response.data;
}

export async function getAllFollows() {
    const response = await api.get("/api/users/allFollows");
    return response.data;
}

export async function removeFollower(followerUsername) {
    const response = await api.post(`/api/users/removeFollower/${followerUsername}`);
    return response.data;
}

export async function getMe() {
    const response = await api.get("/api/auth/getMe");
    return response.data;
}

export async function cancelRequest(followeeUsername) {
    const response = await api.post(`/api/users/cancelRequest/${followeeUsername}`);
    return response.data;
}

export async function getSuggestedUsers() {
    const response = await api.get("/api/users/suggestions");
    return response.data;
}