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

                <div className="nav-logo">
                    <div className="logo">
                        <Link to="/">
                        <img className="desktop-logo" src="../../public/Journey_Lingua_logo.webp" alt="Company Logo"/>
                        <img className="mobile-logo" src="../../public/Journey_Lingua_logo_with_text.webp" alt="Company Logo" />
                        </Link>
                        </div>
                    <Link to="/">
                        <h1 className="logo">JourneyLingua</h1></Link>
                </div>

                {isAuth &&
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