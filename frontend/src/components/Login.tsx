import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";

import { login } from "../hooks/loginHooks";
import { StateField } from "../interfaces/Field";
import { createInputField } from "../utils/InputField";

// import { ReactSVG } from "react-svg";
import { useAuthContext } from "../hooks/useContext";

import { FormattedMessage } from 'react-intl';
// Import translation messages
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';

interface Props {
    locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn';
}
  

const Login: React.FC<Props> = ({ locale }) => {
    const messages = {
        en: enMessages,
        es: esMessages,
        pt: ptMessages,
        ua: uaMessages,
        ru: ruMessages,
        vn: vnMessages
    };

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const loginCriteria: StateField[] = [
        createInputField(0, "text", username, messages[locale].login.usernamePlaceholder, setUsername),
        createInputField(1, "password", password, messages[locale].login.passwordPlaceholder, setPassword)
    ];

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username === "" || password === "") {
            alert(messages[locale].login.alerts.fillAllFields);
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
                alert(messages[locale].login.alerts.incorrectCredentials);
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
            alert(messages[locale].login.alerts.somethingWentWrong);
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
                    <h1>
                        <FormattedMessage id="login.title" defaultMessage={messages[locale].login.title} />
                    </h1>
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
                    <button type="submit">
                        <FormattedMessage id="login.button" defaultMessage={messages[locale].login.button} />
                    </button>

                    <div className="register-link">
                        <p className="redirect-instruction">
                            <FormattedMessage id="login.redirectInstruction" defaultMessage={messages[locale].login.redirectInstruction} />
                        </p>
                        <p className="redirect-link" onClick={() => navigate("/signup")}>
                            <FormattedMessage id="login.redirectLink" defaultMessage={messages[locale].login.redirectLink} />
                        </p>
                    </div>

                    <div className="forgot-password">
                        {/* <p className="redirect-link" onClick={() => navigate("/ForgotPassword")}>Forgot Password?</p> */}
                        <p onClick={() => {
                            const forgotPasswordMessage = messages[locale].login.alerts.forgotPasswordMessage;
                            alert(forgotPasswordMessage);
                        }}>
                            <FormattedMessage id="login.forgotPassword" defaultMessage={messages[locale].login.forgotPassword} />
                        </p>
                    </div>
                </form>

            </div>

            
        </>
    )
}

export default Login;