import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";

const ProfilePage = () => {
  const [watchlist, setWatchlist] = useState([]);

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

  if (watchlist === undefined || watchlist.length === 0) {
    return <div>No movies in watchlist</div>;
  }

  return (
    <Container>
      <h1>Profile</h1>
      <Row>
        {watchlist.map((movie) => (
          <Col key={movie.id} sm={6} md={4} lg={3} xl={2}>
            <Card className="mb-3">
              <Card.Img variant="top" src={movie.poster_path} />
              <Card.Body>
                <Card.Title>{movie.title}</Card.Title>
                <Button variant="primary" href={`/movies/${movie.id}`} className="mr-2">
                  View Details
                </Button>
                <Button variant="danger" onClick={() => removeFromWatchlist(movie.id)}>
                  Remove from Watchlist
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProfilePage;
