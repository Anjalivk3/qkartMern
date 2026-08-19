import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAddresses } from "../services/addressService";
import { createOrder } from "../services/orderService";


function Checkout() {

    const navigate = useNavigate();

    const [addresses, setAddresses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [placingOrder, setPlacingOrder] = useState(false);

    const fetchAddresses = async () => {
        try {

            const data = await getAddresses();

            setAddresses(data.addresses || []);

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to load addresses"
            );

        } finally {

            setLoading(false);
        }
    };


    useEffect(() => {

        fetchAddresses();

    }, []);


    const defaultAddress = addresses.find(
        (address) => address.isDefault === true
    );


    const handlePlaceOrder = async () => {

        if (!defaultAddress) {

            alert(
                "Please add and select a default address first."
            );

            return;
        }


        try {

            setPlacingOrder(true);

            await createOrder();

            alert("Order placed successfully!");

            navigate("/orders");

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to place order"
            );

        } finally {

            setPlacingOrder(false);
        }
    };


    if (loading) {

        return (
            <h2>
                Loading checkout...
            </h2>
        );
    }


    return (

        <div className="checkout-page">

            <h1>Checkout</h1>

        <div className="checkout-card">
            <h2>Shipping Address</h2>


            {!defaultAddress ? (

                <div>

                    <p>
                        You don't have a default address.
                    </p>

                    <button className="checkout-button"
                        onClick={() =>
                            navigate("/addresses")
                        }
                    >
                        Add / Select Address
                    </button>

                </div>

            ) : (

                <div className="checkout-address">

                    <h3>
                        {defaultAddress.fullName}
                    </h3>

                    <p>
                        {defaultAddress.mobileNumber}
                    </p>

                    <p>
                        {defaultAddress.addressLine1}
                    </p>

                    {defaultAddress.addressLine2 && (
                        <p>
                            {defaultAddress.addressLine2}
                        </p>
                    )}

                    <p>
                        {defaultAddress.city},{" "}
                        {defaultAddress.state}
                    </p>

                    <p>
                        {defaultAddress.postalCode},{" "}
                        {defaultAddress.country}
                    </p>

                    <strong>
                        Default Address
                    </strong>

                    <br />
                    <br />

                    <button className="checkout-button"
                        onClick={() =>
                            navigate("/addresses")
                        }
                    >
                        Change Address
                    </button>

                </div>
            )}


            <br />


            {defaultAddress && (

                <button
                    className="checkout-button"
                    onClick={handlePlaceOrder}
                    disabled={placingOrder}
                >
                    {placingOrder
                        ? "Placing Order..."
                        : "Place Order"
                    }
                </button>

            )}

            </div>

        </div>
    );
}

export default Checkout;