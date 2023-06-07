import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../../static/images/logo.png";

const NavBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
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

        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
