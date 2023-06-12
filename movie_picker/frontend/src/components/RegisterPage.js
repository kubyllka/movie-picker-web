import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import "bootstrap/dist/css/bootstrap.min.css";

function FormExample() {
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    confirm_password: '',
    agree: false,
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      if (formData.password !== formData.confirm_password) {
        return; // Don't submit the form if passwords don't match
      }

      fetch('http://127.0.0.1:8000/api/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    setValidated(true);
  };

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    const fieldValue = type === 'checkbox' ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: fieldValue,
    }));
  };

  return (
    <Container fluid={true} className="containerStyles">
      <Card bg="dark" text="light" className="p-4">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              First name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="first_name"
                type="text"
                placeholder="First name"
                value={formData.first_name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Last name
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="last_name"
                type="text"
                placeholder="Last name"
                value={formData.last_name}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Username
            </Form.Label>
            <Col sm={9}>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  name="username"
                  type="text"
                  placeholder="Username"
                  aria-describedby="inputGroupPrepend"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Email
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Please provide a password.
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm={3}>
              Confirm Password
            </Form.Label>
            <Col sm={9}>
              <Form.Control
                name="confirm_password"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleChange}
                required
                className={formData.password !== formData.confirm_password ? 'is-invalid' : ''}
              />
              <Form.Control.Feedback type="invalid">
                {formData.password !== formData.confirm_password && 'Passwords do not match.'}
              </Form.Control.Feedback>
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ offset: 2, span: 9 }}>
              <Form.Check
                name="agree"
                required
                label="Agree to terms and conditions"
                feedback="You must agree before submitting."
                feedbackType="invalid"
                onChange={handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col sm={{ offset: 2, span: 9 }}>
              <Button type="submit">Submit form</Button>
            </Col>
          </Form.Group>
        </Form>
      </Card>
    </Container>
  );
}

export default FormExample;
