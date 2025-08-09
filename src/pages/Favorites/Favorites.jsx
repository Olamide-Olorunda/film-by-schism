import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Navigate } from 'react-router-dom';
import FavoritesList from '../../components/Favorites/FavoritesList';
import './Favorites.css';

const Favorites = () => {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/login" state={{ from: '/favorites' }} />;
  }

  return (
    <div className="favorites-page">
      <FavoritesList />
    </div>
  );
};

export default Favorites;