import {useState} from "react";
import {useNavigate} from "react-router-dom";
import { FormattedMessage } from 'react-intl';
import {register} from "../hooks/registerHooks";

import "../styles/Register.css";
import {StateField} from "../interfaces/Field";
import {createInputField} from "../utils/InputField";
import { useAuthContext } from "../hooks/useContext";
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';
import {UserRegister} from "../interfaces/User.tsx";


const Register: React.FC<{ locale: 'en' | 'es' | 'pt' | 'ua' | 'ru'| 'vn' }> = ({ locale }) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const messages = {
        en: enMessages,
        es: esMessages,
        pt: ptMessages,
        ua: uaMessages,
        ru: ruMessages,
        vn: vnMessages
    };

    const signupCriteria: StateField[] = [
        createInputField(0, "text", username, messages[locale].register.placeholders.username, setUsername),
        createInputField(1, "password", password, messages[locale].register.placeholders.password, setPassword),
        createInputField(2, "password", confirmPassword, messages[locale].register.placeholders.confirmPassword, setConfirmPassword),
        createInputField(3, "email", email, messages[locale].register.placeholders.email, setEmail),
        createInputField(4, "text", firstname, messages[locale].register.placeholders.firstname, setFirstname),
        createInputField(5, "text", lastname, messages[locale].register.placeholders.lastname, setLastname)
    ];


    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword || !email || !firstname || !lastname) {
            alert(messages[locale].register.alerts.allFieldsRequired);
            return;
        }

        if (password !== confirmPassword) {
            alert(messages[locale].register.alerts.passwordsDoNotMatch);
            return;
        }

        const user: UserRegister = {
            username: username,
            password: password,
            firstname: firstname,
            lastname: lastname,
            email: email
        };

        try {
            const response = await register(user);
            const json = await response.json();

            if (!response.ok) {
                console.error("Error in adding user:", response.statusText);
                alert(messages[locale].register.alerts.registrationError);
                return;
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                localStorage.setItem('userData', JSON.stringify(json.user));
                dispatch({ type: "LOGIN", payload: { user: json.user, token: json.token } });
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setFirstname("");
                setLastname("");
                console.log("New user added:", json);
                // console.log(user);
                alert(messages[locale].register.alerts.registrationSuccess);
                navigate("/");
            }

        } catch (error) {
            console.error("Error occurred during registration:", error);
            alert(messages[locale].register.alerts.unexpectedError);
        }
    };


    return (
        <>
            <div className="register-header">
                <div className="logo" onClick={() => navigate("/")}>
                    {/* <MdOutlineAddTask className="logo-icon" size={60}/> */}
                </div>
            </div>

            {/* <ReactSVG className="register-svg" src="./undraw_setup_re_y9w8.svg" /> */}

            <div className="register-container">
                <form className="register-form" onSubmit={handleSubmit}>
                    <h1>
                        <FormattedMessage id="register.title" defaultMessage={messages[locale].register.title} />
                    </h1>
                    {signupCriteria.map((c) => (
                        <input
                            key={c.id}
                            type={c.type}
                            value={c.value}
                            placeholder={c.placeholder}
                            onChange={c.func}
                        />
                    ))}
                    <button>
                        <FormattedMessage id="register.button" defaultMessage={messages[locale].register.button} />
                    </button>
                </form>
            </div>
        </>
    )
}

export default Register;