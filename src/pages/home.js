import React, {useState} from 'react';
import { Content, Panel, Row, Col, Form, Button, ButtonToolbar, FlexboxGrid, Loader, DateRangePicker, SelectPicker } from 'rsuite';
import '../assets/css/home.css';
import destinasiOne from '../assets/images/destinasi1.jpeg';
import destinasiTwo from '../assets/images/destinasi2.jpeg';
import destinasiThree from '../assets/images/destinasi3.jpg';
import SearchIcon from '@rsuite/icons/Search';
import Swal from 'sweetalert2'
import Nexide from '../assets/images/partner/nexide.jpg';
import Girasol from '../assets/images/partner/girasol.jpg';
import ADR from '../assets/images/partner/akudanrumah.jpg';

function Home() {
    const [dari, setDariMana] = useState('');
    const [ke, setKemana] = useState('');
    const [rangeDate, setRangeDate] = useState([]);
    const [loading, setLoading] = useState(false);

    // TESTIMONIAL SECTION
    const Testimonial = () => { 
        return(
        <>
            <h2 style={{ textAlign: 'center'}}>Testimonial</h2>
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

    const Partner = () => {
        return(
            <>
                <Content style={{ padding: '30px'}}>
                    <h2 style={{ textAlign: 'center', marginBottom: '30px'}}>Partner</h2>
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
                            <h2 style={{ color: '#424242', textAlign: 'center'}}>Nikmati Perjalanan Tanpa Ribet, Pesan Tiket Bus Favoritmu Sekarang!</h2>
                        </Col>
                        <Col xs={12} style={{ display: 'flex', alignItems: 'center', flexDirection: 'column'}}>
                            <Button appearance="primary" color="violet" type="submit"><a href="/signup" style={{ color: '#fff', textDecoration: 'none'}}>Sign Up</a></Button>
                        </Col>
                    </Row>
                </Content>
            </>
        )
    }

    // API KOTA
    const kota = ['kota1', 'kota2'].map(item => ({
        label: item,
        value: item
    }));

    // MANIPULASI OBJEK
    let dataPencarian = {}

    if (dari !== '' && ke !== '' && rangeDate.length !== 0) {
        dataPencarian = {
            dari_mana: dari,
            kemana: ke,
            range_date: rangeDate, // ini data array numeric
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
            Swal.fire({
                title: 'Info!',
                text: 'Backendnya masih ngopi dulu, tunggu ya',
                icon: 'info',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            }).then((result) => {
                if (result.isConfirmed) {
                    setLoading(false)
                }
            })
            console.log(dataPencarian);
            setLoading(true)
        }
    }



    return (
        <>
            <Content style={{ padding: '30px'}} className="top-section">
                <Row className="show-grid center-image">
                    <Col xs={12}>
                        <h1 style={{ color: '#333333'}}>Jelajahi Destinasi Impian Anda dengan Tiket Bus Kami</h1>
                    </Col>
                    <Col xs={12}>
                        <Panel shaded style={{ height: 500 }} className='bg' />
                    </Col>
                </Row>
            </Content>
            <Content style={{ padding: '30px', background: '#f5f5f5'}}>
                <Row>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel">
                            <img src={destinasiOne} alt="destinasi1"/>
                            <h3 style={{ color: '#333333'}}>Destinasi A</h3>
                            <p style={{ color: '#424242'}}>Explore the breathtaking beauty of Destinasi A on our luxury buses.</p>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel">
                            <img src={destinasiTwo} alt="destinasi2"/>
                            <h3 style={{ color: '#333333'}}>Destinasi B</h3>
                            <p style={{ color: '#424242'}}>Experience the thrill of adventure in Destinasi B with our comfortable rides.</p>
                        </Panel>
                    </Col>
                    <Col xs={24} sm={12} md={8}>
                        <Panel shaded className="custom-panel">
                            <img src={destinasiThree} alt="destinasi3"/>
                            <h3 style={{ color: '#333333'}}>Destinasi C</h3>
                            <p style={{ color: '#424242'}}>Discover the rich culture and history of Destinasi C in style and safety.</p>
                        </Panel>
                    </Col>
                </Row>
            </Content>
            <Content style={{ padding: '30px', background: '#f5f5f5'}}>
                <FlexboxGrid justify="center" style={{ paddingTop: '50px' }}>
                    <FlexboxGrid.Item colspan={12}>
                        <Panel shaded style={{background: '#fff'}}>
                            <h3 style={{ color: '#424242'}}>Mau Kemana ?</h3>
                            <Form fluid style={{ marginBottom: '20px'}} onSubmit={handleSubmit}>
                                <Row>
                                    <Col xs={8}>
                                        <Form.Group controlId="dari">
                                            <SelectPicker name="dari" data={kota} placeholder="Dari mana" block value={dari} onChange={(e) => setDariMana(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group controlId="ke">
                                            <SelectPicker name="ke" data={kota} placeholder="Ke mana" block value={ke} onChange={(e) => setKemana(e)}/>
                                        </Form.Group>
                                    </Col>
                                    <Col xs={8}>
                                        <Form.Group controlId="range">
                                            <DateRangePicker placeholder="Rentang Waktu" name="range" block value={rangeDate} onChange={(e) => setRangeDate(e)} />
                                        </Form.Group>
                                    </Col>
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
            <Content style={{ padding: '30px'}}>
                <Testimonial />
            </Content>
            <Promo />
            <Partner />
            <CallToAction />
            <Content style={{ marginLeft: 'auto', padding: '10px', textAlign: 'right'}}>
                <small style={{ color: '#666666'}}>Copyright &copy;</small><br />
                <small style={{ color: '#666666'}}>Allright Reserved</small>
            </Content>
        </>
    );
}

export default Home;
