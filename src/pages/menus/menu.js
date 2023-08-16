import React, { useEffect, useState } from "react";
import SideNavMenu from '../component/sideNavMenu';
import NavbarMenu from '../component/navbarMenu';
import image from '../../assets/images/default.jpg'
import { Container, Panel, Steps, Checkbox, CheckboxGroup, Form, Button, Rate, SelectPicker, DatePicker, ButtonToolbar, Grid, Row, Col, Toggle, RadioTileGroup, RadioTile, Modal, Badge, FlexboxGrid } from 'rsuite';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'
import { Navigate, Link } from 'react-router-dom'
import FlexboxGridItem from "rsuite/esm/FlexboxGrid/FlexboxGridItem";


function Menu(props) {
    const user = JSON.parse(sessionStorage.getItem('userData'))
    let nama = user[0].nama
    let img = user[0].image
    const [expanded, setExpanded] = useState(true);
    const [activeKey, setActiveKey] = useState('1');
    const [kotaAwal, setKotaAwal] = useState('');
    const [kotaTujuan, setKotaTujuan] = useState('');
    const [pergi, setPergi] = useState();
    const [pulang, setPulang] = useState(0);
    const [step, setStep] = useState(0);
    const [dataForm, setDataForm] = useState({});
    const [pP, setPP] = useState(false);
    const [DataKursi, setDataKursi] = useState();
    const [DataBus, setDataBus] = useState([]);
    const [pilihKursi, setPilihKursi] = useState([]);
    const [pilihBus, setPilihBus] = useState('');
    const [pilihPembayaran, setPembayaran] = useState('');
    const [hoverValue, setHoverValue] = useState(3);
    const [open, setOpen] = useState(false);
    let url = 'http://localhost:8080/pd/v1';

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
    }, [])

    const handleOpen = () => {
        var berangkat = new Date(pergi);
        var epoch = new Date(0);
        var format = berangkat - epoch;
        var timestampEpochDetik = Math.floor(format / 1000);
        console.log(timestampEpochDetik)
        let data = {
            asal : kotaAwal,
            tujuan: kotaTujuan,
            tgl_berangkat: timestampEpochDetik,
            tgl_pulang : pulang,
        }
        const getBus = async () => {
            try {
                const response = await fetch(url + '/getBus', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data),
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setDataBus(result)
                
                if (response.ok) {
                    setOpen(true)
                } else {
                    setOpen(false)
                    Swal.fire({
                        title: "error",
                        text: 'Backendnya lagi belajar',
                        icon: 'error',
                        confirmButtonText: 'Oke',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    })
                }
            } catch(error) {
                setOpen(false)
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
        getBus()
    };
    const handleClose = () => setOpen(false);

    const onChange = nextStep => {
        if (Object.values(dataForm).length !== 0) {
            setStep(nextStep < 0 ? 0 : nextStep > 3 ? 3 : nextStep);
        }
    };

    const onNext = () => {
        if (kotaTujuan !== '' && kotaAwal !== '' && pergi !== ''){
            setStep(step + 1)
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Form tidak boleh kosong sahabat!',
                icon: 'error',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        }
        setOpen(false);
    };
    const onPrevious = () => setStep(step - 1);

    // API KOTA
    const kota = ['Tangerang', 'Purworejo', 'Jakarta', 'Semarang'].map(item => ({
        label: item,
        value: item
    }));

    const Kursi = () => {
        const columnsPerRow = 2; // Jumlah kolom per baris
        
        const rows = [];
        for (let i = 0; i < DataKursi.length; i += columnsPerRow) {
            const rowCols = DataKursi.slice(i, i + columnsPerRow).map((kursi) => (
            <Col style={{ marginRight: '20px', width: '40px'}}>
                <Checkbox key={kursi.id} value={kursi.id}>{kursi.no_kursi}</Checkbox>
            </Col>
            ));

            rows.push(<Row key={i}>{rowCols}</Row>);
        }
        
        const handlePilihKursi = (id) => {
            console.log(id)
            setPilihKursi(id)
        }
        return (
            <>
                <Panel shaded style={{background: props.darkMode ? '#212121' :'#fff', marginTop: '20px', color : props.darkMode ? '#fff' : '#212121'}}>
                    <span>Pilih Kursi</span>
                    <Grid style={{ width: '100%', marginTop: '20px', marginBottom: '20px'}}>
                        <CheckboxGroup value={pilihKursi} onChange={handlePilihKursi}>
                            <div>{rows}</div>
                        </CheckboxGroup>
                    </Grid>
                    <ButtonToolbar>
                        <Button onClick={onPrevious} disabled={step === 0}>
                            Previous
                        </Button>
                        <Button appearance="primary" color="violet" onClick={onNext}>
                            <span>Next</span>
                        </Button>
                    </ButtonToolbar>
                </Panel>
            </>
        )
    }

    const apiPembayaran = [
        {
            'id' : 1,
            'image' : 'https://cdn3.iconfinder.com/data/icons/banks-in-indonesia-logo-badge/100/BCA-512.png',
            'name' : 'BCA'
        },
        {
            'id' : 2,
            'image' : 'https://upload.wikimedia.org/wikipedia/id/thumb/5/55/BNI_logo.svg/2560px-BNI_logo.svg.png',
            'name' : 'BNI'
        },
        {
            'id' : 3,
            'image' : 'https://i.pinimg.com/originals/02/8b/92/028b92bb43a9f6c80e26c3ea403cb698.png',
            'name' : 'Gopay'
        },
        {
            'id' : 4,
            'image' : 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/eb/Logo_ovo_purple.svg/2560px-Logo_ovo_purple.svg.png',
            'name' : 'Ovo'
        },
    ]

    const formatedPrice = (price) => {
        console.log(price)
        const formattedAmount = new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR'
          }).format(price);

          return formattedAmount
    }
    
    const Pembayaran = () => {
        const handlePilihPembayaran = (e) => {
            console.log(e)
            setPembayaran(e)
        }
        return(
            <Panel shaded style={{background: props.darkMode ? '#212121' : '#fff', marginTop: '20px', color: props.darkMode ? '#fff' : '#212121'}}>
                <span>Pilih Metode Pembayaran : </span>
                <RadioTileGroup aria-label="Visibility Level" style={{ marginTop: '20px'}} value={pilihPembayaran} onChange={(e) => handlePilihPembayaran(e)}>
                    {apiPembayaran.map(item => (
                        <>
                        <RadioTile label={item.name} value={item.id}>
                            <img src={item.image} style={{ width: '80px'}} alt={item.name}/>
                        </RadioTile>
                        </>
                    ))}
                </RadioTileGroup>
                <ButtonToolbar style={{ marginTop: '20px'}}>
                    <Button onClick={onPrevious} disabled={step === 0}>
                        Previous
                    </Button>
                    <Button appearance="primary" color="violet" onClick={onNext}>
                        <span>Next</span>
                    </Button>
                </ButtonToolbar>
            </Panel>
        )
    }

    const texts = {
        1: 'Useless',
        2: 'Poor',
        3: 'Ok',
        4: 'Good',
        5: 'Excellent'
    };
    
    const onSubmit = () => {
        let dataFormSubmit = {}
        if (kotaTujuan !== '' && kotaAwal !== '' && pergi !== '' && pilihKursi !== '' && pilihPembayaran !== '' && pilihBus !== ''){
            dataFormSubmit = {
                kota_awal : kotaAwal,
                kota_tujuan : kotaTujuan,
                pergi: pergi,
                id_bus: pilihBus,
                pulang: pulang,
                kursi: pilihKursi,
                pembayaran: pilihPembayaran

            }
        }

        // console.log(kotaTujuan +' - ' + kotaAwal +' - '+ pergi +' - ' + pilihKursi + ' - ' + pilihPembayaran + ' - ' + pilihBus)
        // console.log(dataFormSubmit)

        if (Object.values(dataFormSubmit).length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Form tidak boleh kosong sahabat!',
                icon: 'error',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
        } else {
            // Hit endpointnya
            const savePemesanan = async () => {
                try {
                    const response = await fetch(url + '/savetiket', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataFormSubmit),
                    })
                    
                    if (response.ok) {
                        Swal.fire({
                            title: "error",
                            text: 'Tiket berhasil di simpan',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1000,
                            allowOutsideClick: false,
                            allowEscapeKey: false
                        })
                    } else {
                        Swal.fire({
                            title: "error",
                            text: 'Backendnya lagi belajar',
                            icon: 'error',
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

            savePemesanan()
        }
        console.log(dataFormSubmit);
    }

    const funcPilihBus = (e) => {
        setPilihBus(e)
    }

    return(
        !props.IsLogin === true ? (
            <Navigate to="/" />
        ) : (
        <>
            <Container fluid>
                <NavbarMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)} setDarkMode={(e) => props.setdarkmode(e)} darkMode={props.darkMode} IsLogin={props.IsLogin} setIsLogin={(e) => props.setIsLogin(e)}/>
                <Grid style={{ width: '100%'}}>
                    <Row>
                        <Col lg={expanded ? 5 : 2} xs={expanded ? 5 : 5}>
                            <SideNavMenu username={nama} images={`${image}`} exp={expanded} setExp={(e) => setExpanded(e)} active={activeKey} setActive={(e) => setActiveKey(e)} setDarkMode={(e) => props.setdarkmode(e)} darkMode={props.darkMode}/>
                        </Col>
                        <Col lg={expanded ? 18 : 21} xs={expanded ? 5: 5} style={{ marginTop: '20px'}}>
                            <Steps current={step}>
                                <Steps.Item title="Mau Kemana ?" />
                                <Steps.Item title="Pilih Kursi" />
                                <Steps.Item title="Pembayaran" />
                                <Steps.Item title="Selesai" />
                            </Steps>
                            <Form style={{ marginBottom: '20px'}} onSubmit={onSubmit}>
                            {step === 0 && ( // Pilih Tujuan
                                <Panel shaded style={{background: props.darkMode ? '#2B2B2B' : '#fff', marginTop: '20px'}}>
                                    <Grid style={{ width: '100%', marginBottom: '30px'}}>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={18}>
                                                <span style={{ color: '#424242', fontWeight: 'bold', fontSize: '16px'}}>Mau Kemana ?</span>
                                            </Col>
                                            <Col xs={24} sm={24} md={6}>
                                                <div>
                                                    <span style={{ fontSize: '14px', color: '#aeaeae'}}>Pergi Pulang ? </span>
                                                    <Toggle size="md" onClick={(e) => setPP(!pP)}/>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Grid>
                                    <Grid style={{ width: '100%'}}>
                                        <Row gutter={24}>
                                            <Col xs={24} sm={24} md={6}>
                                                <Form.Group controlId="dari">
                                                    <SelectPicker name="dari" data={kota} value={kotaAwal} onChange={(e) => setKotaAwal(e)} placeholder="Dari mana" style={{ background: props.darkMode ? '#2B2B2B' : '#fff' }} block/>
                                                </Form.Group>
                                            </Col>
                                            <Col xs={24} sm={24} md={6}>
                                                <Form.Group controlId="ke">
                                                    <SelectPicker name="ke" data={kota} value={kotaTujuan} onChange={(e) => setKotaTujuan(e)} placeholder="Ke mana" block/>
                                                </Form.Group>
                                            </Col>
                                                <Col xs={24} sm={24} md={6}>
                                                    <Form.Group controlId="range">
                                                        <DatePicker format="yyyy-MM-dd HH:mm" placeholder="Pergi" value={pergi} onChange={(e)=> setPergi(e)} block/>
                                                    </Form.Group>
                                                </Col>
                                            {pP && (
                                                <Col xs={24} sm={24} md={6}>
                                                    <Form.Group controlId="range">
                                                        <DatePicker format="yyyy-MM-dd HH:mm" placeholder="Pulang" value={pulang} onChange={(e)=> setPulang(e)} block/>
                                                    </Form.Group>
                                                </Col>
                                            )}
                                        </Row>
                                    </Grid>
                                    <Form.Group style={{ marginTop: '20px'}}>
                                        <ButtonToolbar>
                                            {step === 0 ? (<Button appearance="primary" color="violet" onClick={handleOpen}>
                                                <span><SearchIcon /> Cari</span>
                                            </Button>) : (
                                                <Button onClick={onPrevious} disabled={step === 0}>
                                                    Previous
                                                </Button>
                                            )}
                                        </ButtonToolbar>
                                    </Form.Group>
                                </Panel>
                            )}
                            {step === 1 && ( // Pilih Kursi
                                <Kursi />
                            )}
                            {step === 2 && ( // Pembayaran
                                <Pembayaran />
                            )}
                            {step === 3 && ( // Selesai
                                <Panel shaded style={{background: props.darkMode ? '#212121' : '#fff', marginTop: '20px', color: props.darkMode ? '#fff' : '#212121'}}>
                                    Selesai dan cetak tiket<br/>
                                    <Rate onChangeActive={setHoverValue}/>
                                    <span style={{ verticalAlign: 'top', lineHeight: '42px', display: 'inline-block'}}>{texts[hoverValue]}</span>
                                    <ButtonToolbar>
                                        <Button onClick={onPrevious} disabled={step === 0}>
                                            Previous
                                        </Button>
                                        <Button appearance="primary" color="violet" type="submit">
                                            <span>Selesai</span>
                                        </Button>
                                    </ButtonToolbar>
                                </Panel>
                            )}
                            </Form>
                        </Col>
                    </Row>
                </Grid>
            </Container>

            {/* MODAL */}
            <Modal backdrop={true} overflow={true} open={open} onClose={handleClose} theme="dark">
                <Modal.Header>
                <Modal.Title>Pilih Bus</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RadioTileGroup aria-label="Visibility Level">
                    {DataBus.filter(bus => bus.status === 1).map((bus) => (
                        <RadioTile label={bus.nama_bus} value={bus.id} onChange={(e) => funcPilihBus(e)}>
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
                <Button 
                onClick={() => {
                    if (pilihBus !== '') {
                        onNext()
                    } else {
                        setPilihBus('')
                    }
                }}
                appearance="primary">
                    Ok
                </Button>
                <Button onClick={handleClose} appearance="subtle">
                    Cancel
                </Button>
                </Modal.Footer>
            </Modal>
        </>
        )
    )
}

export default Menu;