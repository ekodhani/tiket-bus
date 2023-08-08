import React, { useState } from "react";
import SideNavMenu from '../component/sideNavMenu';
import NavbarMenu from '../component/navbarMenu';
import image from '../../assets/images/default.jpg'
import { Container, Panel, Grid, Row, Col } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'

function BelumBayar() {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    let nama = user[0].nama
    let img = user[0].image
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    let url = 'http://localhost:8080/pd/v1';

    return(
        <>
            <Container fluid>
                <NavbarMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)}/>
                <Grid style={{ width: '100%'}}>
                    <Row>
                        <Col lg={expanded ? 5 : 2} xs={expanded ? 5 : 5}>
                            <SideNavMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)} active={activeKey} setActive={(e) => setActiveKey(e)}/>
                        </Col>
                        <Col lg={expanded ? 18 : 21} xs={expanded ? 5: 5} style={{ marginTop: '20px'}}>
                            Belum Bayar
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    )
}

export default BelumBayar;