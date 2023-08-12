import React, { useState } from 'react';
import { Container } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Home from './pages/home.js';
import Menu from './pages/menus/menu.js';
import BelumBayar from './pages/menus/belumbayar.js';
import RiwayatTransaksi from './pages/menus/riwayattransaksi.js';

function App() {
  const[darkMode, setDarkMode] = useState(false)
  
  // NAVIGASI
  const NavigationBar = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)} />}/>
          <Route path="/signup" element={<SignUp darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/signin" element={<SignIn darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/menu" element={<Menu darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/belumbayar" element={<BelumBayar darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/riwayattransaksi" element={<RiwayatTransaksi darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/rekomendasi" element={<Menu darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
          <Route path="/logout" element={<Home darkMode={darkMode} setdarkmode={(e) => setDarkMode(e)}/>} />
        </Routes>
      </Router>
    )
  }

  return (
    <>
      <Container style={{ background : darkMode ? '#171717' : '', height: '100vh'}}>
        <NavigationBar />
      </Container>
    </>
  );
}

export default App;
