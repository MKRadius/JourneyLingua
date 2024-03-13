import {useState} from "react";
import {useNavigate} from "react-router-dom";

import {register} from "../hooks/registerHooks";

import "../styles/Register.css";
import {StateField} from "../interfaces/Field";
import {createInputField} from "../utils/InputField";
import { useAuthContext } from "../hooks/useContext";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

    const { dispatch } = useAuthContext();
    const navigate = useNavigate();

    const signupCriteria: StateField[] = [
        createInputField(0, "text", username, "Username", setUsername),
        createInputField(1, "password", password, "Password", setPassword),
        createInputField(2, "password", confirmPassword, "Confirm Password", setConfirmPassword),
        createInputField(3, "email", email, "Email", setEmail),
        createInputField(4, "text", firstname, "First Name", setFirstname),
        createInputField(5, "text", lastname, "Last Name", setLastname)
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
                navigate("/", { state: { jsonData: user }});
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
                    <h1>Sign Up</h1>
                    {signupCriteria.map((c) => (
                        <input
                            key={c.id}
                            type={c.type}
                            value={c.value}
                            placeholder={c.placeholder}
                            onChange={c.func}
                        />
                    ))}
                    <button>Sign Up</button>
                </form>
            </div>
        </>
    )
}

export default Register;