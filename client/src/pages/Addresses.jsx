import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAddresses,
    addAddress,
    deleteAddress,
    setDefaultAddress
} from "../services/addressService";


function Addresses() {

    const navigate = useNavigate();
    const [addresses, setAddresses] = useState([]);
    const [formData, setFormData] = useState({
        fullName: "",
        mobileNumber: "",
        addressLine1: "",
        addressLine2: "",
        city: "",
        state: "",
        postalCode: "",
        country: "India"
    });

    const [loading, setLoading] = useState(true);

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

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        try {

            await addAddress(formData);

            setFormData({
                fullName: "",
                mobileNumber: "",
                addressLine1: "",
                addressLine2: "",
                city: "",
                state: "",
                postalCode: "",
                country: "India"
            });

            fetchAddresses();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to add address"
            );
        }
    };

    const handleDelete = async (id) => {

        try {

            await deleteAddress(id);

            fetchAddresses();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to delete address"
            );
        }
    };

    const handleDefault = async (id) => {

        try {

            await setDefaultAddress(id);

            fetchAddresses();

        } catch (error) {

            alert(
                error.response?.data?.message ||
                "Failed to set default address"
            );
        }
    };

    if (loading) {
        return <h2>Loading addresses...</h2>;
    }

    return (

        <div className="address-page">

            <h1>My Addresses</h1>

            <div className="address-list">

                {addresses.length === 0 && (
                    <p>
                        No address found. Add an address below.
                    </p>
                )}

                {addresses.map((address) => (

                    <div
                        className="address-card"
                        key={address._id}
                    >

                        <h3>
                            {address.fullName}
                        </h3>

                        <p>
                            {address.mobileNumber}
                        </p>

                        <p>
                            {address.addressLine1}
                        </p>

                        {address.addressLine2 && (
                            <p>
                                {address.addressLine2}
                            </p>
                        )}

                        <p>
                            {address.city}, {address.state}
                        </p>

                        <p>
                            {address.postalCode},{" "}
                            {address.country}
                        </p>

                        {address.isDefault && (
                            <strong>
                                Default Address
                            </strong>
                        )}

                        <div>

                            {!address.isDefault && (
                                <button
                                    onClick={() =>
                                        handleDefault(
                                            address._id
                                        )
                                    }
                                >
                                    Make Default
                                </button>
                            )}

                            <button
                                onClick={() =>
                                    handleDelete(
                                        address._id
                                    )
                                }
                            >
                                Delete
                            </button>

                        </div>

                    </div>

                ))}

            </div>

            <hr />
            <div className="addressbtn">
            <h2>Add New Address</h2>
                
            <form
                className="address-form"
                onSubmit={handleSubmit}
            >

                <input
                    name="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                    required
                />

                <input
                    name="mobileNumber"
                    placeholder="Mobile Number"
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    required
                />

                <input
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={formData.addressLine1}
                    onChange={handleChange}
                    required
                />

                <input
                    name="addressLine2"
                    placeholder="Address Line 2"
                    value={formData.addressLine2}
                    onChange={handleChange}
                />

                <input
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleChange}
                    required
                />

                <input
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleChange}
                    required
                />

                <input
                    name="postalCode"
                    placeholder="Postal Code"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                />

                <input
                    name="country"
                    placeholder="Country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                />

                <button type="submit">
                    Add Address
                </button>

            </form>

            {addresses.some(
                (address) => address.isDefault
            ) && (

                <button
                    onClick={() =>
                        navigate("/checkout")
                    }
                >
                    Continue to Place Order
                </button>
            )}
            </div>
        </div>
    );
}

export default Addresses;