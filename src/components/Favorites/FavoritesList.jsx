import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './FavoritesList.css';

const FavoritesList = () => {
  const { user, removeFavorite } = useContext(AuthContext);

  return (
    <div className="favorites-container">
      <h2 className="favorites-title">My Favorites</h2>
      
      {user?.favorites?.length > 0 ? (
        <div className="favorites-grid">
          {user.favorites.map((item) => (
            <div key={item.id} className="favorite-item">
              <img
                src={`https://image.tmdb.org/t/p/w300${item.poster_path}`}
                alt={item.title || item.name}
                className="favorite-poster"
              />
              <div className="favorite-info">
                <h3>{item.title || item.name}</h3>
                <p>{item.overview?.substring(0, 150)}...</p>
                <div className="favorite-actions">
                  <span className="favorite-rating">
                    Rating: {item.vote_average}/10
                  </span>
                  <button 
                    onClick={() => removeFavorite(item.id)}
                    className="remove-favorite"
                  >
                    <i className="fa fa-trash"></i> Remove
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-favorites">
          <i className="fas fa-heart-broken"></i>
          <p>Your favorites list is empty</p>
          <p>Add movies or shows by clicking the heart icon</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesList;