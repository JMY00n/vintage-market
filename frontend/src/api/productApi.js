import { data } from "react-router-dom";
import apiClient from "./axiosInstance";

export const getProducts = () => apiClient.get("/api/products");
export const getProduct = (id) => apiClient.get(`/api/products/${id}`);