import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
    getCart,
    updateCartItem,
    removeFromCart
} from "../services/cartService";

function Cart() {

    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    const fetchCart = async () => {

        try {

            setLoading(true);
            setError("");

            const data = await getCart();

            setCart(data.cart);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Failed to load cart"
            );

        } finally {

            setLoading(false);

        }
    };


    useEffect(() => {

        fetchCart();

    }, []);


    const handleIncrease = async (item) => {

        try {

            await updateCartItem(
                item.product._id,
                item.quantity + 1
            );

            fetchCart();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }
    };


    const handleDecrease = async (item) => {

        if (item.quantity <= 1) {
            return;
        }

        try {

            await updateCartItem(
                item.product._id,
                item.quantity - 1
            );

            fetchCart();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to update cart"
            );

        }
    };


    const handleRemove = async (productId) => {

        try {

            await removeFromCart(productId);

            fetchCart();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to remove item"
            );

        }
    };


    // Loading
    if (loading) {
        return (
            <div className="cart-page">
                <h2>Loading cart...</h2>
            </div>
        );
    }


    // Error
    if (error) {
        return (
            <div className="cart-page">
                <h2>{error}</h2>

                <Link to="/products">
                    Continue Shopping
                </Link>
            </div>
        );
    }


    // Empty cart
    if (!cart || !cart.items || cart.items.length === 0) {

        return (

            <div className="cart-page empty-cart">

                <h1>Your Cart</h1>

                <h2>Your cart is empty</h2>

                <Link to="/products">
                    Continue Shopping
                </Link>

            </div>

        );
    }


    // Calculate total
    let total = 0;

    cart.items.forEach((item) => {

        total +=
            item.product.price *
            item.quantity;

    });


    return (

        <div className="cart-page">

            <h1>Your Cart</h1>


            <div className="cart-container">


                {/* LEFT SIDE */}

                <div className="cart-items">

                    {cart.items.map((item) => (

                        <div
                            key={item.product._id}
                            className="cart-item"
                        >

                            <img
                                src={
                                    item.product.images?.[0]?.url
                                }
                                alt={item.product.name}
                            />


                            <div className="cart-item-info">

                                <h3>
                                    {item.product.name}
                                </h3>


                                <p className="cart-price">
                                    ₹{item.product.price}
                                </p>


                                <div className="quantity">

                                    <button
                                        onClick={() =>
                                            handleDecrease(item)
                                        }
                                    >
                                        −
                                    </button>


                                    <span>
                                        {item.quantity}
                                    </span>


                                    <button
                                        onClick={() =>
                                            handleIncrease(item)
                                        }
                                    >
                                        +
                                    </button>

                                </div>


                                <button
                                    className="remove-btn"
                                    onClick={() =>
                                        handleRemove(
                                            item.product._id
                                        )
                                    }
                                >
                                    Remove
                                </button>

                            </div>

                        </div>

                    ))}

                </div>


                {/* RIGHT SIDE */}

                <div className="cart-summary">

                    <h2>
                        Order Summary
                    </h2>


                    <div className="summary-row">

                        <span>
                            Items
                        </span>

                        <span>
                            {cart.items.length}
                        </span>

                    </div>


                    <div className="summary-row total-row">

                        <span>
                            Total
                        </span>

                        <strong>
                            ₹{total}
                        </strong>

                    </div>


                    <Link to="/checkout">

                        <button className="checkout-btn">
                            Proceed to Checkout
                        </button>

                    </Link>

                </div>

            </div>

        </div>
    );
}

export default Cart;