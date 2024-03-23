import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IntlProviderWrapper from './utils/IntlProviderWrapper'; // Import IntlProviderWrapper
import Home from './components/Home';
import Learn from './components/Learn';
import Login from './components/Login';
import Register from './components/Register';
import { useAuthContext } from './hooks/useContext';
import './styles/App.css';
import NavBar from "./components/NavBar.tsx";
import ImageToTextEx from "./components/ImageToTextEx.tsx";
import MakeASentenceEx from "./components/MakeASentenceEx.tsx";
import enMessages from './locales/en.json'; // Import English messages
import esMessages from './locales/es.json'; // Import Spanish messages

const messages = {
  en: enMessages,
  es: esMessages
};

const App: React.FC = () => {
  const { user, token, isAuth } = useAuthContext();
  const locale = 'es'; // Set default locale here
  const messages = {
    en: {
      "home.welcome": "Welcome to JourneyLingua",
      "home.start_learning": "Start Learning"
    },
    es: {
      "home.welcome": "Bienvenido a JourneyLingua",
      "home.start_learning": "Comenzar a Aprender"
    }
  };

  return (
    <IntlProviderWrapper locale={locale} messages={messages[locale]}>
      <BrowserRouter basename='/'>
        <NavBar />
        <Routes>
          <Route path="/" element={ !(user && token && isAuth) ? <Home /> : <Learn /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Register /> } />
          <Route path="/profile" element={ <Learn /> } />
          <Route path="/image-to-text" element={ (user && token && isAuth) ? <ImageToTextEx /> : <Login /> } />
          <Route path="/make-a-sentence" element={ (user && token && isAuth) ? <MakeASentenceEx /> : <Login /> } />
        </Routes>
      </BrowserRouter>
    </IntlProviderWrapper>
  );
};


export default App;
