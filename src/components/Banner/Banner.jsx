import React, { useState, useEffect } from 'react';
import axios from 'axios';
import requests from '../../services/api';
import './Banner.css';

const Banner = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        const request = await axios.get(requests.fetchNetflixOriginals, {
          signal: controller.signal
        });
        const results = request.data.results.filter(m => m.backdrop_path);
        setMovie(results[Math.floor(Math.random() * results.length)]);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError(err);
          console.error("Banner error:", err);
        }
      }
    }
    
    fetchData();
    return () => controller.abort();
  }, []);

  if (error || !movie) return null;

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <header className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie.title || movie.name || movie.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <p className="banner__description">
          {truncate(movie.overview, 150)}
        </p>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;