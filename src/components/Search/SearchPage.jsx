import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios'; // Import axios
import Row from '../../components/Row/Row';
import './SearchPage.css';

const SearchPage = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true); // Start with loading true
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('q');

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/multi?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
        );
        console.log("API Response Data:", response.data); // Add this line
        setSearchResults(response.data.results);
        console.log("Processed Results:", response.data.results); // Add this line
      } catch (err) {
        console.error('Search error:', err);
      } finally {
        setLoading(false);
      }
    };

    if (query) {
      console.log("Searching for:", query); // Add this line
      fetchSearchResults();
    } else {
      setLoading(false);
    }
  }, [query]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="search-page">
      <h2>Search Results for "{query}"</h2>
      {searchResults?.length > 0 ? (
        <div className="search-results">
          <Row 
            title=""
            movies={searchResults}
            isLargeRow={false}
            hideTitle
          />
        </div>
      ) : (
        <div className="no-results">
          {query ? `No results found for "${query}"` : 'Please enter a search term'}
        </div>
      )}
    </div>
  );
};

export default SearchPage;