import React, { useState, useEffect } from 'react';
import { Button, Modal, Row, Col, Panel, Grid, Checkbox, CheckboxGroup } from 'rsuite';
import Swal from 'sweetalert2'

function ModalEditKursi(props) {
    let url = 'http://localhost:8080/pd/v1';
    const [DataKursi, setDataKursi] = useState([])
    const [pilihKursi, setPilihKursi] = useState([])

    useEffect(() => {
        const getKursi = async () => {
            try {
                const response = await fetch(url + '/getKursi', {
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
                    setDataKursi(result)
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
        getKursi()
    }, [url])

    const Kursi = (props) => {
        const columnsPerRow = 2;
        const [pilihKursi, setPilihKursi] = useState([]); // State untuk menyimpan kursi terpilih
        
        const rows = [];
        for (let i = 0; i < DataKursi.length; i += columnsPerRow) {
            const rowCols = DataKursi.slice(i, i + columnsPerRow).map((kursi) => (
                <Col key={kursi.id} style={{ marginRight: '20px', width: '40px' }}>
                    <Checkbox
                        value={kursi.id}
                        checked={pilihKursi.includes(kursi.id)}
                        onChange={() => handlePilihKursi(kursi.id)}
                    >
                        {kursi.no_kursi}
                    </Checkbox>
                </Col>
            ));
    
            rows.push(<Row key={i}>{rowCols}</Row>);
        }
    
        const handlePilihKursi = (id) => {
            if (pilihKursi.includes(id)) {
                setPilihKursi(pilihKursi.filter(kursiId => kursiId !== id));
            } else {
                setPilihKursi([...pilihKursi, id]);
            }
        };
    
        return (
            <Panel shaded style={{ background: props.darkMode ? '#212121' : '#fff', marginTop: '20px', color: props.darkMode ? '#fff' : '#212121' }}>
                <Grid style={{ width: '100%', marginTop: '20px', marginBottom: '20px' }}>
                    <div>{rows}</div>
                </Grid>
            </Panel>
        );
    }

    const handleClose = () => {
        props.isClose(false)
    }

    return (
        <>
            <Modal open={props.isOpen} onClose={handleClose} backdrop={true}>
                <Modal.Header>
                    <Modal.Title>Pilih Kursi</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Kursi />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={handleClose} appearance="subtle">
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default ModalEditKursi;
