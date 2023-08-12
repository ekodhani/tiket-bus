import React, {useState} from 'react';
import HomeIcon from '@rsuite/icons/legacy/Home';
import { Navbar, Nav, Toggle } from 'rsuite';
import { Link } from 'react-router-dom';

function Navbars (props) {

    return(
        <>
            <Navbar style={{ verticalAlign: 'middle', display: 'flex', alignItems: 'center', background: props.darkmode ? '#121212' : ''}}>
                <Navbar.Brand>Flw Travel</Navbar.Brand>
                <Nav>
                <Nav.Item icon={<HomeIcon />}>
                    <Link to="/" style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>Home</Link>
                </Nav.Item>
                <Nav.Item style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                    News
                </Nav.Item>
                <Nav.Item style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                    Products
                </Nav.Item>
                <Nav.Menu title="About" style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                    <Nav.Item style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                    Company
                    </Nav.Item>
                    <Nav.Item style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                    Team
                    </Nav.Item>
                </Nav.Menu>
                </Nav>
                <Nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '10px'}}>
                    <span style={{ marginRight: '10px'}}>
                        🌝 <Toggle onChange={() => props.setdarkmode(!props.darkmode)} defaultChecked={props.darkmode}/> 🌚
                    </span>
                    <span>
                        <Link to="/signup" style={{ textDecoration: 'none', color: props.darkmode ? '#aeaeae' : '#000'}}>
                            Sign Up
                        </Link>
                    </span>
                </Nav>
            </Navbar>
        </>
    )
}

export default Navbars;