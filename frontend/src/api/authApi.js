import apiClient from "./axiosInstance";

export const signUp = (data) => apiClient.post("/api/auth/signup", data);