import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CryptoJS from "crypto-js";
import { passwordSchema } from '../../validations/auth';
import { resetPassword } from '../../services/owner.service';
import { toast } from 'react-toastify';
import env from '../../config/env';

const ForgotPassword = () => {
    const [data, setData] = useState('');
    const navigate = useNavigate();
    const initialValues = {
        password: '',
        confirmPassword: ''
    }

    useEffect(() => {
        (async () => {
            try {
                const url = new URL(window.location.href);
                const token = decodeURIComponent(url.searchParams.get('token'));
                if (!token) {
                    navigate('/404')
                    return;
                }
                const data = JSON.parse(CryptoJS.AES.decrypt(token, env.cryptoSecret).toString(CryptoJS.enc.Utf8));
                const keys = Object.keys(data);
                if (keys.length === 2 && keys.includes('email') && keys.includes('expires')) {
                    setData({ email: data.email, expires: data.expires });
                }
            } catch (err) {
                toast.error(`Failed to verify email: ${err.message}`);
            }
        })();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            const enpass = CryptoJS.AES.encrypt(values.password, env.cryptoSecret).toString();
            await resetPassword({ newPassword: enpass, ...data });
            toast.success('Password reset successfully');
            setSubmitting(false);
            navigate('/');
        } catch (err) {
            setSubmitting(false);
            toast.error(`Failed to send: ${err.message}`);
        }
    };

    return (
        data && 
        <div className='view d-flex align-items-center'>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-md-6'>
                        <Card className='rounded-0 shadow-lg'>
                            <CardBody className='m-4'>
                                <h2 className='text-center fw-bold'>Reset Password</h2>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={passwordSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting, dirty, isValid }) => (
                                        <Form className='d-flex flex-column'>
                                            <FormGroup className='mt-2'>
                                                <FormLabel htmlFor='password' className='small text-muted m-0'>New Password</FormLabel>
                                                <Field type='password' name='password' className='form-control' />
                                                <ErrorMessage name='password' component='div' className='text-danger error-message' />
                                            </FormGroup>
                                            <FormGroup className='mt-2'>
                                                <FormLabel htmlFor='confirmPassword' className='small text-muted m-0'>Confirm Password</FormLabel>
                                                <Field type='password' name='confirmPassword' className='form-control' />
                                                <ErrorMessage name='confirmPassword' component='div' className='text-danger error-message' />
                                            </FormGroup>
                                            <Button disabled={isSubmitting || !isValid || !dirty} variant='primary' type='submit' className='my-4 mx-auto'>
                                                Reset
                                            </Button>
                                        </Form>
                                    )}
                                </Formik>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </div>
    );
};

export default ForgotPassword;
