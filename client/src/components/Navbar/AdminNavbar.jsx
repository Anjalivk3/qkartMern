import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

function AdminNavbar() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };


    return (
        <nav className="admin-navbar">

            <h2>QKart Admin</h2>

            <div className="admin-links">

                <Link to="/admin">
                    Dashboard
                </Link>

                <Link to="/admin/products">
                    Products
                </Link>

                <Link to="/admin/categories">
                    Categories
                </Link>

                <Link to="/admin/orders">
                    Orders
                </Link>

                <button onClick={handleLogout}>
                    Logout
                </button>

            </div>

        </nav>
    );
}

export default AdminNavbar;