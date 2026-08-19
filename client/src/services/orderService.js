import axiosInstance from "./axios";


export const getAllOrders = async () => {

    const response = await axiosInstance.get(
        "/orders"
    );

    return response.data;

};


export const updateOrderStatus = async (
    id,
    orderStatus
) => {

    const response = await axiosInstance.patch(
        `/orders/${id}/status`,
        {
            orderStatus
        }
    );

    return response.data;

};




export const createOrder = async () => {

    const response = await axiosInstance.post("/orders");

    return response.data;
};

export const getMyOrders = async () => {

    const response = await axiosInstance.get("/orders");

    return response.data;
};

export const getOrderById = async (id) => {

    const response = await axiosInstance.get(
        `/orders/${id}`
    );

    return response.data;
};

export const cancelOrder = async (id) => {

    const response = await axiosInstance.patch(
        `/orders/${id}/cancel`
    );

    return response.data;
};