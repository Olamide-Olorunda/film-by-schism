import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Load user from localStorage on initial render
  useEffect(() => {
    const storedUser = localStorage.getItem('netflixUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      // Mock authentication - replace with real API call
      if (email && password) {
        const userData = { 
          email, 
          favorites: [] 
        };
        setUser(userData);
        localStorage.setItem('netflixUser', JSON.stringify(userData));
        resolve();
      } else {
        reject(new Error('Invalid credentials'));
      }
    });
  };

  const register = (email, password) => {
    return new Promise((resolve, reject) => {
      // Mock registration - replace with real API call
      if (email && password) {
        const userData = { 
          email, 
          favorites: [] 
        };
        setUser(userData);
        localStorage.setItem('netflixUser', JSON.stringify(userData));
        resolve();
      } else {
        reject(new Error('Registration failed'));
      }
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('netflixUser');
  };

  const addFavorite = (movie) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: [...(user.favorites || []), movie]
    };
    
    setUser(updatedUser);
    localStorage.setItem('netflixUser', JSON.stringify(updatedUser));
  };

  const removeFavorite = (movieId) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      favorites: user.favorites.filter(fav => fav.id !== movieId)
    };
    
    setUser(updatedUser);
    localStorage.setItem('netflixUser', JSON.stringify(updatedUser));
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      register, 
      logout, 
      addFavorite, 
      removeFavorite 
    }}>
      {children}
    </AuthContext.Provider>
  );
};