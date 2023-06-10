import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RandomMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const navigate  = useNavigate();
  const fetchRandomMovies = () => {
    fetch("http://127.0.0.1:8000/api/test/")
      .then((response) => response.json())
      .then((data) => {
        setMovies(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching random movies:", error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchRandomMovies();
  }, []);

  const handleMovieSelect = (movie) => {
    const isSelected = selectedMovies.includes(movie);
    if (isSelected) {
      setSelectedMovies(selectedMovies.filter((selectedMovie) => selectedMovie !== movie));
    } else {
      setSelectedMovies([...selectedMovies, movie]);
    }
  };

 const handleFinishTest = () => {
  fetch('http://127.0.0.1:8000/api/test/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(selectedMovies),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Recommendation:', data.recommended_movies);
      navigate("/result", { state: { data: data.recommended_movies } });
    })
    .catch((error) => {
      console.error('Error:', error);
    });
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

  const cardStyles = {
    backgroundColor: "#343a40",
    color: "white",
    width: "80%",
    margin: "20px auto",
    padding: "20px",
    overflow: "hidden"
  };

  const imageStyles = {
    width: "200px",
    height: "300px",
    objectFit: "cover",
  };

  const titleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "10px",
  };

  const overviewStyles = {
    marginBottom: "10px",
  };

  const yearStyles = {
    marginBottom: "10px",
  };

  const voteAverageStyles = {
    marginBottom: "10px",
  };

  const genresStyles = {
    marginBottom: "10px",
  };

  const keywordsStyles = {
    marginBottom: "10px",
  };

  const trailerButtonStyles = {
    marginLeft: "30px",
  };


  return (
    <Container fluid = {true} style={containerStyles}>

      {!isLoading && movies.length > 0 && (
        <Container fluid={true}>
          {movies.map((movie) => (
            <Card key={movie.id} style={cardStyles}>
              <Row>
                <Col md={3}>
                  <Card.Img variant="top" src={movie.poster_path} alt={movie.title} style={imageStyles} />
                </Col>
                <Col md={8}>
                  <Card.Body>
                    <Card.Title style={titleStyles}>{movie.title}</Card.Title>
                    <Card.Text style={overviewStyles}>{movie.overview}</Card.Text>
                    <Card.Text style={yearStyles}>Year: {movie.year}</Card.Text>
                    <Card.Text style={voteAverageStyles}>Vote Average: {movie.vote_average}</Card.Text>
                    <Card.Text style={genresStyles}>Genres: {movie.genres.join(", ")}</Card.Text>
                    <Card.Text style={keywordsStyles}>Keywords: {movie.keywords.join(", ")}</Card.Text>
                    <Button
                      variant={selectedMovies.includes(movie) ? "primary" : "outline-primary"}
                      onClick={() => handleMovieSelect(movie)}
                    >
                      {selectedMovies.includes(movie) ? "Selected" : "Select"}
                    </Button>
                    <Button variant="outline-light" href={movie.trailer_link} style={trailerButtonStyles}>
                    Trailer
                  </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div style={{ textAlign: "center" }}>
            <Button variant="success" onClick={handleFinishTest}>
              Finish Test
            </Button>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default RandomMovie;
