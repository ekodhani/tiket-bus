import HomeIcon from '@rsuite/icons/legacy/Home';
import React from 'react';
import { Navbar, Nav, Toggle } from 'rsuite';

function Navbars () {

    return(
        <>
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
        </>
    )
}

export default Navbars;