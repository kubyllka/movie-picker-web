import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button, ButtonGroup } from "react-bootstrap";
import MovieDetailModal from "./MovieInfoModal";

const ProfilePage = () => {
  const [watchlist, setWatchlist] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleShowDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
    setShowModal(false);
  };

  useEffect(() => {
    const fetchWatchlist = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8000/api/watchlist/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setWatchlist(data.watchlist);
        } else {
          console.error("Error fetching watchlist:", response.status);
        }
      } catch (error) {
        console.error("Error fetching watchlist:", error);
      }
    };
    fetchWatchlist();
  }, []);

  const removeFromWatchlist = async (movieId) => {
    try {
      await fetch(`http://127.0.0.1:8000/api/remove_from_watch_later/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("access")}`,
        },
        body: JSON.stringify({ movieId }),
      });

      setWatchlist((prevWatchlist) =>
        prevWatchlist.filter((movie) => movie.id !== movieId)
      );
    } catch (error) {
      console.error("Error removing movie from watchlist:", error);
    }
  };

  return (
    <Container fluid={true} className="containerStyles">
      <Row>
        <Row className="testSection">
          <Col>
            <h2>YOUR WATCHLIST</h2>
          </Col>
        </Row>
        {watchlist.map((movie) => (
          <Col key={movie.id}>
            <Card className="cardStylesList">
              <Card.Img variant="top" src={movie.poster_path} />
              <Card.Body>
                <ButtonGroup>
                  <Button
                    variant="outline-info"
                    onClick={() => handleShowDetails(movie)}
                  >
                    View Details
                  </Button>
                  <Button
                    variant="outline-light"
                    onClick={() => removeFromWatchlist(movie.id)}
                  >
                    Remove from Watchlist
                  </Button>
                </ButtonGroup>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      {selectedMovie && (
        <MovieDetailModal
          movie={selectedMovie}
          handleClose={handleCloseModal}
        />
      )}
    </Container>
  );
};

export default ProfilePage;
