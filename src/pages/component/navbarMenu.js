import React from 'react';
import { Sidenav, Nav, Navbar, Toggle, Button, Dropdown } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

function NavbarMenu (props) {

    return(
        <>
        <Navbar style={{ verticalAlign: 'middle', display: 'flex', alignItems: 'center'}}>
            <Navbar.Brand style={{ width: 240, textAlign: 'center', fontWeight:'bold'}}>Flw Travel</Navbar.Brand>
            <Nav style={{ display: 'flex', verticalAlign: 'middle'}}>
                <Toggle
                    onChange={props.setExp}
                    checked={props.exp}
                    checkedChildren="Expand"
                    unCheckedChildren="Collapse"
                />
            </Nav>
            <Nav style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', padding: '10px'}}>
                <span style={{ marginRight: '10px'}}>
                    🌝 <Toggle /> 🌚
                </span>
                <span>
                    <Dropdown trigger="hover" placement="leftStart" title="Profile">
                    <Dropdown.Item panel style={{ padding: 10, width: 160 }}>
                        <div style={{ display: 'flex', alignItems: 'center'}}>
                            <img src={props.images} title={props.username} style={{ width: '50px', height: '50px', borderRadius: '50%', position: 'relative', marginRight: '10px', boxShadow: '0 5px 15px 0 #eaeaea' }}/>
                            <div>
                                <strong>{props.username}</strong><br />
                                <small>Signed in</small>
                            </div>
                        </div>
                        <hr style={{ border: '1px solid #eaeaea'}}></hr>
                    </Dropdown.Item>
                        <Dropdown.Item><GearCircleIcon /> Settings</Dropdown.Item>
                        <Dropdown.Item><AdminIcon /> Profile</Dropdown.Item>
                        <Dropdown.Item><ExitIcon /> <a href="/logout">Logout</a></Dropdown.Item>
                    </Dropdown>
                </span>
            </Nav>
        </Navbar>
        </>
    )
}

export default NavbarMenu;