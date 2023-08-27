import React, { useEffect, useState } from "react";
import SideNavMenu from '../component/sideNavMenu';
import NavbarMenu from '../component/navbarMenu';
import image from '../../assets/images/default.jpg'
import { Container, Panel, Grid, Row, Col, Table } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'

const { Column, HeaderCell, Cell } = Table;
function BelumBayar(props) {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    let nama = user[0].nama
    let img = user[0].image
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    let url = 'http://localhost:8080/pd/v1';

    const [dataBelumBayar, setDataBelumBayar] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url + '/getbelumbayar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                
                if (response.ok) {
                    setDataBelumBayar(result)
                } else {
                    Swal.fire({
                        title: result,
                        text: 'Backendnya masih ngopi dulu, tunggu ya, lagi mikirin caranya nyiapin endpoint',
                        icon: 'info',
                        confirmButtonText: 'Oke',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            } catch(error) {
                Swal.fire({
                    title: error,
                    text: 'Backendnya masih error, lagi belajar make golang dia',
                    icon: 'info',
                    confirmButtonText: 'Oke',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
            }
        }
        getData()
    }, [
        url
    ])

    return(
        <>
            <Container fluid>
                <NavbarMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)} setDarkMode={(e) => props.setdarkmode(e)} darkMode={props.darkMode} IsLogin={props.IsLogin} setIsLogin={(e) => props.setIsLogin(e)}/>
                <Grid style={{ width: '100%'}}>
                    <Row>
                        <Col lg={expanded ? 5 : 2} xs={expanded ? 5 : 5}>
                            <SideNavMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)} active={activeKey} setActive={(e) => setActiveKey(e)} setDarkMode={(e) => props.setdarkmode(e)} darkMode={props.darkMode}/>
                        </Col>
                        <Col lg={expanded ? 18 : 21} xs={expanded ? 5: 5} style={{ marginTop: '20px'}}>
                            {dataBelumBayar.map((data) => (
                            <Panel shaded style={{background: props.darkMode ? '#2B2B2B' : '#fff', marginTop: '20px'}}>
                                Belum Bayar
                            </Panel>
                            ))}
                        </Col>
                    </Row>
                </Grid>
            </Container>
        </>
    )
}

export default BelumBayar;