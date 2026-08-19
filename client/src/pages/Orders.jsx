import { useEffect, useState } from "react";

import {
    getMyOrders,
    cancelOrder
} from "../services/orderService";

import "../styles/orders.css";

function Orders() {

    const [orders, setOrders] = useState([]);

    const [loading, setLoading] = useState(true);

    const fetchOrders = async () => {

        try {

            const data = await getMyOrders();

            setOrders(data.orders || []);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to load orders"
            );

        } finally {

            setLoading(false);

        }
    };

    useEffect(() => {

        fetchOrders();

    }, []);

    const handleCancel = async (id) => {

        const confirmCancel = window.confirm(
            "Are you sure you want to cancel this order?"
        );

        if (!confirmCancel) {
            return;
        }

        try {

            await cancelOrder(id);

            fetchOrders();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to cancel order"
            );
        }
    };

    if (loading) {
        return <h2>Loading orders...</h2>;
    }

    return (

        <div className="orders-page">

            <h1>My Orders</h1>

            {orders.length === 0 ? (

                <h2>
                    You haven't placed any orders yet.
                </h2>

            ) : (

                orders.map((order) => (

                    <div
                        className="order-card"
                        key={order._id}
                    >

                        <h3>
                            Order ID: {order._id}
                        </h3>

                        <p>
                            Status:{" "}
                            <strong>
                                {order.orderStatus}
                            </strong>
                        </p>

                        <p>
                            Total: ₹{order.totalAmount}
                        </p>

                        <p>
                            Payment:{" "}
                            {order.paymentStatus}
                        </p>

                        <h4>Products</h4>

                        {order.items?.map((item) => (

                            <div
                                key={item.product}
                            >

                                <p>
                                    {item.name ||
                                        item.product?.name}
                                    {" "} × {item.quantity}
                                </p>

                            </div>

                        ))}

                        {order.orderStatus !==
                            "Cancelled" &&
                            order.orderStatus !==
                            "Delivered" && (

                            <button
                                onClick={() =>
                                    handleCancel(
                                        order._id
                                    )
                                }
                            >
                                Cancel Order
                            </button>
                        )}

                    </div>
                ))
            )}

        </div>
    );
}

export default Orders;