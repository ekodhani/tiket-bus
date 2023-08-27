import React from 'react';
import { Sidenav, Nav, Navbar, Toggle, Button, Dropdown } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';
import { Link } from 'react-router-dom';

function SideNavMenu (props) {

    return(
        <>
        <div style={{width: 240}}>
            <Sidenav expanded={props.exp} defaultOpenKeys={['3', '4']} appearance={props.darkMode ? 'subtle' : ''}>
                <Sidenav.Body>
                    <Nav activeKey={props.active} onSelect={props.setActive}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} style={{ textDecoration: 'none' }}>
                            <Link to="/menu" style={{ textDecoration: 'none', color: props.darkMode ? '#aeaeae' : '#333333' }}>
                                Dashboard
                            </Link>
                        </Nav.Item>
                        <Nav.Menu eventKey="2" title="Transaksi" icon={<MagicIcon />} style={{ textDecoration: 'none' }}>
                            <Nav.Item eventKey="2-1">
                                <Link to="/belumbayar" style={{ textDecoration: 'none', color: props.darkMode ? '#aeaeae' : '#333333' }}>
                                    Belum Bayar
                                </Link>
                            </Nav.Item>
                            <Nav.Item eventKey="2-2">
                                <Link to="/riwayattransaksi" style={{ textDecoration: 'none', color: props.darkMode ? '#aeaeae' : '#333333' }}>
                                    Riwayat Transaksi
                                </Link>
                            </Nav.Item>
                        </Nav.Menu>
                        <Nav.Item eventKey="3" icon={<GroupIcon />} style={{ textDecoration: 'none' }}>
                            <Link to="/rekomendasi" style={{ textDecoration: 'none', color: props.darkMode ? '#aeaeae' : '#333333' }}>
                                Rekomendasi
                            </Link>
                        </Nav.Item>
                        <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />} style={{ textDecoration: 'none' }}>
                            <Nav.Item eventKey="4-1">Applications</Nav.Item>
                            <Nav.Item eventKey="4-2">Channels</Nav.Item>
                            <Nav.Item eventKey="4-3">Versions</Nav.Item>
                        </Nav.Menu>
                    </Nav>
                </Sidenav.Body>
            </Sidenav>
        </div>
        </>
    )
}

export default SideNavMenu;