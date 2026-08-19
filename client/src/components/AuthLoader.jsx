import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { setUser, logout } from "../redux/slices/authSlice";
import { getProfile } from "../services/authService";

function AuthLoader({ children }) {

    const dispatch = useDispatch();

    useEffect(() => {

        const loadUser = async () => {

            const token = localStorage.getItem("token");
            
            if (!token) return;

            try {
                const data = await getProfile();
                dispatch(setUser(data.user));
            } catch {
                dispatch(logout());
            }

        };

        loadUser();

    }, [dispatch]);

    return children;
}

export default AuthLoader;