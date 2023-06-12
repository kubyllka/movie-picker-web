import React, { useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const LoginModal = ({
  show,
  handleClose,
  handleShow,
  isAuthenticated,
  setIsAuthenticated,
}) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    if (!username || !password) {
      setErrorMessage("Please enter username and password.");
      setUsernameError(!username);
      setPasswordError(!password);
      return;
    }

    fetch("http://127.0.0.1:8000/api/correctLogInfo/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.clear();
          localStorage.setItem("access", data.access);
          localStorage.setItem("refresh", data.refresh);
          setIsAuthenticated(true);
          navigate("/");
          handleClose();
        } else {
          setErrorMessage("Invalid username or password. Please try again.");
          setUsernameError(true);
          setPasswordError(true);
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
    setUsernameError(false);
    setPasswordError(false);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    setPasswordError(false);
    setUsernameError(false);
  };

  const handleRegisterClick = () => {
    navigate("/register");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
              className={usernameError ? "is-invalid" : ""}
            />
          </Form.Group>
          <Form.Group controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
              className={passwordError ? "is-invalid" : ""}
            />
          </Form.Group>
          <Button variant="primary" onClick={handleLogin}>
            Log in
          </Button>
          <h6>{errorMessage}</h6>
          <p>
            Don't have an account?{" "}
            <Button variant="link" onClick={handleRegisterClick}>
              Register
            </Button>
          </p>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default LoginModal;
