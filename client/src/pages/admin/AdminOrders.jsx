import { useEffect, useState } from "react";

import AdminNavbar from "../../components/Navbar/AdminNavbar";

import {
    getAllOrders,
    updateOrderStatus
} from "../../services/orderService";


function AdminOrders() {

    const [orders, setOrders] = useState([]);


    const fetchOrders = async () => {

        try {

            const data = await getAllOrders();

            setOrders(
                data.orders || data
            );

        } catch (error) {

            console.log(error);

        }

    };


    useEffect(() => {

        fetchOrders();

    }, []);


    const handleStatusChange = async (
        id,
        status
    ) => {

        try {

            await updateOrderStatus(
                id,
                status
            );

            alert(
                "Order status updated"
            );

            fetchOrders();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update order"
            );

        }

    };


    return (

        <div>

            <AdminNavbar />


            <div className="admin-container">

                <h1>
                    Order Management
                </h1>


                {orders.length === 0 ? (

                    <h3>
                        No orders found
                    </h3>

                ) : (

                    <div className="orders-list">

                        {orders.map((order) => (

                            <div
                                className="order-card"
                                key={order._id}
                            >

                                <h3>
                                    Order ID:
                                    {" "}
                                    {order._id}
                                </h3>


                                <p>
                                    Total:
                                    {" "}
                                    ₹{order.totalAmount}
                                </p>


                                <p>
                                    Status:
                                    {" "}
                                    <strong>
                                        {order.orderStatus}
                                    </strong>
                                </p>


                                <select
                                    value={
                                        order.orderStatus
                                    }
                                    onChange={(e) =>
                                        handleStatusChange(
                                            order._id,
                                            e.target.value
                                        )
                                    }
                                >

                                    <option value="Placed">
                                        Placed
                                    </option>

                                    <option value="Processing">
                                        Processing
                                    </option>

                                    <option value="Shipped">
                                        Shipped
                                    </option>

                                    <option value="Delivered">
                                        Delivered
                                    </option>

                                    <option value="Cancelled">
                                        Cancelled
                                    </option>

                                </select>

                            </div>

                        ))}

                    </div>

                )}

            </div>

        </div>

    );

}

export default AdminOrders;