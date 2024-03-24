import React from 'react';
import { FormattedMessage } from 'react-intl';
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';

interface Props {
  locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn';
}

const Home: React.FC<Props> = ({ locale }) => {
  const messages = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages,
    ua: uaMessages,
    ru: ruMessages,
    vn: vnMessages
  };

  return (
    <div className="home-container">
      <h1><FormattedMessage id="home.welcome" defaultMessage={messages[locale].home.welcome} /></h1>
      <p><FormattedMessage id="home.start_learning" defaultMessage={messages[locale].home.start_learning} /></p>
      <button className="start-learning-button">
        <FormattedMessage id="home.start_learning" defaultMessage={messages[locale].home.start_learning} />
      </button>
    </div>
  );
};

export default Home;
