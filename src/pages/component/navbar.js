import React, {useState} from 'react';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { Navbar, Nav, Toggle } from 'rsuite';

function Navbars (props) {

    return(
        <>
            <Navbar style={{ verticalAlign: 'middle', display: 'flex', alignItems: 'center', background: props.darkmode ? '#121212' : ''}}>
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
                <Nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '10px'}}>
                    <span style={{ marginRight: '10px'}}>
                        🌝 <Toggle onChange={() => props.setdarkmode(!props.darkmode)} defaultChecked={props.darkmode}/> 🌚
                    </span>
                    <span>
                        <a href="/signup" style={{ textDecoration: 'none', color: props.darkmode ? '#fff' : '#121212'}}>
                            Sign Up
                        </a>
                    </span>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navbars;