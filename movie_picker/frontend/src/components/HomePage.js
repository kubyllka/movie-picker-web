import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "./Carousel"
import { Container, Row, Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import logo from "../../static/images/logo.png";
import { Link } from "react-router-dom";

export const HomePage = () => {
  const containerStyles = {
    backgroundColor: "black",
    color: "white",
    padding: "20px",

  };

  const contentStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",

  };

  return (
    <div style={pageStyles} className="page-container">
      <Slider />
      <Container fluid className="text-center"  style={containerStyles}>
        <Row>
          <Col md={7}>
            <img src={logo} alt="" height={400} />
          </Col>
          <Col md={5} style={contentStyles}>
            <div>
              <h1>Welcome to KubrickStare!</h1>
              <p>
                Are you a movie enthusiast looking for personalized movie recommendations?
                Look no further! KubrickStare is your ultimate destination for discovering movies based on
                your unique preferences.

                Take a short test and we will recommend you some movies
              </p>
              <Link to="/movieTest">
                <Button variant="light">
                  Take a test
                </Button>
              </Link>
              <h6>OR</h6>
              <Link to="/randomMovie">
                <Button variant="light">
                  Get random movie
                </Button>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

const pageStyles = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  overflowY: "auto",
};

export default HomePage;
