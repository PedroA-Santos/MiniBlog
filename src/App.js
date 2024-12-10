import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { onAuthStateChanged } from 'firebase/auth';

//hooks
import { useState, useEffect } from 'react';
import { useAuthentication } from './hooks/useAuthentication';

//context

import { AuthProvider } from './context/AuthContext';

//PAGES
import Home from './Pages/Home/Home';
import About from './Pages/About/About';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';

//COMPONENTES
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CreatePost from './Pages/CreatePost/CreatePost';
import Dashboard from './Pages/Dashboard/Dashboard';



function App() {


  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()

  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>carregando...</p>
  }

  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <Navbar />
          <div className="container">
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='about' element={<About />} />
              <Route path='/login' element={!user ? <Login /> : <Navigate to="/login" />} />
              <Route path='/register' element={!user ? <Register /> : <Navigate to="/login" />} />
              <Route path='/posts/crate' element={user ? <CreatePost /> : <Navigate to="/login" />} />
              <Route path='dashboard' element={user ? <Dashboard /> : <Navigate to="/login" />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
