import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import '../styles/Profile.css';
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';

interface Props {
  locale: 'en' | 'es' | 'pt';
}

const Profile: React.FC<Props> = ({ locale }) => {
  const [jsonData, setJsonData] = useState<any>(null);
  const messages = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages
  };

  useEffect(() => {
    // Retrieve user data from localStorage
    const userData = localStorage.getItem("userData");
    if (userData) {
      setJsonData(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="profile-container">
      <div className="profile">
        <div className="profile-image">
          <img src="../../public/UserProfileImage.png" alt="Profile" />
        </div>

        <div className="profile-details">
          {jsonData ? (
            <>
              <div className="user-data">
                <h3>{jsonData.username}</h3>
                <p><FormattedMessage id="profile.firstName" defaultMessage={messages[locale].profile.firstName} /> {jsonData.firstname}</p>
                <p><FormattedMessage id="profile.lastName" defaultMessage={messages[locale].profile.lastName} /> {jsonData.lastname}</p>
                <p><FormattedMessage id="profile.email" defaultMessage={messages[locale].profile.email} /> {jsonData.email}</p>
              </div>
            </>
          ) : (
              <>
                <div className="user-data">
                  <h3>{messages[locale].profile.username}</h3>
                  <p><FormattedMessage id="profile.firstName" defaultMessage={messages[locale].profile.firstName} /></p>
                  <p><FormattedMessage id="profile.lastName" defaultMessage={messages[locale].profile.lastName} /></p>
                  <p><FormattedMessage id="profile.email" defaultMessage={messages[locale].profile.email} /></p>
                </div>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
