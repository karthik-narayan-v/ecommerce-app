import axiosInstance from './axiosConfig';

export const fetchAllProducts = () => axiosInstance.get('/products');
export const fetchProductById = (id) => axiosInstance.get(`/products/${id}`);
