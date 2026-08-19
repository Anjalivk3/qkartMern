import { Link } from "react-router-dom";
import AdminNavbar from "../../components/Navbar/AdminNavbar";

function AdminDashboard() {

    return (
        <div>

            <AdminNavbar />

            <div className="admin-container">

                <h1>Admin Dashboard</h1>

                <p>
                    Manage your QKart application.
                </p>

                <div className="admin-cards">

                    <Link
                        to="/admin/products"
                        className="admin-card"
                    >
                        <h2>Products</h2>

                        <p>
                            Add, edit and delete products.
                        </p>
                    </Link>

                    <Link
                        to="/admin/categories"
                        className="admin-card"
                    >
                        <h2>Categories</h2>

                        <p>
                            Manage product categories.
                        </p>
                    </Link>

                    <Link
                        to="/admin/orders"
                        className="admin-card"
                    >
                        <h2>Orders</h2>

                        <p>
                            View and update orders.
                        </p>
                    </Link>

                </div>

            </div>

        </div>
    );
}

export default AdminDashboard;