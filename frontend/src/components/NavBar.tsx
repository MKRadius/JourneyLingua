import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useContext';
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage component
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


                <div className="nav-button">
                    <div className="language-selector">
                        <select>
                            <option value="en">🇺🇸 English</option>
                            <option value="es">🇵🇹 Português</option>
                        </select>
                    </div>
                    
                    { isAuth ? 
                        <button className="logout-button" onClick={handleLogout}><FormattedMessage id="nav.logout"/></button>
                        : <>
                            <button className="login-button" onClick={() => navigate("/login")}><FormattedMessage id="nav.login"/></button>
                            <button className="register-button" onClick={() => navigate("/signup")}><FormattedMessage id="nav.register"/></button>
                        </>
                        }
                </div>
            </div>
        </div>
    )
}

export default NavBar;