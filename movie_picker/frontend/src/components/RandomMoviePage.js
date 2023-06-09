import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container, Row, Col, Button } from "react-bootstrap";

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomMovie = () => {
    fetch("http://127.0.0.1:8000/api/random_movie/")
      .then(response => response.json())
      .then(data => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log("Error fetching random movie:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  const containerStyles = {
    backgroundColor: "black",
    minHeight: "100vh",
    overflowY: "auto",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
    marginTop: "56px",
  };

  const cardStyles = {
    backgroundColor: "#343a40",
    color: "white",
    width: "80%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    overflow: "hidden",
  };

  const imageStyles = {
    width: "200px",
    height: "300px",
    objectFit: "cover",
    float: "left",
    marginRight: "20px",
  };

  const titleStyles = {
    fontSize: "30px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const genresStyles = {
    marginBottom: "10px",
  };

  const keywordsStyles = {
    marginBottom: "10px",
  };

  const trailerButtonStyles = {
    marginRight: "10px",
  };

  return (
    <Container fluid={true} style={containerStyles}>
      {!isLoading && movie && (
        <Container fluid={true}>
          <Card style={cardStyles}>
            <Card.Body>
              <Row>
                <Col md={3}>
                  <img src={movie.poster_path} alt={movie.title} style={imageStyles} />
                </Col>
                <Col md={8}>
                  <Card.Title style={titleStyles}>{movie.title}</Card.Title>
                  <Card.Text>{movie.overview}</Card.Text>
                  <Card.Text>Year: {movie.year}</Card.Text>
                  <Card.Text>Vote Average: {movie.vote_average}</Card.Text>
                  <Card.Text style={genresStyles}>Genres: {movie.genres.join(", ")}</Card.Text>
                  <Card.Text style={keywordsStyles}>Keywords: {movie.keywords.join(", ")}</Card.Text>
                  <Button variant="outline-light" href={movie.trailer_link} style={trailerButtonStyles}>
                    Trailer
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Container>
      )}
    </Container>
  );
};

export default RandomMovie;
