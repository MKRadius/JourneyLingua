import React from 'react';
import { FormattedMessage } from 'react-intl';
import { useAuthContext } from '../hooks/useContext';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/NavBar.css';

// Import translation messages
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';

interface Props {
  locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn';
  setLocale: (locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' |'vn') => void;
}

const NavBar: React.FC<Props> = ({ locale, setLocale }) => {
    const { isAuth, dispatch } = useAuthContext();
    const navigate = useNavigate();

    // Select messages based on the locale
    const messages = {
        en: enMessages,
        es: esMessages,
        pt: ptMessages,
        ua: uaMessages,
        ru: ruMessages,
        vn: vnMessages
    };

    const handleLogout = () => {
        dispatch({ type: "LOGOUT", payload: { user: "", token: "" } });
        navigate("/");
    }

    const handleLocaleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const newLocale = event.target.value as 'en' | 'es' | 'pt';
        setLocale(newLocale);
    }

    return (
        <div className="container">
            <div className="nav">
                <div className="nav-logo">
                    <Link to="/">
                        <h1 className="logo">JourneyLingua</h1>
                    </Link>
                </div>
                <div className="locale-select">
                    <select value={locale} onChange={handleLocaleChange}>
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="pt">Portuguese</option>
                        <option value="ua">Ukrainian</option>
                        <option value="ru">Russian</option>
                        <option value="vn">Vietnamese</option>
                    </select>
                </div>

                {isAuth ?
                    <div className="nav-button">
                        <button className="logout-button" onClick={handleLogout}>
                            <FormattedMessage id="navbar.logout" defaultMessage={messages[locale].navbar.logout} />
                        </button>
                    </div>
                    :
                    <div className="nav-button">
                        <button className="login-button" onClick={() => navigate("/login")}>
                            <FormattedMessage id="navbar.login" defaultMessage={messages[locale].navbar.login} />
                        </button>
                        <button className="register-button" onClick={() => navigate("/signup")}>
                            <FormattedMessage id="navbar.register" defaultMessage={messages[locale].navbar.register} />
                        </button>
                    </div>
                }
            </div>
        </div>
    )
}

export default NavBar;
