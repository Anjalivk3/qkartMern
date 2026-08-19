import axiosInstance from "./axios";

export const getAddresses = async () => {

    const response = await axiosInstance.get("/addresses");

    return response.data;
};

export const addAddress = async (addressData) => {

    const response = await axiosInstance.post(
        "/addresses",
        addressData
    );

    return response.data;
};

export const updateAddress = async (id, addressData) => {

    const response = await axiosInstance.put(
        `/addresses/${id}`,
        addressData
    );

    return response.data;
};

export const deleteAddress = async (id) => {

    const response = await axiosInstance.delete(
        `/addresses/${id}`
    );

    return response.data;
};

export const setDefaultAddress = async (id) => {

    const response = await axiosInstance.patch(
        `/addresses/${id}/default`
    );

    return response.data;
};