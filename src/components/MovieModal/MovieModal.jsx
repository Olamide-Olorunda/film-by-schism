import React from 'react';
import './MovieModal.css';
import FavoriteButton from '../Favorites/FavoriteButton';

// Genre mapping function
const getGenreName = (genreId) => {
  const genreMap = {
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
  return genreMap[genreId] || 'Genre';
};

const MovieModal = ({ movie, onClose }) => {
  return (
    <div className="modal__overlay" onClick={onClose}>
      <div className="modal__content" onClick={e => e.stopPropagation()}>
        <button className="modal__close" onClick={onClose}>×</button>
        
        <div className="modal__poster">
          <img 
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path || movie.poster_path}`} 
            alt={movie.title || movie.name || movie.original_name}
          />
        </div>
        
        <div className="modal__details">
          <h2>{movie.title || movie.name || movie.original_name}</h2>
          
          <div className="modal__metadata">
            <span className="rating">{Math.round(movie.vote_average * 10) / 10} ★</span>
            <span>{movie.release_date || movie.first_air_date}</span>
            <span>{movie.runtime || movie.episode_run_time?.[0]} min</span>
          </div>
          
          <div className="modal__genres">
            {movie.genre_ids?.slice(0, 5).map(genreId => (
              <span key={genreId} className="genre__pill">
                {getGenreName(genreId)}
              </span>
            ))}
          </div>
          
          <p className="modal__overview">{movie.overview}</p>
          
          <div className="modal__buttons">
            <button className="modal__button play__button">▶ Play</button>
            <FavoriteButton movie={movie} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;