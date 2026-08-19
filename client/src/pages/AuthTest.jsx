import { useDispatch, useSelector } from "react-redux";

import {
    loginSuccess,
    logout
} from "../redux/slices/authSlice";

function AuthTest() {

    const dispatch = useDispatch();

    const auth = useSelector(
        state => state.auth
    );

    const handleLogin = () => {

        dispatch(
            loginSuccess({
                user: {
                    name: "Kamlesh",
                    email: "kamlesh@gmail.com"
                },
                token: "sample_jwt_token"
            })
        );
    };

    return (

        <div>
            <h2>Authentication Test</h2>
            <pre>
                {JSON.stringify(auth, null, 2)}
            </pre>
            <button onClick={handleLogin}>
                Login
            </button>
            <button onClick={() => dispatch(logout())}>
                Logout
            </button>
        </div>
    );
}

export default AuthTest;