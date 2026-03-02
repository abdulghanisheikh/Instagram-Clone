import axios from "axios";

const api = new axios.create({
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

export async function getFollowers(followeeUsername) {
    const response = await api.get(`/api/users/`)
}