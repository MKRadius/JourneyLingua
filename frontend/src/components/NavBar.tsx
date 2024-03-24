import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useContext';
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage component
import enMessages from '../locales/en.json'; // Import English translation messages
import esMessages from '../locales/es.json'; // Import Spanish translation messages
import "../styles/NavBar.css";

// Define the type for translation messages
type LocaleMessages = typeof enMessages;

const NavBar: React.FC = () => {
    const { isAuth, dispatch } = useAuthContext();
    const navigate = useNavigate();

    // Get the current locale
    const locale = 'en'; // You can replace this with logic to determine the locale

    // Select messages based on the locale
    const messages: LocaleMessages = locale === 'en' ? enMessages : esMessages;

    const handleLogout = () => {
        dispatch({ type: "LOGOUT", payload: { user: "", token: "" } });
        navigate("/");
    }

    return (
        <div className="container">
            <div className="nav">
                <div className="nav-logo">
                    <Link to="/">
                        <h1 className="logo">JourneyLingua</h1>
                    </Link>
                </div>

                {isAuth ?
                    <div className="nav-button">
                        <button className="logout-button" onClick={handleLogout}><FormattedMessage id="navbar.logout" defaultMessage={messages.navbar.logout} /></button>
                    </div>
                    :
                    <div className="nav-button">
                        <button className="login-button" onClick={() => navigate("/login")}><FormattedMessage id="navbar.login" defaultMessage={messages.navbar.login} /></button>
                        <button className="register-button" onClick={() => navigate("/signup")}><FormattedMessage id="navbar.register" defaultMessage={messages.navbar.register} /></button>
                    </div>
                }

            </div>
        </div>
    )
}

export default NavBar;
