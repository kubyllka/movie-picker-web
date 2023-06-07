import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Container } from "react-bootstrap";

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
  };

  const cardStyles = {
    backgroundColor: "#343a40",
    color: "white",
    width: "80%",
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  const imageStyles = {
    width: "200px",
    float: "left",
    marginRight: "20px",
  };

  return (
    <Container fluid={true} style={containerStyles}>
      {!isLoading && movie && (
        <div className="d-flex justify-content-center align-items-center" style={{ backgroundColor: "black" }}>
          <Card style={cardStyles}>
            <Card.Body>
              <img src={movie.poster_path} alt={movie.title} style={imageStyles} />
              <Card.Title>{movie.title}</Card.Title>
              <Card.Text>{movie.overview}</Card.Text>
              <Card.Text>Year: {movie.year}</Card.Text>
              <Card.Text>Vote Average: {movie.vote_average}</Card.Text>
              <Card.Text>Genres: {movie.genres.join(", ")}</Card.Text>
              <Card.Text>Keywords: {movie.keywords.join(", ")}</Card.Text>
              <Card.Link href={movie.trailer_link}>Trailer</Card.Link>
            </Card.Body>
          </Card>
        </div>
      )}
    </Container>
  );
};

export default RandomMovie;
