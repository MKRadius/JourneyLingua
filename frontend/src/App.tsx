import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './components/Home'
import Learn from './components/Learn'
import Login from './components/Login'
import Register from './components/Register'

import { useAuthContext } from './hooks/useContext'

import './styles/App.css'

const App: React.FC = () => {
  const { user, token, isAuth } = useAuthContext();

  return (
    <>
      <BrowserRouter basename='/'>   
        <Routes>
          <Route path="/" element={ !(user && token && isAuth) ? <Home /> : <Learn /> } />
          <Route path="/login" element={ <Login /> } />
          <Route path="/signup" element={ <Register /> } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App;
