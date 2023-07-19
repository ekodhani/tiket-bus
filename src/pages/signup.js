import React, {useState} from 'react';
import { Content, Panel, Form, Button, ButtonToolbar, SelectPicker, Grid, Row, Col, Loader} from 'rsuite';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'

function SignUp() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [genderValue, setGender] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);

    // DATA GENDER
    const gender = ['Male', 'Female'].map(item => ({
        label: item,
        value: item
    }));

    // HANDLE SUBMIT
    let dataForm = {}
    const handleSubmit = () => {
        if (username !== '' && password !== '' && confirmPassword !== '' && genderValue !== '' && email !== '') {
            dataForm = {
                name: username,
                email: email,
                gender: genderValue,
                password: password,
                confirm_password: confirmPassword,
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
            console.log(dataForm);
            setLoading(true)
        }
    }

    return (
    <>
    <Grid fluid>
        <Row className="show-grid">
            <Col xs={12}>
            <Content style={{ padding: '30px'}}>
                <Panel bordered shaded style={{ display: 'inline-block', width: 500, paddingRight: '30px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px', background: '#fff' }}>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                    <Form fluid onSubmit={handleSubmit} style={{ marginBottom: '20px'}}>
                        <Form.Group controlId="name">
                            <Form.Control name="name" placeholder='Username' value={username} onChange={(e) => setUsername(e)}/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Control name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e)}/>
                        </Form.Group>
                        <Form.Group controlId="selectPicker">
                            <SelectPicker name="gender" data={gender} block searchable={false} value={genderValue} placeholder="Select Gender" onChange={(e) => setGender(e)}/>
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
