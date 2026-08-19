import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import {Provider} from "react-redux";
import store from "./redux/store";

import App from "./App";
import "./styles/home.css";
import "./styles/global.css";
import "./styles/admin.css";
import "./styles/addresses.css";
import "./styles/cart.css";
import "./styles/orders.css";
import "./styles/checkout.css";
import "./styles/products.css";



import AuthLoader from "./components/AuthLoader";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
        <BrowserRouter>
            <AuthLoader>
                <App />
            </AuthLoader>
        </BrowserRouter>
        </Provider>
    </React.StrictMode>
);