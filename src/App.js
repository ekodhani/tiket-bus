import React from 'react';
import { Navbar, Nav, Toggle, Container } from 'rsuite';
import 'rsuite/dist/rsuite-no-reset.min.css';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/signup.js';
import SignIn from './pages/signin.js';
import Home from './pages/home.js';

function App() {
  
  // NAVIGASI
  const NavigationBar = () => {
    return (
      <Router>
        <Navbar>
          <Navbar.Brand>Flw Travel</Navbar.Brand>
          <Nav>
            <Nav.Item icon={<HomeIcon />} href="/">
              Home
            </Nav.Item>
            <Nav.Item>
              News
            </Nav.Item>
            <Nav.Item>
              Products
            </Nav.Item>
            <Nav.Menu title="About">
              <Nav.Item>
                Company
              </Nav.Item>
              <Nav.Item>
                Team
              </Nav.Item>
            </Nav.Menu>
          </Nav>
          <Nav pullRight>
            <Nav.Item>
            🌝 <Toggle /> 🌚
            </Nav.Item>
            <Nav.Item href="/signup">
              Sign Up
            </Nav.Item>
          </Nav>
        </Navbar>

        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
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
