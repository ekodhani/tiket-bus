import React from 'react';
import { Sidenav, Nav, Navbar, Toggle, Button, Dropdown } from 'rsuite';
import DashboardIcon from '@rsuite/icons/legacy/Dashboard';
import GroupIcon from '@rsuite/icons/legacy/Group';
import AdminIcon from '@rsuite/icons/Admin';
import ExitIcon from '@rsuite/icons/Exit';
import MagicIcon from '@rsuite/icons/legacy/Magic';
import GearCircleIcon from '@rsuite/icons/legacy/GearCircle';

function SideNavMenu (props) {

    return(
        <>
        <div style={{width: 240}}>
            <Sidenav expanded={props.exp} defaultOpenKeys={['3', '4']} appearance={props.darkMode ? 'subtle' : ''}>
                <Sidenav.Body>
                    <Nav activeKey={props.active} onSelect={props.setActive}>
                        <Nav.Item eventKey="1" icon={<DashboardIcon />} href="/menu">
                            Dashboard
                        </Nav.Item>
                        <Nav.Menu eventKey="3" title="Transaksi" icon={<MagicIcon />}>
                            <Nav.Item eventKey="3-1" href="/belumbayar">Belum Bayar</Nav.Item>
                            <Nav.Item eventKey="3-2" href="/riwayattransaksi">Riwayat Transaksi</Nav.Item>
                        </Nav.Menu>
                        <Nav.Item eventKey="2" icon={<GroupIcon />} href="/rekomendasi">
                            Rekomendasi
                        </Nav.Item>
                        <Nav.Menu eventKey="4" title="Settings" icon={<GearCircleIcon />}>
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