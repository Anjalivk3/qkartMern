import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Products from "./pages/Products";
import Cart from "./pages/Cart"
import AuthTest from "./pages/AuthTest";
import PrivateRoute from "./routes/PrivateRoute";
import PublicRoute from "./routes/PublicRoute";
import ProductDetails from "./pages/ProductDetails";
import Addresses from "./pages/Addresses";
import Orders from "./pages/Orders";
import Checkout from "./pages/Checkout";


import AdminRoute from "./routes/AdminRoute";

import AdminDashboard
    from "./pages/admin/AdminDashboard";

import AdminProducts
    from "./pages/admin/AdminProducts";

import AdminCategories
    from "./pages/admin/AdminCategories";

import AdminOrders
    from "./pages/admin/AdminOrders";

function App() {
    return (
        <Routes>
            <Route
                path="/admin"
                element={
                    <AdminRoute>
                        <AdminDashboard />
                    </AdminRoute>
                }
            />


            <Route
                path="/admin/products"
                element={
                    <AdminRoute>
                        <AdminProducts />
                    </AdminRoute>
                }
            />


            <Route
                path="/admin/categories"
                element={
                    <AdminRoute>
                        <AdminCategories />
                    </AdminRoute>
                }
            />


            <Route
                path="/admin/orders"
                element={
                    <AdminRoute>
                        <AdminOrders />
                    </AdminRoute>
                }
            />
            <Route path="/" element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/login" element={<PublicRoute><Login />
                        </PublicRoute>}/>
                <Route path="/register" element={<PublicRoute><Register />
                        </PublicRoute>}/>                        
                <Route path="/products" element={<Products />} />
                <Route
                    path="/products/:id"
                    element={<ProductDetails />}
                />

                <Route path="/cart" element={<PrivateRoute><Cart />
                        </PrivateRoute>} />

                <Route
                    path="/checkout"
                    element={
                        <PrivateRoute>
                            <Checkout />
                        </PrivateRoute>
                    }
                />         

                <Route
                    path="/addresses"
                    element={
                        <PrivateRoute>
                            <Addresses />
                        </PrivateRoute>
                    }
                />

                <Route
                    path="/orders"
                    element={
                        <PrivateRoute>
                            <Orders />
                        </PrivateRoute>
                    }
                />

                         


                {/* <Route path="auth-test" element={<AuthTest />} /> */}
            </Route>

            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;