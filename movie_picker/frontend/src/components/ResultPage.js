import React, { useEffect, useState, useRef } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";

const ResultPage = () => {
  const location = useLocation();
  const recommendedMovies = location.state?.data || [];
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const moviesPerPage = 10;
  const [isFavorite, setIsFavorite] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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


  const addToWatchLater = (movie) => {
    fetch("http://127.0.0.1:8000/api/add_to_watch_later/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then((response) => {
        if (response.ok) {
          setIsFavorite((prevFavorites) => ({
            ...prevFavorites,
            [movie.id]: true,
          }));
        } else {
          console.log("Failed to add movie to WatchLater");
        }
      })
      .catch((error) => {
        console.log("Error adding movie to WatchLater:", error);
      });
  };

  const removeFromWatchLater = (movie) => {
    fetch("http://127.0.0.1:8000/api/remove_from_watch_later/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then((response) => {
        if (response.ok) {
          setIsFavorite((prevFavorites) => {
            const updatedFavorites = { ...prevFavorites };
            delete updatedFavorites[movie.id];
            return updatedFavorites;
          });
        } else {
          console.log("Failed to remove movie from WatchLater");
        }
      })
      .catch((error) => {
        console.log("Error removing movie from WatchLater:", error);
      });
  };


  const checkFavoriteStatus = (movie) => {
    fetch("http://127.0.0.1:8000/api/check_favorite_status/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem('access')}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to check favorite status");
        }
      })
      .then((data) => {
        setIsFavorite((prevFavorites) => ({
          ...prevFavorites,
          [movie.id]: data.isFavorite,
        }));
      })
      .catch((error) => {
        console.log("Error checking favorite status:", error);
      });
  };

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);

  useEffect(() => {
    if(isAuthenticated){
      currentMovies.forEach((movie) => {
      checkFavoriteStatus(movie);
    });
    }
  }, [currentPage]);


  return (
    <Container fluid={true} className="containerStyles">
      {!isLoading && recommendedMovies.length > 0 && (
        <Container fluid={true} ref={containerRef}>
          {currentMovies.map((movie) => (
            <Card key={movie.id} className="cardStyles">
              <Row>
                <Col md={3}>
                  <Card.Img variant="top" src={movie.poster_path} alt={movie.title} className="imageStyles" />
                </Col>
                <Col md={8} className="text">
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Card.Text>Year: {movie.year}</Card.Text>
                    <Card.Text>Vote Average: {movie.vote_average}</Card.Text>
                    <Card.Text>Genres: {movie.genres.join(", ")}</Card.Text>
                    <Card.Text>Keywords: {movie.keywords.join(", ")}</Card.Text>
                    <ButtonGroup>
                      <Button variant="outline-info" href={movie.trailer_link}>
                        Trailer
                      </Button>
                      {isAuthenticated && (
                        <Button
                          variant={isFavorite[movie.id] ? "light" : "outline-light"}
                          onClick={() =>
                            isFavorite[movie.id] ? removeFromWatchLater(movie) : addToWatchLater(movie)
                          }
                        >
                          {isFavorite[movie.id] ? "Remove from WatchLater" : "Add to WatchLater"}
                        </Button>
                      )}
                    </ButtonGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}

          <ButtonGroup className="d-block text-center"  >
            <Button variant="light" size="sm" onClick={handlePrevPage} disabled={currentPage === 1} >
              Previous
            </Button>
            <Button variant="light" size="sm"  onClick={handleNextPage} disabled={currentPage === totalPages} >
              Next
            </Button>
          </ButtonGroup>
        </Container>
      )}
    </Container>
  );
};

export default ResultPage;
