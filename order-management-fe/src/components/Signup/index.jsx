import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
import "../../styles/login.css"

function Signup() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    userAddress: '',
    userPhoneNumber: '',
    hotelName: '',
    hotelAddress: '',
    hotelPhoneNumber: '',
    userType: 'user',
  });

  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(formData);
  // };

  const handleOnClickLogin = (e) => {
    e.preventDefault();
    navigate("/")
  };

  const handleStepOneSubmit = (e) => {
    e.preventDefault();
    setCurrentStep(2);
  };

  const handleStepTwoSubmit = (e) => {
    e.preventDefault();
  };

  const stepTwoForm = (
    <Form onSubmit={handleStepTwoSubmit} className="d-flex flex-column">
      <Form.Group className="my-2" controlId="hotelName">
        <Form.Label className="label-font">Hotel Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter hotel name"
          name="hotelName"
          value={formData.hotelName}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="hotelAddress">
        <Form.Label className="label-font">Hotel Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter hotel address"
          name="hotelAddress"
          value={formData.hotelAddress}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="hotelPhoneNumber">
        <Form.Label className="label-font">Hotel Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter hotel phone number"
          name="hotelPhoneNumber"
          value={formData.hotelPhoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="userType">
        <Form.Label className="label-font">User Type</Form.Label>
        <div>
          <Form.Check
            inline
            type="radio"
            label="Admin"
            name="userType"
            id="admin"
            value="admin"

            checked={formData.userType !== "owner"}
            onChange={handleChange}
          />
          <Form.Check
            inline
            type="radio"
            label="Owner"
            name="userType"
            id="owner"
            value="owner"
            checked={formData.userType === "owner"}
            onChange={handleChange}
          />
        </div>
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3 mx-auto">
        Submit
      </Button>
    </Form>
  );

  const stepOneForm = (
    <Form onSubmit={handleStepOneSubmit} className="d-flex flex-column">
        <Form.Group className="my-2" controlId="firstName">
          <Form.Label className="label-font">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your first name"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="my-2" controlId="lastName">
          <Form.Label className="label-font">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your last name"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />
        </Form.Group>

      <Form.Group className="my-2" controlId="userAddress">
        <Form.Label className="label-font">User Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter your address"
          name="userAddress"
          value={formData.userAddress}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Form.Group className="my-2" controlId="userPhoneNumber">
        <Form.Label className="label-font">User Phone Number</Form.Label>
        <Form.Control
          type="tel"
          placeholder="Enter your phone number"
          name="userPhoneNumber"
          value={formData.userPhoneNumber}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-3 mx-auto">
        Next
      </Button>
    </Form>
  );

  return (
    <Row className="view d-flex align-items-center m-0">
      <Col className="col-12 col-md-4 m-auto">
        <Container className="bg-white shadow-lg p-5">
          <h1 className="text-center mb-4 fw-bold">Signup</h1>
          {currentStep === 1 ? stepOneForm : stepTwoForm}
          <div className="mt-4 text-center">
            <p className="label-font m-0">Already have an account? <span role="button" className="text-primary" onClick={handleOnClickLogin}>Login</span></p>
          </div>
        </Container>
      </Col>
    </Row>
  );
};

export default Signup;
