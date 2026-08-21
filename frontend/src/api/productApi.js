import apiClient from "./axiosInstance";

export const getProducts = (category, keyword, onSaleOnly) => apiClient.get("/api/products", {params: { category, keyword, onSaleOnly }});

export const getProduct = (id) => apiClient.get(`/api/products/${id}`);

export const createProduct = (data) => apiClient.post('/api/products/create', data);

export const productImageAdd = (id , data) => apiClient.post(`/api/products/${id}/images`, data, {
    headers: { "Content-Type" : undefined},
});

export const deleteProduct = (id) => apiClient.delete(`/api/products/${id}`);

export const updateProduct = (id, formData) => {
    return apiClient.put(`/api/products/${id}`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};

export const updateProductStatus = (id, status) => {
    return apiClient.patch(`/api/products/${id}/status`, {status});
};