import { Button, Card, CardBody, Container, FormGroup, FormLabel } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import CryptoJS from "crypto-js";
import { toast } from 'react-toastify';
import { loginSchema } from '../../validations/auth';
import { login } from '../../services/owner.service';
import env from '../../config/env';

function Login() {
  let navigate = useNavigate();

  const handleOnClickSignup = (e) => {
    e.preventDefault();
    navigate('/signup')
  }

  const handleOnClickForgotPassword = (e) => {
    e.preventDefault();
    navigate('/forgot-password')
  }

  const initialValues = {
    email: '',
    password: ''
  }

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setSubmitting(true);
      const enpass = CryptoJS.AES.encrypt(values.password, env.cryptoSecret).toString();
      const payload = { ...values, password: enpass };

      const res = await login(payload);
      localStorage.setItem('token', res.token);
      toast.success('Login successfully');
      setSubmitting(false);
      navigate('/dashboard');
    } catch (err) {
      setSubmitting(false);
      toast.error(`Failed to login: ${err.message}`);
    }
  }

  return (
    <div className='view d-flex align-items-center m-0'>
      <Container className='d-flex justify-content-center'>
        <Card className='rounded-0 shadow-lg mx-5 col-6'>
          <CardBody className='m-4 d-flex flex-column'>
            <h2 className='text-center fw-bold'>Login</h2>
            <Formik
              initialValues={initialValues}
              validationSchema={loginSchema}
              onSubmit={handleSubmit}
            >
              {({ isSubmitting, isValid, dirty }) => (
                <Form className='d-flex flex-column'>
                  <FormGroup className='mt-2'>
                    <FormLabel htmlFor='email' className='small text-muted m-0'>Email</FormLabel>
                    <Field type='email' name='email' className='form-control' />
                    <ErrorMessage name='email' component='div' className='text-danger error-message' />
                  </FormGroup>
                  <FormGroup className='mt-2'>
                    <FormLabel htmlFor='password' className='small text-muted m-0'>Password</FormLabel>
                    <Field type='password' name='password' className='form-control' />
                    <ErrorMessage name='password' component='div' className='text-danger error-message' />
                  </FormGroup>
                  <Button disabled={isSubmitting || !isValid || !dirty} type='submit' className='btn-primary btn-block mx-auto mt-4'>Login</Button>
                  <div className='mt-4 text-center'>
                    <p className='label-font m-0'>Don't have an account? <span role='button' className='text-primary' onClick={handleOnClickSignup}>Sign Up</span></p>
                    <p className='label-font m-0'><span className='text-primary' role='button' onClick={handleOnClickForgotPassword}>Forgot your password?</span></p>
                  </div>
                </Form>
              )}
            </Formik>
          </CardBody>
        </Card>
      </Container>
    </div>
  )
}

export default Login;