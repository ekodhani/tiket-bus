import React, {useState} from 'react';
import { Button, Modal, RadioTileGroup, RadioTile, Grid, Row, Col, Badge,  } from 'rsuite';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

function ModalDetail(props) {
    let navigate = useNavigate()
    let url = 'http://localhost:8080/pd/v1';

    const formatedPrice = (price) => {
        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
        }).format(price);

        return formattedAmount
    }

    const bookingBus = () => {
        if (props.isLogin) {
            // BELOM MIKIRIN FLOWNYA GIMANA
            // Mungkin lebih baik user akan masuk ke dalam menu dan masuk ke step milih kursi dan lanjutkan sampai selesai
            Swal.fire({
                icon: 'info',
                title: "Sebentar",
                text: 'Programmernya lagi mikirin flownya enaknya gimana ya ?',
                confirmButtonText: 'Oke',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        } else {
            Swal.fire({
                icon: 'question',
                title: "Ingin Melanjutkan",
                text: 'Silahkan login terlebih dahulu',
                confirmButtonText: 'Oke',
                showCancelButton: true,
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    props.isCloseModal(false)
                    navigate('/signin')
                }
            })
        }
    }

    return (
        <>
            <Modal open={props.isOpen} onClose={props.isClose}>
                <Modal.Header>
                    <Modal.Title>Daftar Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RadioTileGroup aria-label="Visibility Level">
                    {props.onDataBus.filter(bus => bus.status === 1).map((bus) => (
                        <RadioTile label={bus.nama_bus} value={bus.id}>
                            <Grid>
                                <Row>
                                    <Col xs={24} sm={24} md={4}>
                                        <img />
                                        <Badge content={bus.nomor_polisi}></Badge> <br />
                                    </Col>
                                    <Col xs={24} sm={24} md={4}>
                                        Kursi Tersedia : {bus.jumlah_kursi} <br />
                                    </Col>
                                    <Col xs={24} sm={24} md={4}>
                                        <span style={{ fontStyle: 'italic' }}>
                                            {formatedPrice(bus.harga)}
                                        </span> <br />
                                        <Badge color="blue" content={bus.type}></Badge><br />
                                    </Col>
                                </Row>
                            </Grid>
                        </RadioTile>
                    ))}
                    </RadioTileGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={bookingBus} appearance="primary" color="blue">
                        Booking
                    </Button>
                    <Button onClick={props.isClose} appearance="subtle">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalDetail;
