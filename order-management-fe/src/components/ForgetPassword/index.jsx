import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Button, Card, CardBody, Col, Container, Form, Row } from 'react-bootstrap';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Email submitted:', email);
    };

    const handleOnClickLogin = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className="view d-flex align-items-center">
            <Container>
                <Row className="justify-content-center">
                    <Col className="col-md-6">
                        <Card className="rounded-0 shadow-lg">
                            <CardBody className="m-4">
                                <h2 className="text-center mb-4 fw-bold">Forgot Password</h2>
                                <Form onSubmit={handleSubmit} className="d-flex flex-column">
                                    <Form.Group controlId="email">
                                        <Form.Label className="label-font">Email address</Form.Label>
                                        <Form.Control
                                            type="email"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" block className="my-4 mx-auto">
                                        Reset Password
                                    </Button>
                                </Form>
                                <div className="text-center">
                                    <p className="label-font m-0">Already have an account ? <span role="button" className="text-primary" onClick={handleOnClickLogin}>Login</span></p>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;
