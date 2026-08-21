import axiosInstance from "./axios";


// =========================
// GET ALL PRODUCTS
// =========================

export const getProducts = async (params = {}) => {

    const response = await axiosInstance.get(
        "/products",
        {
            params
        }
    );

    return response.data;
};


// =========================
// GET PRODUCT BY ID
// =========================

export const getProductById = async (id) => {

    const response = await axiosInstance.get(
        `/products/${id}`
    );

    return response.data;
};


// =========================
// CREATE PRODUCT
// =========================

export const createProduct = async (formData) => {

    const response = await axiosInstance.post(
        "/products",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


// =========================
// UPDATE PRODUCT
// =========================

export const updateProduct = async (
    id,
    formData
) => {

    const response = await axiosInstance.put(
        `/products/${id}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};


// =========================
// DELETE PRODUCT
// =========================

export const deleteProduct = async (id) => {

    const response = await axiosInstance.delete(
        `/products/${id}`
    );

    return response.data;
};