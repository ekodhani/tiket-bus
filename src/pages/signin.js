import React, {useState} from 'react';
import { Content, Panel, Form, Button, ButtonToolbar, Grid, Row, Col, Loader} from 'rsuite';
import Swal from 'sweetalert2'
import { Link, Navigate } from 'react-router-dom';
import Navbars from './component/navbar';

function SignIn(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // HANDLE SUBMIT
    let dataForm = {}
    let url = 'http://localhost:8080/pd/v1';
    const handleSubmit = async () => {
        if (username !== '' && password !== '') {
            dataForm = {
                name: username,
                password: password,
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
        } else {
            try {
                const response = await fetch(url + '/signin', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(dataForm),
                })
                const result = await response.json();
                console.log(result);

                if (response.ok) {
                    setLoading(false)
                    props.setIsLogin(true);
                    // window.location.href = '/menu';
                    // Simpan data ke session
                    sessionStorage.setItem('userData', JSON.stringify(result));
                } else {
                    Swal.fire({
                        title: result.message,
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
    props.IsLogin === true ? (
        <Navigate to="/menu" />
    ) : (
        <>
        <Navbars darkmode={props.darkMode} setdarkmode={(e) => props.setdarkmode(e)} />
        <Grid fluid>
            <Row className="show-grid">
                <Col xs={12}>
                <Content style={{ padding: '30px'}}>
                    <Panel bordered shaded style={{ display: 'inline-block', width: 500, paddingRight: '30px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', background: props.darkMode ?  '#171717' : '#fff' }}>
                    <h1 style={{ textAlign: 'center', color: props.darkMode ? '#aeaeae' : '#171717' }}>Sign In</h1>
                        <Form fluid onSubmit={handleSubmit} style={{ marginBottom: '20px'}}>
                            <Form.Group controlId="name">
                                <Form.Control name="name" placeholder='Username' value={username} onChange={(e) => setUsername(e)} style={{background: props.darkMode ?  '#171717' : ''}}/>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Control name="password" type="password" autoComplete="off" placeholder="Password" value={password} onChange={(e) => setPassword(e)} style={{background: props.darkMode ?  '#171717' : ''}}/>
                            </Form.Group>
                            <Form.Group>
                            <ButtonToolbar>
                                    <Button appearance="primary" color="violet" type="submit" disabled={loading ? true : false}>
                                        {loading ? (<Loader content="Loading..."/>) : 'Sign In'}
                                    </Button>
                                </ButtonToolbar>
                            </Form.Group>
                        </Form>
                        <span style={{ color: props.darkMode ? '#aeaeae' : '#171717' }}>Don't have an account ? <Link to="/signup">Sign Up</Link></span>
                    </Panel>
                </Content>
                </Col>
            </Row>
        </Grid>
        </>
    )
    );
}

export default SignIn;
