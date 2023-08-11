import React, {useState} from 'react';
import useQrReader from 'react-qr-reader';
import { Content, Panel, Form, Button, ButtonToolbar, SelectPicker, Grid, Row, Col, Loader} from 'rsuite';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Navbars from './component/navbar';

function SignUp(props) {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [noTelp, setNoTelp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // HANDLE SUBMIT
    let dataForm = {}
    const handleSubmit = async () => {
        let url = 'http://localhost:8080/pd/v1';
        if (username !== '' && password !== '' && confirmPassword !== '' && email !== '' && noTelp !== '') {
            dataForm = {
                name: username,
                email: email,
                no_telp:noTelp,
                password: password,
                confirm_password: confirmPassword,
                id_role: '2',
                image: 'default.jpg'
            }
        }

        if (Object.values(dataForm).length === 0) {
            Swal.fire({
                title: 'Error!',
                text: 'Form tidak boleh kosong sahabat!',
                icon: 'error',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            setLoading(false)
        } else if (dataForm.password !== dataForm.confirm_password) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwordnya berbeda, mohon di cek lagi ya sahabat!',
                icon: 'error',
                confirmButtonText: 'Oke',
                allowOutsideClick: false,
                allowEscapeKey: false
            })
            setLoading(false)
        } else {
            console.log(dataForm);
            setLoading(true)
            try {
                const response = await fetch(url + '/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataForm),
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();

                if (response.ok) {
                    setLoading(false)
                    Swal.fire({
                        title: 'Berhasil',
                        text: 'Backendnya dah bisa nih, user dengan username : ' +result.name+' telah terdaftar',
                        icon: 'success',
                        confirmButtonText: 'Login',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then((result) => {
                        // Arahkan ke Page Login
                        if (result.isConfirmed) {
                            window.location.href = '/signin'; // Perbaiki di sini
                        }
                    })
                } else {
                    Swal.fire({
                        title: result,
                        text: 'Backendnya masih ngopi dulu, tunggu ya, lagi mikirin caranya nyiapin endpoint',
                        icon: 'info',
                        confirmButtonText: 'Oke',
                        allowOutsideClick: false,
                        allowEscapeKey: false
                    }).then((result) => {
                        if (result.isConfirmed) {
                            setLoading(false)
                        }
                    })
                }
                console.log(result)
            } catch(error) {
                Swal.fire({
                    title: error,
                    text: 'Backendnya masih error, lagi belajar make golang dia',
                    icon: 'info',
                    confirmButtonText: 'Oke',
                    allowOutsideClick: false,
                    allowEscapeKey: false
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false)
                    }
                })
            }
        }
    }

    return (
    <>
    <Navbars darkmode={props.darkMode} setdarkmode={(e) => props.setdarkmode(e)}/>
    <Grid fluid style={{ background: props.darkMode ? '#171717' : ''}}>
        <Row className="show-grid">
            <Col xs={12}>
            <Content style={{ padding: '30px'}}>
                <Panel bordered shaded style={{ display: 'inline-block', width: 500, paddingRight: '30px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', background: props.darkMode ?  '#171717' : '#fff' }}>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                    <Form fluid onSubmit={handleSubmit} style={{ marginBottom: '20px'}}>
                        <Form.Group controlId="name">
                            <Form.Control name="name" placeholder='Username' value={username} onChange={(e) => setUsername(e)}/>
                        </Form.Group>
                        <Form.Group controlId="no_telp">
                            <Form.Control name="no_telp" type="text" placeholder="Phone" value={noTelp} onChange={(e) => setNoTelp(e)}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Control name="email" type="email" placeholder="email" value={email} onChange={(e) => setEmail(e)}/>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control name="password" type="password" autoComplete="off" value={password} placeholder="Password" onChange={(e) => setPassword(e)}/>
                        </Form.Group>
                        <Form.Group controlId="confirm-password">
                            <Form.Control name="confirm_password" type="password" autoComplete="off" value={confirmPassword} placeholder="Confirm Password" onChange={(e) => setConfirmPassword(e)}/>
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" color="violet" type="submit" disabled={loading ? true : false}>
                                    {loading ? (<Loader content="Loading..."/>) : 'Sign Up'}
                                </Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                    <span>Already have an account ? <Link to="/signin">Sign In</Link></span>
                </Panel>
            </Content>
            </Col>
        </Row>
    </Grid>
    </>
    );
}

export default SignUp;
