import React, { useEffect, useState } from "react";
import SideNavMenu from '../component/sideNavMenu';
import NavbarMenu from '../component/navbarMenu';
import image from '../../assets/images/default.jpg'
import { Container, Panel, Grid, Row, Col, Table, Badge, Button } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'
import ModalDetailOrder from '../component/modalDetailOrder';

const { Column, HeaderCell, Cell } = Table;
function BelumBayar(props) {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    let nama = user[0].nama
    let id_user = user[0].id_log
    let img = user[0].image
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    let url = 'http://localhost:8080/pd/v1';

    const [dataBelumBayar, setDataBelumBayar] = useState([]);
    const [modalDetail, setModalDetail] = useState(false);
    const [dataDetailOrder, setDataDetailOrder] = useState([]);

    useEffect(() => {
        const getData = async () => {
            try {
                const response = await fetch(url + '/getbelumbayar', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_user : id_user
                    }),
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

    // FORMATED PRICE
    const formatedPrice = (price) => {
        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);

        return formattedAmount
    }

    // HANDLE ON CLICK DETAIL ORDER BY ID
    const detailOrder = (id) => {
        console.log(id)
        setModalDetail(true)
        const getData = async () => {
            try {
                const response = await fetch(url + '/getdetailorder', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id_user : id // karna menggunakan struct yang sama json yang di minta namenya id_user sebenarnya ini id_tiket
                    }),
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                
                if (response.ok) {
                    setDataDetailOrder(result)
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
                    text: 'My Chemical Romance - Im Not Okay',
                    icon: 'info',
                    confirmButtonText: 'Oke',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                })
            }
        }
        getData()
    }

    // HANDLE CLOSE MODAL
    const handleCloseModalDetailOrder = () => {
        setModalDetail(false);
    }

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
                            <Panel shaded style={{background: props.darkMode ? '#2B2B2B' : '#fff', marginTop: '20px'}} key={data.id}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                    <div style={{color: props.darkMode ? '#fff' : ''}}>
                                        <img />
                                        {data.nama_bus}<br />
                                        <Badge content={data.nomor_polisi}></Badge> <br />
                                    </div>
                                    <div>
                                        <span style={{ color : props.darkMode ? '#fff' : ''}}>Kursi Tersedia : {data.jumlah_kursi}</span><br />
                                    </div>
                                    <div>
                                        <span style={{ fontStyle: 'italic', color : props.darkMode ? '#fff' : '' }}>
                                                {formatedPrice(data.harga)}
                                            </span> <br />
                                        <Badge color="blue" content={data.type}></Badge><br />
                                    </div>
                                    <div>
                                        <span style={{ color : props.darkMode ? '#fff' : ''}}>{data.kota_asal + ' - ' + data.kota_tujuan}</span>
                                        <br />
                                        {data.status_pembayaran === 0 && (
                                            <Badge color="red" content="Menunggu Pembayaran"></Badge>
                                        )}
                                        {data.status_pembayaran === 1 && (
                                            <Badge color="blue" content="Sudah bayar"></Badge>
                                        )}
                                    </div>
                                    <div>
                                        <Button appearance="primary" color="blue" onClick={() => detailOrder(data.id)}>Detail</Button>
                                    </div>
                                </div>
                            </Panel>
                            ))}
                        </Col>
                    </Row>
                </Grid>
            </Container>
            {/* MODAL SET PEOPLE */}
            <ModalDetailOrder 
                isOpen={modalDetail} 
                isClose={(e) => handleCloseModalDetailOrder(e)}
                dataDetail={dataDetailOrder}
                setDataDetail={(e) => setDataDetailOrder(e)}
            >
            </ModalDetailOrder>
        </>
    )
}

export default BelumBayar;