import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const recommendedMovies = location.state?.data || [];
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const containerRef = useRef(null);
  const isFirstLoad = useRef(true);


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

  const totalPages = Math.ceil(recommendedMovies.length / moviesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const currentMovies = recommendedMovies.slice(startIndex, endIndex);

  useEffect(() => {
    if (isFirstLoad.current) {
      containerRef.current.scrollTo(0, 0);
      isFirstLoad.current = false;
    } else {
      containerRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }, [currentPage]);

  return (
    <Container fluid={true} style={containerStyles} ref={containerRef}>
      {!isLoading && recommendedMovies.length > 0 && (
        <Container fluid={true}>
          {currentMovies.map((movie) => (
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
                    <Button variant="outline-light" href={movie.trailer_link} style={trailerButtonStyles}>
                      Trailer
                    </Button>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div style={{ textAlign: "center", marginTop: "20px" }}>
            <Button variant="light" onClick={handlePrevPage} disabled={currentPage === 1}>
              Previous
            </Button>{" "}
            <Button variant="light" onClick={handleNextPage} disabled={currentPage === totalPages}>
              Next
            </Button>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default ResultPage;
