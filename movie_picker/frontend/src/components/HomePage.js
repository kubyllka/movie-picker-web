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
    padding: "0px",
    overflowY: "auto",
    minHeight: "100vh",
  };

  return (
    <Container fluid={true} style={containerStyles}>
      <Slider />
      <Container className="mt-5">
        <Row >
          <Col md={5} className="text-center">
            <img src={logo} alt="" height={400} />
          </Col>
          <Col md={6} className="text-center mt-3">
            <div>
              <h1 className="mb-4">Welcome to KubrickStare!</h1>
              <p>
                Are you a movie enthusiast looking for personalized movie recommendations?
                Look no further! KubrickStare is your ultimate destination for discovering movies based on
                your unique preferences.

                Take a short test and we will recommend you some movies
              </p>
              <Row className="justify-content-center mt-4">
                <Link to="/movieTest">
                  <Button variant="outline-light">
                    Take a test
                  </Button>
                </Link>
                <h6 className="mx-3">OR</h6>
                <Link to="/randomMovie">
                  <Button variant="outline-light">
                    Get random movie
                  </Button>
                </Link>
              </Row>
            </div>
          </Col>
        </Row>
      </Container>
    </Container>
  );
};

export default HomePage;
