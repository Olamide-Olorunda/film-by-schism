import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './FavoriteButton.css';

const FavoriteButton = ({ movie }) => {
  const { user, addFavorite, removeFavorite } = useContext(AuthContext);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();
  
  const isFavorite = user?.favorites?.some(fav => fav.id === movie.id);

  const handleClick = (e) => {
    e.stopPropagation(); // Prevent triggering parent click events
    
    if (!user) {
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }
    
    setIsAnimating(true);
    
    if (isFavorite) {
      removeFavorite(movie.id);
    } else {
      addFavorite(movie);
    }
    
    setTimeout(() => setIsAnimating(false), 500);
  };

  return (
    <button 
      onClick={handleClick}
      className={`favorite-btn ${isFavorite ? 'active' : ''} ${isAnimating ? 'animate' : ''}`}
      title={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <i className={`fa ${isFavorite ? 'fa-heart' : 'fa-heart-o'}`}></i>
      {isFavorite ? ' Remove' : ' My List'}
    </button>
  );
};

export default FavoriteButton;