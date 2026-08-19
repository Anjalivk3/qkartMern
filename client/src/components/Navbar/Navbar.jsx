import { Link, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaBars } from "react-icons/fa";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/authSlice";
import "./Navbar.css";

function Navbar() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [menuOpen, setMenuOpen] = useState(false);

    const { user, isAuthenticated } = useSelector(
        (state) => state.auth
    );

    const handleLogout = () => {

        dispatch(logout());

        setMenuOpen(false);

        navigate("/login");
    };

    return (

        <nav className="navbar">

            {/* Logo */}

            <div className="logo">

                <Link to="/">
                    QKart
                </Link>

            </div>


            {/* Navigation */}

            <ul
                className={
                    menuOpen
                        ? "nav-links active"
                        : "nav-links"
                }
            >

                <li>
                    <Link to="/">
                        Home
                    </Link>
                </li>


                <li>
                    <Link to="/products">
                        Products
                    </Link>
                </li>


                {isAuthenticated && (
                    <>
                        <li>
                            <Link to="/cart">
                                <FaShoppingCart />
                                Cart
                            </Link>
                        </li>

                        <li>
                            <Link to="/addresses">
                                Address
                            </Link>
                        </li>

                        <li>
                            <Link to="/orders">
                                Orders
                            </Link>
                        </li>
                    </>
                )}


                {/* Admin link only for admin */}

                {user?.role === "admin" && (
                    <li>
                        <Link to="/admin">
                            Admin
                        </Link>
                    </li>
                )}


                {/* Login/Register for logged-out users */}

                {!isAuthenticated && (
                    <>
                        <li>
                            <Link to="/login">
                                Login
                            </Link>
                        </li>
                        <li>
                            <Link to="/register">
                                Register
                            </Link>
                        </li>
                    </>
                )}


                {/* Logout for logged-in users */}

                {isAuthenticated && (
                    <li>
                        <button
                            className="logout-btn"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </li>
                )}

            </ul>


            {/* Mobile menu button */}

            <button
                className="menu-btn"
                onClick={() =>
                    setMenuOpen(!menuOpen)
                }
            >
                <FaBars />
            </button>

        </nav>

    );
}

export default Navbar;