import React from "react";
import { Modal, Button, Row, Col, ButtonGroup } from "react-bootstrap";

const MovieDetailModal = ({ movie, handleClose }) => {
  return (
    <Modal show={movie !== null} onHide={handleClose} centered dialogClassName="modal-lg">
      <Modal.Header closeButton className="bg-dark">
          <Modal.Title className="text-white">{movie.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="bg-dark">
        <Row>
            <Col md={4}>
              <img
                src={movie.poster_path}
                alt={movie.title}
                className="imageStyles"
              />
            </Col>
            <Col md={8}>
              <div className="text-white">
                <p>{movie.overview}</p>
                <p>Year: {movie.year}</p>
                <p>Vote Average: {movie.vote_average}</p>
                <p>Genres: {movie.genres.join(", ")}</p>
                <p>Keywords: {movie.keywords.join(", ")}</p>

                <ButtonGroup>
                  <Button variant="outline-info" href={movie.trailer_link} target="_blank">
                    Trailer
                  </Button>
                </ButtonGroup>
              </div>
            </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
};

export default MovieDetailModal;
