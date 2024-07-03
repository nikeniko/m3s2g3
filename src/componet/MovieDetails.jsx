import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Spinner, Alert, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const MovieDetails = () => {
  const { imdbID } = useParams();
  const [movie, setMovie] = useState(null);
  const [comments, setComments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchMovieDetails(imdbID);
    fetchComments(imdbID);
  }, [imdbID]);

  const fetchMovieDetails = async (imdbID) => {
    try {
      const response = await fetch(
        `http://www.omdbapi.com/?apikey=56f22a68&i=${imdbID}`
      );
      const data = await response.json();
      if (data.Response === "True") {
        setMovie(data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    }
  };

  const fetchComments = async (imdbID) => {
    setIsLoading(true);
    setIsError(false);

    try {
      const response = await fetch(
        `https://striveschool-api.herokuapp.com/api/comments/${imdbID}`,
        {
          headers: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjdkNWM2ZjNhMzhjYjAwMTVmNjNjZjkiLCJpYXQiOjE3MTk0OTM0NzksImV4cCI6MTcyMDcwMzA3OX0.jwbExyPvwD6_oF-ey5jx_c7SW-7ohDWAVwm_wmsbpZQ",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setComments(data);
      } else {
        setIsError(true);
      }
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container className="movie-details-container mt-5">
      {isLoading && <Spinner animation="border" variant="light" />}
      {isError && <Alert variant="danger">Error fetching data</Alert>}
      {movie && (
        <Row className="mb-4">
          <Col md={4} className="text-center">
            <img
              src={movie.Poster}
              alt={movie.Title}
              className="img-fluid rounded"
            />
          </Col>
          <Col md={8}>
            <h2 className="text-white">{movie.Title}</h2>
            <p className="text-white">{movie.Plot}</p>
            <p className="text-white">
              <strong>Genre:</strong> {movie.Genre}
            </p>
            <p className="text-white">
              <strong>Director:</strong> {movie.Director}
            </p>
            <p className="text-white">
              <strong>Actors:</strong> {movie.Actors}
            </p>
          </Col>
        </Row>
      )}
      <h3 className="text-white">Comments</h3>
      {comments.length > 0 ? (
        comments.map((comment, index) => (
          <Card key={index} className="mb-3">
            <Card.Body>
              <Card.Text>"{comment.comment}"</Card.Text>
            </Card.Body>
          </Card>
        ))
      ) : (
        <p className="text-white">No comments available.</p>
      )}
    </Container>
  );
};

export default MovieDetails;
