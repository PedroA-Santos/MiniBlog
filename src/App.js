import './App.css';

import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

//PAGES
import Home from './Pages/Home/Home';
import About from './Pages/About/About';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='about' element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
