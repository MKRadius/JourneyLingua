import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { IntlProvider } from 'react-intl';
import Home from './components/Home';
import Learn from './components/Learn';
import Login from './components/Login';
import Register from './components/Register';
import { useAuthContext } from './hooks/useContext';
import './styles/App.css';
import NavBar from "./components/NavBar.tsx";
import ImageToTextEx from "./components/ImageToTextEx.tsx";
import MakeASentenceEx from "./components/MakeASentenceEx.tsx";
import enMessages from './locales/en.json';
import esMessages from './locales/es.json';
import ptMessages from './locales/pt.json';
import uaMessages from './locales/ua.json';
import ruMessages from './locales/ru.json';
import vnMessages from './locales/vn.json';

const messages = {
  en: enMessages,
  es: esMessages,
  pt: ptMessages,
  ua: uaMessages,
  ru: ruMessages,
  vn: vnMessages
};

const App: React.FC = () => {
  const { user, token, isAuth } = useAuthContext();
  const [locale, setLocale] = useState<'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn'>(() => {
    const storedLocale = localStorage.getItem('locale');
    return storedLocale ? (storedLocale as 'en' | 'es' | 'pt' | 'ua' | 'ru' | 'vn') : 'en';
  });

  useEffect(() => {
    localStorage.setItem('locale', locale);
  }, [locale]);

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <BrowserRouter basename='/'>
        <NavBar locale={locale} setLocale={setLocale} />
        <Routes>
          <Route path="/" element={ !(user && token && isAuth) ? <Home locale={locale} /> : <Learn locale={locale} /> } />
          <Route path="/login" element={ <Login locale={locale} /> } />
          <Route path="/signup" element={ <Register locale={locale} /> } />
          <Route path="/profile" element={ <Learn locale={locale} /> } />
          <Route path="/image-to-text" element={ (user && token && isAuth) ? <ImageToTextEx locale={locale} /> : <Login locale={locale} /> } />
          <Route path="/make-a-sentence" element={ (user && token && isAuth) ? <MakeASentenceEx locale={locale} /> : <Login locale={locale} /> } />
        </Routes>
      </BrowserRouter>
    </IntlProvider>
  );
};

export default App;
