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

  const contentStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start", padding: "20px"

  };

  return (
      <Container fluid={true} style={containerStyles}>
         <Slider />
        <Container>
           <Row>
          <Col md={5}>
            <img style = {contentStyles} src={logo} alt="" height={400} />
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
                <Row>
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
                </Row>
            </div>
          </Col>
        </Row>
        </Container>
      </Container>
  )
};

const containerStyles = {
    backgroundColor: "black",
    minHeight: "100vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  };

export default HomePage;
