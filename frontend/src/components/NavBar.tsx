import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useContext';
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
    const { isAuth, dispatch } = useAuthContext();

    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch({ type: "LOGOUT", payload: { user: "", token: "" } });
        navigate("/"); 
    }

    return (
        <div className="container">
            <div className="nav">
                <div className="nav-logo"><Link to="/">
                    <h1 className="logo">JourneyLingua</h1></Link>
                </div>

                { isAuth && 
                    <div className="nav-button">
                        <button className="logout-button" onClick={handleLogout}>Log out</button>
                    </div>
                }

                { !isAuth && 
                    <div className="nav-button">
                        <button className="login-button" onClick={() => navigate("/login")}>Log in</button>
                        <button className="register-button" onClick={() => navigate("/signup")}>Register</button>
                    </div>
                }
                
            </div>
        </div>
    )
}

export default NavBar;