import React from 'react';
import { Container, Button, Col, Row, FormGroup, FormLabel, Card, CardBody } from 'react-bootstrap';
import { ErrorMessage, Field, Formik, Form } from 'formik';
import CryptoJS from "crypto-js";
import { ownerRegisterationSchema } from '../../validations/signup';
import env from '../../config/env';
import { registerOwner } from '../../services/owner.service';
import '../../styles/login.css'

function Signup() {
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    password: '',
    confirmPassword: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    zipCode: '',
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setSubmitting(true);

    const enpass = CryptoJS.AES.encrypt(values.password, env.secretKey).toString();
    const payload = { ...values, password: enpass };
    delete payload.confirmPassword;

    await registerOwner(payload).then((res) => {
      setSubmitting(false);
      console.log(res);
      console.log("Success");
    }).catch((err) => {
      setSubmitting(false);
      console.log(err);
      console.log("Failed");
    });
  };

  return (
    <div className='view d-flex align-items-center m-0'>
      <Container className='d-flex justify-content-center'>
        <Card className='rounded-0 shadow-lg mx-5 col-6'>
          <CardBody className='m-4 d-flex flex-column'>
            <h2 className='text-center fw-bold'>Registration Form</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={ownerRegisterationSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className='d-flex flex-column'>

                  <Row className='mt-2'>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='firstName' className='small text-muted m-0' >First Name</FormLabel>
                        <Field type='text' name='firstName' className='form-control' />
                        <ErrorMessage name='firstName' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='lastName' className='small text-muted m-0' >Last Name</FormLabel>
                        <Field type='text' name='lastName' className='form-control' />
                        <ErrorMessage name='lastName' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className='mt-2'>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='email' className='small text-muted m-0' >Email</FormLabel>
                        <Field type='email' name='email' className='form-control' />
                        <ErrorMessage name='email' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='phoneNumber' className='small text-muted m-0' >Phone Number</FormLabel>
                        <Field type='number' name='phoneNumber' className='form-control' />
                        <ErrorMessage name='phoneNumber' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className='mt-2'>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='password' className='small text-muted m-0' >Password</FormLabel>
                        <Field type='password' name='password' className='form-control' />
                        <ErrorMessage name='password' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='confirmPassword' className='small text-muted m-0' >Confirm Password</FormLabel>
                        <Field type='password' name='confirmPassword' className='form-control' />
                        <ErrorMessage name='confirmPassword' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                  </Row>

                  <FormGroup className='mt-2'>
                    <FormLabel htmlFor='addressLine1' className='small text-muted m-0'  >Address Line 1</FormLabel>
                    <Field type='text' name='addressLine1' className='form-control' />
                    <ErrorMessage name='addressLine1' component='div' className='text-danger error-message' />
                  </FormGroup>

                  <Row className='mt-2'>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='addressLine2' className='small text-muted m-0' >Address Line 2</FormLabel>
                        <Field type='text' name='addressLine2' className='form-control' />
                        <ErrorMessage name='addressLine2' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='city' className='small text-muted m-0' >City</FormLabel>
                        <Field type='text' name='city' className='form-control' />
                        <ErrorMessage name='city' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Row className='mt-2'>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='state' className='small text-muted m-0' >State</FormLabel>
                        <Field type='text' name='state' className='form-control' />
                        <ErrorMessage name='state' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                    <Col>
                      <FormGroup>
                        <FormLabel htmlFor='zipCode' className='small text-muted m-0' >Zip Code</FormLabel>
                        <Field type='number' name='zipCode' className='form-control' />
                        <ErrorMessage name='zipCode' component='div' className='text-danger error-message' />
                      </FormGroup>
                    </Col>
                  </Row>

                  <Button type='submit' disabled={isSubmitting || !isValid || !dirty } className='mt-4 mx-auto'>Submit</Button>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    </div>
  );
};

export default Signup;
