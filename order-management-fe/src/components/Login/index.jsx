import { Button, Card, CardBody, Col, Container, Form, FormControl, FormGroup, FormLabel, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"

function Login() {
  let navigate = useNavigate();

  const handleOnClickSignup = (e) => {
    e.preventDefault();
    navigate("/signup")
  }

  const handleOnClickForgotPassword = (e) => {
    e.preventDefault();
    navigate("/forgot-password")
  }

  return (
    <div className="view d-flex align-items-center">
      <Container>
        <Row className="justify-content-center">
          <Col className="col-md-6">
            <Card className="rounded-0 shadow-lg">
              <CardBody className="m-4">
                <h2 className="text-center mb-4 fw-bold">Login</h2>
                <Form className="d-flex flex-column">
                  <FormGroup>
                    <FormLabel htmlFor="username" className="label-font">Username</FormLabel>
                    <FormControl type="text" id="username" placeholder="Enter username" />
                  </FormGroup>
                  <FormGroup className="mt-3">
                    <FormLabel htmlFor="password" className="label-font">Password</FormLabel>
                    <FormControl type="password" id="password" placeholder="Password" />
                  </FormGroup>
                  <Button type="submit" className="btn-primary btn-block mx-auto mt-4">Login</Button>
                </Form>
                <div className="mt-4 text-center">
                  <p className="label-font m-0">Don't have an account? <span role="button" className="text-primary" onClick={handleOnClickSignup}>Sign Up</span></p>
                  <p className="label-font m-0"><span className="text-primary" role="button" onClick={handleOnClickForgotPassword}>Forgot your password?</span></p>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Login;