import { data } from "react-router-dom";
import apiClient from "./axiosInstance";

export const getProducts = (category) => apiClient.get("/api/products", {params: { category }});
export const getProduct = (id) => apiClient.get(`/api/products/${id}`);
export const createProduct = (data) => apiClient.post('/api/products/create', data);
export const productImageAdd = (id , data) => apiClient.post(`/api/products/${id}/images`, data, {
    headers: { "Content-Type" : undefined},
});
export const deleteProduct = (id) => apiClient.delete(`/api/products/${id}`);