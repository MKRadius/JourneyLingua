import React from 'react';
import { FormattedMessage } from 'react-intl';
import enMessages from '../locales/en.json';
import esMessages from '../locales/es.json';
import ptMessages from '../locales/pt.json';
import uaMessages from '../locales/ua.json';
import ruMessages from '../locales/ru.json';
import vnMessages from '../locales/vn.json';
import { useNavigate } from 'react-router-dom';
import '../styles/Exercise.css';

interface Props {
  locale: 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn';
}

const Exercise: React.FC<Props> = ({ locale }) => {
  const navigate = useNavigate();
  const messages = {
    en: enMessages,
    es: esMessages,
    pt: ptMessages,
    ua: uaMessages,
    ru: ruMessages,
    vn: vnMessages
  };

  return (
    <div className="exercise-list-container">
      <div className="exercise-list">
        <div className="title">
          <h1>
            <FormattedMessage
              id="exercise.startLearning"
              defaultMessage={messages[locale].exercise.startLearning}
            />
          </h1>
        </div>

        <div className="list-button">
          <button className="exercise-button" onClick={() => navigate("/image-to-text")}>
            <FormattedMessage
              id="exercise.imageToText"
              defaultMessage={messages[locale].exercise.imageToText}
            />
          </button>
          <button className="exercise-button" onClick={() => navigate("/make-a-sentence")}>
            <FormattedMessage
              id="exercise.makeaSentence"
              defaultMessage={messages[locale].exercise.makeaSentence}
            />
          </button>
          <button disabled className="exercise-button">
            <FormattedMessage
              id="exercise.randomize"
              defaultMessage={messages[locale].exercise.randomize}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Exercise;
