import React from 'react';
import { Content, Panel, Form, Button, ButtonToolbar, SelectPicker, Grid, Row, Col} from 'rsuite';

// import backGround from '../assets/images/bus.jpg';

function SignUp() {

    const gender = ['Male', 'Female'].map(item => ({
        label: item,
        value: item
    }));

    return (
    <>
    <Grid fluid>
        <Row className="show-grid">
            <Col xs={12}>
            <Content style={{ padding: '30px'}}>
                <Panel bordered shaded style={{ display: 'inline-block', width: 500, paddingRight: '30px', paddingLeft: '30px', paddingTop: '10px', paddingBottom: '10px' }}>
                <h1 style={{ textAlign: 'center' }}>Sign Up</h1>
                    <Form fluid>
                        <Form.Group controlId="name">
                            <Form.Control name="name" placeholder='Username'/>
                        </Form.Group>
                        <Form.Group controlId="email">
                            <Form.Control name="email" type="email" placeholder="Email" />
                        </Form.Group>
                        <Form.Group controlId="selectPicker">
                            <SelectPicker name="gender" data={gender} block searchable={false} placeholder="Select Gender" />
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Control name="password" type="password" autoComplete="off" placeholder="Password" />
                        </Form.Group>
                        <Form.Group controlId="confirm-password">
                            <Form.Control name="confirm-password" type="password" autoComplete="off" placeholder="Confirm Password" />
                        </Form.Group>
                        <Form.Group>
                            <ButtonToolbar>
                                <Button appearance="primary" color="violet" type="submit">Submit</Button>
                            </ButtonToolbar>
                        </Form.Group>
                    </Form>
                </Panel>
            </Content>
            </Col>
        </Row>
    </Grid>
    </>
    );
}

export default SignUp;
