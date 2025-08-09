import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Row.css';
import MovieModal from '../MovieModal/MovieModal';
import FavoriteButton from '../Favorites/FavoriteButton';

const base_url = "https://image.tmdb.org/t/p/original/";

const Row = ({ title, fetchUrl, isLargeRow, filter, hideTitle, movies: propMovies, query }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [error, setError] = useState(null);
  const [hoveredMovie, setHoveredMovie] = useState(null);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch movies or use propMovies
  useEffect(() => {
    console.log("Received movies prop:", propMovies); // Debug log added here
    if (propMovies) {
      setMovies(propMovies);
      setFilteredMovies(propMovies);
      return;
    }

    const controller = new AbortController();
    
    async function fetchData() {
      try {
        const request = await axios.get(fetchUrl, {
          signal: controller.signal
        });
        setMovies(request.data.results);
        setFilteredMovies(request.data.results);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          console.error("Error fetching data:", err);
        }
      }
    }
    
    if (fetchUrl) {
      fetchData();
    }
    
    return () => controller.abort();
  }, [fetchUrl, propMovies]);

  // Search functionality
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
        );
        setSearchResults(response.data.results);
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      fetchSearchResults();
    }
  }, [query]);

  // Filter movies when filter changes or when we have search results
  useEffect(() => {
    if (query) {
      // When there's a search query, use search results
      setFilteredMovies(searchResults);
    } else if (filter) {
      // When there's a filter but no search query
      setFilteredMovies(
        movies.filter(movie => 
          (movie.title || movie.name || movie.original_name)
            .toLowerCase()
            .includes(filter.toLowerCase())
        )
      );
    } else {
      // No search or filter - show all movies
      setFilteredMovies(movies);
    }
  }, [filter, movies, query, searchResults]);

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  if (error) return null;

  return (
    <div className="row">
      {!hideTitle && <h2>{title}</h2>}
      <div className="row__posters">
        {loading ? (
          <div className="loading">Loading...</div>
        ) : filteredMovies && filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            movie && (movie.poster_path || movie.backdrop_path) && (
              <div 
                key={movie.id}
                className="movie__card"
                onMouseEnter={() => setHoveredMovie(movie.id)}
                onMouseLeave={() => setHoveredMovie(null)}
                onClick={() => handleMovieClick(movie)}
              >
                <img
                  className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                  src={`${base_url}${
                    isLargeRow ? movie.poster_path : movie.backdrop_path
                  }`}
                  alt={movie.title || movie.name || movie.original_name}
                  loading="lazy"
                />
                {hoveredMovie === movie.id && (
                  <div className="movie__card__details">
                    <h3>{movie.title || movie.name || movie.original_name}</h3>
                    <div className="movie__card__info">
                      <span>{movie.release_date?.substring(0, 4) || movie.first_air_date?.substring(0, 4)}</span>
                      <span className="movie__rating">
                        {Math.round(movie.vote_average * 10) / 10} ★
                      </span>
                    </div>
                    <div className="movie__genres">
                      {movie.genre_ids?.slice(0, 3).map(genreId => (
                        <span key={genreId} className="genre__pill">
                          {getGenreName(genreId)}
                        </span>
                      ))}
                    </div>
                    <FavoriteButton movie={movie} />
                  </div>
                )}
              </div>
            )
          ))
        ) : (
          <div className="no-movies">No movies to display</div>
        )}
      </div>

      {showModal && selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

// Helper function to get genre names
const getGenreName = (genreId) => {
  const genres = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };
  return genres[genreId] || '';
};

export default Row;