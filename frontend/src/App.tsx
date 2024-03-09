import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/Home'
import Learn from './components/Learn'
import Login from './components/Login'
import Register from './components/Register'

import { useAuthContext } from './hooks/useContext'

import './styles/App.css'
import NavBar from "./components/NavBar.tsx";
import ImageToTextEx from "./components/ImageToTextEx.tsx";
import MakeASentenceEx from "./components/MakeASentenceEx.tsx";

const App: React.FC = () => {
  const { user, token, isAuth } = useAuthContext();

  return (
    <>
      <BrowserRouter basename='/'>
        <NavBar />
        <Routes>
          <Route path="/" element={ !(user && token && isAuth) ? <Home /> : <Learn /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Register /> } />
          <Route path="/profile" element={ <Learn /> } />
          <Route path="/image-to-text" element={ <ImageToTextEx />} />
          <Route path="/make-a-sentence" element={ <MakeASentenceEx />} />

        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
