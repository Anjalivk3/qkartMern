import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { registerUser } from "../services/authService";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: ""
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {

        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

    };

    const validateForm = () => {

        if (!formData.name.trim()) {
            return "Name is required";
        }

        if (!formData.email.trim()) {
            return "Email is required";
        }

        const emailRegex =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            return "Invalid email";
        }

        if (formData.password.length < 6) {
            return "Password must be at least 6 characters";
        }

        return "";

    };

    const handleSubmit = async (e) => {

        e.preventDefault();

        const validationError = validateForm();

        if (validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);
        setError("");
        setSuccess("");

        try {

            const data = await registerUser(formData);
            setSuccess(data.message);
            setTimeout(() => {
                navigate("/login");
            }, 1500);

        } catch (error) {

            setError(
                error.response?.data?.message ||
                "Registration failed"
            );

        } finally {

            setLoading(false);

        }

    };

    return (

        <div>

            <h2>Register</h2>

            <form onSubmit={handleSubmit}>

                <input
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                />

                <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="newpassword"
                />

                <button
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Registering..." : "Register"}
                </button>

            </form>

            {error && <p>{error}</p>}
            {success && <p>{success}</p>}
        </div>
    );
}

export default Register;