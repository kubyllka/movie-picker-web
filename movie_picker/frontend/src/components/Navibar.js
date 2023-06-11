import React, { useEffect, useState } from "react";
import { Navbar,
          Nav,
          Button,
          ButtonGroup,
          Container } from "react-bootstrap";
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
    if (localStorage.getItem("access") !== null) {
      setIsAuthenticated(true);
    }
  }, [isAuthenticated]);

  const handleProfile = () => {
    navigate("/profile");
  };

  const handleSignOut = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    navigate("/");
  };

  return (
    <>
      <Navbar collapseOnSelect bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={Link} to="/">
            <img src={logo} alt="Logo" className="mr-2" height="50" />
            KubrickStare
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link as={Link} to="/" className="mr-3">
                HomePage
              </Nav.Link>
              <Nav.Link as={Link} to="/movieTest" className="mr-3">
                Test
              </Nav.Link>
              <Nav.Link as={Link} to="/randomMovie" className="mr-3">
                Random movie
              </Nav.Link>
            </Nav>
              {!isAuthenticated ? (
                <Button variant="primary" className="mr-3" onClick={handleShow}>
                  Log In
                </Button>
              ) : (
                  <ButtonGroup>
                  <Button variant="outline-light" className="mr-3" onClick={handleProfile}>
                    Profile
                  </Button>
                  <Button variant="outline-danger" className="mr-3" onClick={handleSignOut}>
                    Sign out
                  </Button>
                    </ButtonGroup>
              )}


          </Navbar.Collapse>
        </Container>
      </Navbar>
      <LoginModal
        show={show}
        handleClose={handleClose}
        handleShow={handleShow}
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
    </>
  );
};

export default NavBar;
