import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { login } from "../hooks/loginHooks";
import { StateField } from "../interfaces/Field";
import { createInputField } from "../utils/InputField";
import { FormattedMessage } from "react-intl";
import { useIntl } from 'react-intl';

// import { ReactSVG } from "react-svg";
import { useAuthContext } from "../hooks/useContext";

const Login: React.FC = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const intl = useIntl();

    const loginCriteria: StateField[] = [
        createInputField(0, "text", username, "placeholder.username", setUsername),
        createInputField(1, "password", password, "placeholder.password", setPassword)
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

        console.log(loginData);

        try {
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
                dispatch({ type: "LOGIN", payload: { user: json.user['username'], token: json.token } });
                setUsername("");
                setPassword("");
                localStorage.setItem("userData", JSON.stringify(json.user));
                navigate("/");
            }
        }catch (error) {
            console.error("Failed to login", error);
            alert("Something went wrong. Check your credentials and try again");
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
                    <h1><FormattedMessage id="login.login"/></h1>
                    {loginCriteria.map((c) => (
                        <input
                            key={c.id}
                            type={c.type}
                            value={c.value}
                            placeholder={intl.formatMessage({ id: c.placeholderId })}
                            onChange={c.func}
                        />    
                    ))}
                    <button type="submit"><FormattedMessage id="login.login"/></button>

                    <div className="register-link">
                        <p className="redirect-instruction"><FormattedMessage id="login.redirectInstruction"/></p>
                        <p className="redirect-link" onClick={() => navigate("/signup")}><FormattedMessage id="login.register"/></p>
                    </div>

                    <div className="forgot-password">
                        {/* <p className="redirect-link" onClick={() => navigate("/ForgotPassword")}>Forgot Password?</p> */}
                        <p onClick={() => {alert("Then try to remember it xd")}}><FormattedMessage id="login.forgotPassword"/></p>
                    </div>
                </form>

            </div>

            
        </>
    )
}

export default Login;