import React, {useState} from 'react';
import { Content, Panel, Row, Col, Form, Button, ButtonToolbar, FlexboxGrid, Loader, SelectPicker, Avatar, DatePicker, Toggle, Modal } from 'rsuite';
import '../assets/css/home.css';
import destinasiOne from '../assets/images/destinasi1.jpeg';
import destinasiTwo from '../assets/images/destinasi2.jpeg';
import destinasiThree from '../assets/images/destinasi3.jpg';
import { Link } from 'react-router-dom';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'
import Nexide from '../assets/images/partner/nexide.jpg';
import Girasol from '../assets/images/partner/girasol.jpg';
import ADR from '../assets/images/partner/akudanrumah.jpg';
import Navbars from './component/navbar';
import DefaultImg from '../assets/images/default.jpg'
import ModalDetail from './component/modalDetail'

function Home(props) {
    const [dari, setDariMana] = useState('');
    const [ke, setKemana] = useState('');
    const [startDate, setStartDate] = useState();
    const [endDate, setEndDate] = useState();
    const [loading, setLoading] = useState(false);
    const [pulangPergi, setPulangPergi] = useState(false);
    const [open, setOpen] = useState(false);
    const [dataBus, setDataBus] = useState([]);
    let url = 'http://localhost:8080/pd/v1';

    // TESTIMONIAL SECTION
    const Testimonial = () => { 
        const testimonials = [
            {
              name: 'User',
              job: 'Lawyer',
              text: 'FLW Travel, keren bisa membuat impianku menjadi nyata',
              avatarUrl: DefaultImg,
            },
            {
                name: 'John Doe',
                job: 'Web Developer',
                text: 'Awesome, this page is so simple, tolong translatin ke indonesia ya',
                avatarUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5a/John_Doe%2C_born_John_Nommensen_Duchac.jpg',
            },
            {
                name: 'Budi',
                job: 'Student',
                text: 'Miaw miaw! Rrrrr',
                avatarUrl: 'https://cdn0-production-images-kly.akamaized.net/lX3bXgLzPQ_hSqisMK2Kg_40nf8=/640x360/smart/filters:quality(75):strip_icc():format(webp)/kly-media-production/medias/2754932/original/005940800_1552970791-fotoHL_kucing.jpg',
            },
            // Tambahkan testimonial lain (jika diperlukan)
          ];
        return(
        <>
            <h2 style={{ textAlign: 'center', color : props.darkMode ? '#aeaeae' : '' }}>Testimonial</h2>
            <FlexboxGrid justify="center">
            {testimonials.map((testimonial, index) => (
                <FlexboxGrid.Item key={index} colspan={6} style={{ padding: '20px' }}>
                <Panel bordered>
                    <div style={{ textAlign: 'center' }}>
                    <Avatar src={testimonial.avatarUrl} size="lg" circle />
                    <h4 style={{ margin: '10px 0 5px',  color : props.darkMode ? '#aeaeae' : '' }}>{testimonial.name}</h4>
                    <p style={{ margin: '0',  color : props.darkMode ? '#aeaeae' : '' }}>{testimonial.job}</p>
                    </div>
                    <p style={{  color : props.darkMode ? '#aeaeae' : '' }}>{testimonial.text}</p>
                </Panel>
                </FlexboxGrid.Item>
            ))}
            </FlexboxGrid>
        </>
    )}

    // PROMOSI DAN DISKON SECTION
    const Promo = () => {
        return(
            <>
                <Content style={{ padding: '30px'}} className="promo">
                    <h3 style={{ color: '#666666', textAlign: 'center'}}>Ayo, Dapatkan Diskon 20% untuk Pembelian Tiket Bis di Flw Travel Hari Ini!</h3>
                </Content>
            </>
        )
    }
    
    // PARTNER
    const Partner = () => {
        return(
            <>
                <Content style={{ padding: '30px', background: props.darkMode ? '#121212' : ''}}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px',  color : props.darkMode ? '#aeaeae' : '' }}>Partner</h2>
                    <FlexboxGrid justify="center">
                        <FlexboxGrid.Item colspan={24} md={6} as={Col}>
                            <Panel shaded className='centered-panel'>
                                <img src={Nexide} alt="nexide" className='centered-img'/>
                            </Panel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={24} md={6} as={Col}>
                            <Panel shaded className='centered-panel'>
                                <img src={Girasol} alt="girasol" className='centered-img'/>
                            </Panel>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={24} md={6} as={Col}>
                            <Panel shaded className='centered-panel'>
                                <img src={ADR} alt="akudanrumah" className='centered-img'/>
                            </Panel>
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </Content>
            </>
        )
    }

    // CALL TO ACTION
    const CallToAction = () => {
        return(
            <>
                <Content className='cta' style={{ padding: '30px' }}>
                    <Row style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                        <Col xs={12}>
                            <h2 style={{ color: '#424242', textAlign: 'center'}}>Nikmati Perjalanan Tanpa Ribet, Pesan Tiketmu Sekarang!</h2>
                        </Col>
                        <Col xs={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <Link to="/signup">
                                <Button appearance="primary" color="violet" type="button">
                                    <span style={{ color: '#fff', textDecoration: 'none'}}>Sign Up</span>
                                </Button>
                            </Link>
                        </Col>
                    </Row>
                </Content>
            </>
        )
    }

    // API KOTA
    const kota = ['Tangerang', 'Purworejo'].map(item => ({
        label: item,
        value: item
    }));

    // MANIPULASI OBJEK
    let dataPencarian = {}

    if (dari !== '' && ke !== '' && startDate !== '') {
        dataPencarian = {
            asal: dari,
            tujuan: ke,
            start: Math.floor(startDate / 1000), // ini data array numeric
            end: Math.floor(endDate / 1000), // ini data array numeric
        }
    }

    // HANDLE SUBMIT CARI
    const handleSubmit = () => {
        if (Object.values(dataPencarian).length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Form tidak boleh kosong sahabat!',
                icon: 'error',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            setLoading(false)
        } else {
            console.log(dataPencarian)
            const cariBus = async () => {
                try {
                    const response = await fetch(url + '/getBus', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(dataPencarian),
                    })

                    const result_bus = await response.json();
                    setDataBus(result_bus);
                    
                    if (response.ok) {
                        // Munculin Modal Detail Bus yg ada
                        setOpen(true)
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: "Gagal Mendapatkan Bus",
                            text: 'Bus blom tersedia',
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
            // Run Get Bus
            cariBus()
        }
    }

    // HERO SECTION
    const Hero = () => {

        return(
            <Content style={{ padding: '30px', background: props.darkMode ? '#171717' : ''}} className="top-section">
                <Row className="show-grid center-image">
                    <Col xs={12}>
                        <h1 style={{ color: props.darkMode ? '#aeaeae' : '#333333'}}>Jelajahi Destinasi Impian Anda dengan Tiket Bus Kami</h1>
                        <Link to="/signin">
                            <Button appearance="primary" color="violet" type="submit">
                                <span>Sign In</span>
                            </Button>
                        </Link>
                    </Col>
                    <Col xs={12}>
                        <Panel shaded style={{ height: 500 }} className='bg' />
                    </Col>
                </Row>
            </Content>
        )
    }

    // TOP 3 DESTINATION
    const TopDestination = () => {

        return(
            <Content style={{ padding: '30px', background: props.darkMode ? '#171717' : '#f5f5f5'}}>
                <Row>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel" style={{ background: props.darkMode ? '#2B2B2B' : '' }}>
                            <img src={destinasiOne} alt="destinasi1"/>
                            <h3 style={{ color: props.darkMode ? '#aeaeae' : '#333333'}}>Destinasi A</h3>
                            <p style={{ color: props.darkMode ? '#aeaeae' : '#424242'}}>Explore the breathtaking beauty of Destinasi A on our luxury buses.</p>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel" style={{ background: props.darkMode ? '#2B2B2B' : '' }}>
                            <img src={destinasiTwo} alt="destinasi2"/>
                            <h3 style={{ color: props.darkMode ? '#aeaeae' : '#333333'}}>Destinasi B</h3>
                            <p style={{ color: props.darkMode ? '#aeaeae' : '#424242'}}>Experience the thrill of adventure in Destinasi B with our comfortable rides.</p>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel" style={{ background: props.darkMode ? '#2B2B2B' : '' }}>
                            <img src={destinasiThree} alt="destinasi3"/>
                            <h3 style={{ color: props.darkMode ? '#aeaeae' : '#333333'}}>Destinasi C</h3>
                            <p style={{ color: props.darkMode ? '#aeaeae' : '#424242'}}>Discover the rich culture and history of Destinasi C in style and safety.</p>
                        </Panel>
                    </Col>
                </Row>
            </Content>
        )
    }

    // SECTION SEARCH BUS
    const SearchBus = () => {

        return(
            <Content style={{ padding: '30px', background: props.darkMode ? '#171717' : '#f5f5f5'}}>
                <FlexboxGrid justify="center" style={{ paddingTop: '50px' }}>
                    <FlexboxGrid.Item colspan={!pulangPergi ? 12 : 16}>
                        <Panel shaded style={{ background: props.darkMode ? '#2B2B2B' : '#fff'}}>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                                <h3 style={{ color: props.darkMode ? '#aeaeae' : '#424242'}}>Mau Kemana ?</h3>
                                <div>
                                    <Toggle 
                                    defaultChecked={pulangPergi} 
                                    onChange={
                                        () => {
                                            setEndDate()
                                            setPulangPergi(!pulangPergi)
                                        }}
                                    />
                                    <span style={{ color: props.darkMode ? '#aeaeae' : '#333333', fontSize: '14px'}}> Pulang Pergi ?</span>
                                </div>
                            </div>
                            <Form fluid style={{ marginBottom: '20px'}} onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={!pulangPergi ? 8 : 6}>
                                        <Form.Group controlId="dari">
                                            <SelectPicker name="dari" style={{ background : props.darkMode ? '#4e4e4e' : ''}} data={kota} placeholder="Dari mana" block value={dari} onChange={(e) => setDariMana(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={!pulangPergi ? 8 : 6}>
                                        <Form.Group controlId="ke">
                                            <SelectPicker name="ke" data={kota} style={{ background : props.darkMode ? '#4e4e4e' : ''}} placeholder="Ke mana" block value={ke} onChange={(e) => setKemana(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={!pulangPergi ? 8 : 6}>
                                        <Form.Group controlId="start">
                                            <DatePicker placeholder="Tanggal Berangkat" style={{ background : props.darkMode ? '#4e4e4e' : ''}} name="start" block value={startDate} onChange={(e) => setStartDate(e)}/>
                                            {/* <DateRangePicker placeholder="Rentang Waktu" style={{ background : props.darkMode ? '#4e4e4e' : ''}} name="range" block value={rangeDate} onChange={(e) => setRangeDate(e)} /> */}
                                        </Form.Group>
                                    </Col>
                                    {pulangPergi && (
                                        <Col xs={6}>
                                            <Form.Group controlId="end">
                                                <DatePicker placeholder="Tanggal Pulang" style={{ background : props.darkMode ? '#4e4e4e' : ''}} name="end" block value={endDate} onChange={(e) => setEndDate(e)} />
                                            </Form.Group>
                                        </Col>
                                    )}
                                </Row>
                                <Form.Group style={{ marginTop: '20px'}}>
                                    <ButtonToolbar>
                                        <Button appearance="primary" color="violet" type="submit" disabled={
                                            Object.values(dataPencarian).length === 0 ? 
                                            true 
                                            : loading ? true : false
                                        }>
                                            {loading ? 
                                            (<Loader content="Loading..."/>) 
                                            : (<span><SearchIcon /> Cari</span>)
                                            }
                                        </Button>
                                    </ButtonToolbar>
                                </Form.Group>
                            </Form>
                        </Panel>
                    </FlexboxGrid.Item>
                </FlexboxGrid>
            </Content>
        )
    }

    // HANDLE CLOSE MODAL
    const handleClose = () => {
        setOpen(false)
    }

    return (
        <>
            <Navbars darkmode={props.darkMode} setdarkmode={(e) => props.setdarkmode(e)}/>
            <Hero />
            <TopDestination />
            <SearchBus />
            <Content style={{ padding: '30px', background: props.darkMode ? '#171717' : ''}}>
                <Testimonial />
            </Content>
            <Promo />
            <Partner />
            <CallToAction />
            <Content style={{ padding: '10px', textAlign: 'right', background: props.darkMode ? '#121212' : ''}}>
                <small style={{ color: '#666666'}}>Copyright &copy;</small><br />
                <small style={{ color: '#666666'}}>Allright Reserved</small>
            </Content>


            {/* MODAL HASIL PENCARIAN */}
            <ModalDetail
                isOpen={open}
                isCloseModal={(e) => setOpen(e)} 
                isClose={handleClose}
                onDataBus={dataBus}
                onSetDataBus={(e) => setDataBus(e)}
                isLogin={props.IsLogin}
            >
            </ModalDetail>
        </>
    );
}

export default Home;
