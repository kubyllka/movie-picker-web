import React, { useState } from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../static/images/logo.png";
import LoginModal from "./LoginModal";

const NavBar = () => {

  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };


  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Navbar.Brand as={Link} to="/">
          <img src={logo} alt="Logo" style={{ marginRight: "20px" }} height="50" />
          KubrickStare
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/" style={{ marginLeft: "100px" }} className="nav-link">
              HomePage
            </Nav.Link>
            <Nav.Link as={Link} to="/movieTest" style={{ marginLeft: "10px" }} className="nav-link">
              Test
            </Nav.Link>
            <Nav.Link as={Link} to="/randomMovie" style={{ marginLeft: "10px" }} className="nav-link">
              Random movie
            </Nav.Link>
          </Nav>
          <Nav>
            <Button variant="primary" className="mr-2" onClick={handleShowModal}>
              Log In
            </Button>
            <Button variant="primary">
              Sign out
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal show={showModal} handleClose={handleCloseModal} handleShow={handleShowModal} />
    </>
  );
};

export default NavBar;