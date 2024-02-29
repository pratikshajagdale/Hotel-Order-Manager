import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, CardBody, Col, Container, FormGroup, FormLabel, Row } from 'react-bootstrap';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { emailSchema } from '../../validations/auth';
import { forgotPassword } from '../../services/owner.service';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const initialValues = {
        email: ''
    }
    const handleSubmit = async (values, { setSubmitting }) => {
        try {
            setSubmitting(true);
            await forgotPassword(values)
            toast.success('Reset password email sent successfully');
            setSubmitting(false);
            navigate('/');
        } catch (err) {
            setSubmitting(false);
            toast.error(`Failed to send: ${err.message}`);
        }
    };

    const handleOnClickLogin = (e) => {
        e.preventDefault();
        navigate('/');
    }

    return (
        <div className='view d-flex align-items-center'>
            <Container>
                <Row className='justify-content-center'>
                    <Col className='col-md-6'>
                        <Card className='rounded-0 shadow-lg'>
                            <CardBody className='m-4'>
                                <h2 className='text-center fw-bold'>Forgot Password</h2>
                                <Formik
                                    initialValues={initialValues}
                                    validationSchema={emailSchema}
                                    onSubmit={handleSubmit}
                                >
                                    {({ isSubmitting, dirty, isValid }) => (
                                        <Form className='d-flex flex-column'>
                                            <FormGroup className='mt-2'>
                                                <FormLabel htmlFor='email' className='small text-muted m-0'>Email</FormLabel>
                                                <Field type='email' name='email' className='form-control' />
                                                <ErrorMessage name='email' component='div' className='text-danger error-message' />
                                            </FormGroup>
                                            <Button disabled={isSubmitting || !isValid || !dirty} variant='primary' type='submit' className='my-4 mx-auto'>
                                                Send Email
                                            </Button>
                                            <div className='text-center'>
                                                <p className='label-font m-0'>Already have an account ? <span role='button' className='text-primary' onClick={handleOnClickLogin}>Login</span></p>
                                            </div>
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
