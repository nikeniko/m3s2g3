import React, { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import PropTypes from "prop-types";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 5,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 767, min: 464 },
    items: 2,
    slidesToSlide: 1,
  },
};

const MovieSection = ({ movieTitle }) => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const response = await fetch(
          `http://www.omdbapi.com/?apikey=56f22a68&s=${encodeURIComponent(
            movieTitle
          )}`
        );
        const data = await response.json();

        if (data.Response === "True") {
          const shuffledMovies = shuffleArray(data.Search);
          const first8Movies = shuffledMovies.slice(0, 8);
          setMovies(first8Movies);
        } else {
          setIsError(true);
        }
      } catch (error) {
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [movieTitle]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  return (
    <div className="container-fluid px-4 bg_Netflix">
      <h4 className="text-white">{movieTitle}</h4>
      {isLoading && <p className="text-white">Loading movies...</p>}
      {isError && <p className="text-white">Error fetching movies</p>}
      {!isLoading && !isError && (
        <Carousel
          responsive={responsive}
          autoPlay={true}
          swipeable={true}
          draggable={true}
          showDots={false}
          infinite={true}
          partialVisible={false}
          dotListClass="custom-dot-list-style"
        >
          {movies.map((movie) => (
            <div key={movie.imdbID} className="col mb-2 text-center px-1">
              <a href={`/MovieDetails/${movie.imdbID}`}>
                <img
                  className="img-fluid"
                  src={movie.Poster}
                  alt={movie.Title}
                />
              </a>
            </div>
          ))}
        </Carousel>
      )}
    </div>
  );
};

MovieSection.propTypes = {
  movieTitle: PropTypes.string.isRequired,
};

export default MovieSection;
