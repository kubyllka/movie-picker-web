import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Card,
  Container,
  Row,
  Col,
  Button,
  ButtonGroup
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RandomMovie = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isFavorite, setIsFavorite] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access');
    setIsAuthenticated(!!token);
  }, []);


  const fetchRandomMovies = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/api/test/", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.log("Error fetching random movies:", response.status);
      }
      setIsLoading(false);
    } catch (error) {
      console.log("Error fetching random movies:", error);
      setIsLoading(false);
    }
  };

  const addToWatchLater = (movie) => {
    fetchWatchLater("add_to_watch_later", movie);
  };

  const removeFromWatchLater = (movie) => {
    fetchWatchLater("remove_from_watch_later", movie);
  };

  const fetchWatchLater = async (endpoint, movie) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/${endpoint}/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem('access')}`,
        },
        body: JSON.stringify({ movieId: movie.id }),
      });
      if (response.ok) {
        setIsFavorite((prevFavorites) => {
          const updatedFavorites = { ...prevFavorites };
          if (endpoint === "add_to_watch_later") {
            updatedFavorites[movie.id] = true;
          } else {
            delete updatedFavorites[movie.id];
          }
          return updatedFavorites;
        });
      } else {
        console.log(`Failed to ${endpoint} movie from WatchLater`);
      }
    } catch (error) {
      console.log(`Error ${endpoint} movie from WatchLater:`, error);
    }
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
    fetchRandomMovies();
  }, []);

  useEffect(() => {
    if(isAuthenticated){
      movies.forEach((movie) => {
        checkFavoriteStatus(movie);
      });
    }
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
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Failed to finish the test");
        }
      })
      .then((data) => {
        console.log('Recommendation:', data.recommended_movies);
        navigate("/result", { state: { data: data.recommended_movies } });
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const isFinishButtonDisabled = selectedMovies.length === 0;

  return (
    <Container fluid className="containerStyles">
      {!isLoading && movies.length > 0 && (
        <Container fluid>
          <Row className="testSection">
            <Col>
              <h2>Test Information</h2>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis posuere est sit amet est maximus,
                in volutpat risus efficitur. Nulla facilisi. Phasellus pharetra commodo turpis, id tincidunt sem
                posuere vel. Quisque in nisi consequat, commodo neque ut, porta turpis. Donec semper odio vitae erat
                facilisis dignissim. Nullam vulputate, nisi sit amet mattis tincidunt, eros purus pellentesque massa,
                sed fermentum nisi enim sit amet mauris.
              </p>
            </Col>
          </Row>
          {movies.map((movie) => (
            <Card key={movie.id} className="cardStyles">
              <Row>
                <Col md={3}>
                  <Card.Img
                    variant="top"
                    src={movie.poster_path}
                    alt={movie.title}
                    className="imageStyles"
                  />
                </Col>
                <Col md={8}>
                  <Card.Body className="text">
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>{movie.overview}</Card.Text>
                    <Card.Text>Year: {movie.year}</Card.Text>
                    <Card.Text>Vote Average: {movie.vote_average}</Card.Text>
                    <Card.Text>Genres: {movie.genres.join(", ")}</Card.Text>
                    <Card.Text>Keywords: {movie.keywords.join(", ")}</Card.Text>

                    <ButtonGroup>
                      <Button
                        variant={
                          selectedMovies.includes(movie) ? "primary" : "outline-primary"
                        }
                        onClick={() => handleMovieSelect(movie)}
                      >
                        {selectedMovies.includes(movie) ? "Selected" : "Select"}
                      </Button>
                      <Button variant="outline-info" href={movie.trailer_link}>
                        Trailer
                      </Button>
                      {isAuthenticated && (
                        <Button
                          variant={isFavorite[movie.id] ? "light" : "outline-light"}
                          onClick={() =>
                            isFavorite[movie.id]
                              ? removeFromWatchLater(movie)
                              : addToWatchLater(movie)
                          }
                        >
                          {isFavorite[movie.id]
                            ? "Remove from WatchLater"
                            : "Add to WatchLater"}
                        </Button>
                      )}
                    </ButtonGroup>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <div className="text-center mt-4">
            <Button
              variant="outline-success"
              onClick={handleFinishTest}
              disabled={isFinishButtonDisabled}
            >
              Finish Test
            </Button>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default RandomMovie;
