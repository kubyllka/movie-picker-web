import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const RandomMovie = () => {
  const [movie, setMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchRandomMovie = () => {
    fetch("http://127.0.0.1:8000/api/random_movie/", {
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setMovie(data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error fetching random movie:", error);
        setIsLoading(false);
      });
  };

  const checkFavoriteStatus = (movieId) => {
    fetch("http://127.0.0.1:8000/api/check_favorite_status/", {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      method: "POST",
      body: JSON.stringify({ movieId }),
    })
      .then((response) => response.json())
      .then((data) => {
        setIsFavorite(data.isFavorite);
      })
      .catch((error) => {
        console.log("Error checking favorite status:", error);
      });
  };

  useEffect(() => {
    fetchRandomMovie();
  }, []);

  useEffect(()=>{
    if(isAuthenticated){
      checkFavoriteStatus(data.id);
    }
  }, []);

  const addToWatchLater = () => {
    fetch("http://127.0.0.1:8000/api/add_to_watch_later/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then((response) => {
        if (response.ok) {
          setIsFavorite(true);
        } else {
          console.log("Failed to add movie to WatchLater");
        }
      })
      .catch((error) => {
        console.log("Error adding movie to WatchLater:", error);
      });
  };

  const removeFromWatchLater = () => {
    fetch("http://127.0.0.1:8000/api/remove_from_watch_later/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access")}`,
      },
      body: JSON.stringify({ movieId: movie.id }),
    })
      .then((response) => {
        if (response.ok) {
          setIsFavorite(false);
        } else {
          console.log("Failed to remove movie from WatchLater");
        }
      })
      .catch((error) => {
        console.log("Error removing movie from WatchLater:", error);
      });
  };

  const handleRefreshMovie = () => {
    setIsLoading(true);
    fetchRandomMovie();
  };

  useEffect(() => {
    const token = localStorage.getItem("access");
    setIsAuthenticated(!!token);
  }, []);

  return (
    <Container fluid={true} className="containerStyles">
      {!isLoading && movie && (
        <Container fluid>
          <Card className="cardStyles">
            <Row>
              <Col md={3}>
                <Card.Img
                  variant="top"
                  src={movie.poster_path}
                  alt={movie.title}
                  className="imageStyles"
                />
                <Button variant="light" onClick={handleRefreshMovie} className="redo-button" >
                  <FontAwesomeIcon icon={faRedo} />
                </Button>
              </Col>
              <Col md={7}>
                <Card.Body className="text">
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
                        variant={isFavorite ? "light" : "outline-light"}
                        onClick={isFavorite ? removeFromWatchLater : addToWatchLater}
                      >
                        {isFavorite ? "Remove from WatchLater" : "Add to WatchLater"}
                      </Button>
                    )}
                  </ButtonGroup>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Container>
      )}
    </Container>
  );
};

export default RandomMovie;
