import { data } from "react-router-dom";
import apiClient from "./axiosInstance";

export const signUp = (data) => apiClient.post("/api/auth/signup", data);

export const login = (data) => apiClient.post("/api/auth/login", data);