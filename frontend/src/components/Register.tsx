import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {register} from "../hooks/registerHooks";

import "../styles/Register.css";
import {StateField} from "../interfaces/Field";
import {createInputField} from "../utils/InputField";
import { useAuthContext } from "../hooks/useContext";
import { useIntl } from 'react-intl';
import { FormattedMessage } from "react-intl";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();
    const intl = useIntl();

    const signupCriteria: StateField[] = [
        createInputField(0, "text", username, "placeholder.username", setUsername),
        createInputField(1, "password", password, "placeholder.username", setPassword),
        createInputField(2, "password", confirmPassword, "placeholder.confirmPassword", setConfirmPassword),
        createInputField(3, "email", email, "placeholder.email", setEmail),
        createInputField(4, "text", firstname, "placeholder.firstname", setFirstname),
        createInputField(5, "text", lastname, "placeholder.lastname", setLastname)
    ];

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (!username || !password || !confirmPassword || !email || !firstname || !lastname) {
            alert("All fields are required");
            return;
        }

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        const user = {
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
                alert("Error occurred while registering user. Please try again.");
                return;
            }

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(json));
                localStorage.setItem('userData', JSON.stringify(json));
                dispatch({ type: "LOGIN", payload: { user: json.user['username'], token: json.token } });
                setUsername("");
                setEmail("");
                setPassword("");
                setConfirmPassword("");
                setFirstname("");
                setLastname("");
                console.log("New user added:", json);
                console.log(user);
                alert("User Added Successfully");
                navigate("/");
            }

        } catch (error) {
            console.error("Error occurred during registration:", error);
            alert("An unexpected error occurred. Please try again later.");
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
                    <h1><FormattedMessage id="register.register"/></h1>
                    {signupCriteria.map((c) => (
                        <input
                            key={c.id}
                            type={c.type}
                            value={c.value}
                            placeholder={intl.formatMessage({ id: c.placeholderId })}
                            onChange={c.func}
                        />
                    ))}
                    <button><FormattedMessage id="register.register"/></button>
                </form>
            </div>
        </>
    )
}

export default Register;