// Inside your component
import React from 'react';
import { FormattedMessage } from 'react-intl'; // Import FormattedMessage component
import enMessages from '../locales/en.json'; // Import English translation messages
import esMessages from '../locales/es.json'; // Import Spanish translation messages

    // Define the type for translation messages
    type LocaleMessages = typeof enMessages;

const Home: React.FC = () => {

        
        // Get the current locale
        const locale = 'en'; // You can replace this with logic to determine the locale

        // Select messages based on the locale
        const messages: LocaleMessages = locale === 'en' ? enMessages : esMessages;
    return (
        <div>
            <div className="home-container">
                <h1><FormattedMessage id="home.welcome" defaultMessage={messages.home.welcome}/></h1>
                <p><FormattedMessage id="home.start_learning" defaultMessage={messages.home.start_learning}/></p>
                <button className="start-learning-button"><FormattedMessage id="home.start_learning" defaultMessage={messages.home.start_learning}/></button>
            </div>
        </div>
    );
};

export default Home;
