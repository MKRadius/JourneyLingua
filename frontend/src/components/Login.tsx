import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { login } from "../hooks/loginHooks";
import { StateField } from "../interfaces/Field";
import { createInputField } from "../utils/InputField";

// import { ReactSVG } from "react-svg";
import { useAuthContext } from "../hooks/useContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useAuthContext();
    
    const navigate = useNavigate();

    const loginCriteria: StateField[] = [
        createInputField(0, "text", username, "Username", setUsername),
        createInputField(1, "password", password, "Password", setPassword)
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (username === "" || password === "") {
            alert("Please fill in all fields");
            return;
        }

        const loginData = {
            username: username,
            password: password
        }

        const response = await login(loginData);
        const json = await response.json();
        
        if (!response.ok) {
            console.log("Error in logging in");
            console.log(response);
            console.log(json);
            alert("Incorrect username or password");
        }
        if (response.ok) {
            console.log(json);
            dispatch({ type: "LOGIN", payload: { user: json.username, token: json.token } });
            setUsername("");
            setPassword("");
            navigate("/login");
        }
    }

    return (
        <>

            <div className="login-header">
                <div className="logo" onClick={() => navigate("/")}>
                    {/* <MdOutlineAddTask className="logo-icon" size={60}/> */}

                </div>
            </div>

            <div className="login-container">
                <form className="login-form" onSubmit={handleSubmit}>
                    <h1>Login</h1>
                    {loginCriteria.map((c) => (
                        <input 
                            key={c.id}
                            type={c.type}
                            value={c.value}
                            placeholder={c.placeholder}
                            onChange={c.func}
                        />
                        )
                    )}
                    <button type="submit">Login</button>

                    <div className="register-link">
                        <p className="redirect-instruction">Don't have an account?</p>
                        <p className="redirect-link" onClick={() => navigate("/signup")}>Register</p>
                    </div>

                    <div className="forgot-password">
                        {/* <p className="redirect-link" onClick={() => navigate("/ForgotPassword")}>Forgot Password?</p> */}
                        <p onClick={() => {alert("Then try to remeber it")}}>Forgot your password?</p>
                    </div>
                </form>

            </div>

            
        </>
    )
}

export default Login;