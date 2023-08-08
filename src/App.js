import React from 'react';
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
  
  // NAVIGASI
  const NavigationBar = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/belumbayar" element={<BelumBayar />} />
          <Route path="/riwayattransaksi" element={<RiwayatTransaksi />} />
          <Route path="/rekomendasi" element={<Menu />} />
          <Route path="/logout" element={<Home />} />
        </Routes>
      </Router>
    )
  }

  return (
    <>
      <Container>
        <NavigationBar />
      </Container>
    </>
  );
}

export default App;
