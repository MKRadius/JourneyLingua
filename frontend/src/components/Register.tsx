import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { register } from "../hooks/registerHooks";

import "../styles/Register.css";
import { StateField } from "../interfaces/Field";
import { createInputField } from "../utils/InputField";

const Register: React.FC = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");

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

        const response = await register(user);        
        const json = await response.json();

        if (!response.ok) {
            console.log("Error in adding user");
            console.log(response);
        }
        if (response.ok) {
            setUsername("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
            setFirstname("");
            setLastname("");
            console.log("New user added:", json);
            alert("User Added Successfully");
            navigate("/login");
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