import React, { useEffect, useState } from "react";
import { Navbar, Nav, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../static/images/logo.png";
import LoginModal from "./LoginModal";

const NavBar = () => {
  const [show, setShow] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  const handleShow = () => {
    setShow(true);
  };

  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    const handleTokenChange = () => {
      const token = localStorage.getItem("access");
      setIsAuthenticated(!!token);
    };

    handleTokenChange();

    window.addEventListener("storage", handleTokenChange);

    return () => {
      window.removeEventListener("storage", handleTokenChange);
    };
  }, []);

  const handleProfile = () => {
    navigate("/profile"); // Замініть "/profile" на шлях до сторінки профілю
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
            {!isAuthenticated ? (
              <Button variant="primary" className="mr-2" onClick={handleShow}>
                Log In
              </Button>
            ) : (
              <>
                <Button variant="primary" className="mr-2" onClick={handleProfile}>
                  Profile
                </Button>
                <Nav.Link as={Link} to="/signout" style={{ marginLeft: "10px" }} className="nav-link">
                  Sign out
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <LoginModal show={show} handleClose={handleClose} handleShow={handleShow} />
    </>
  );
};

export default NavBar;
