import React from 'react';
import Row from '../../components/Row/Row';
import requests from '../../services/api';

const SeriesPage = () => {
  return (
    <div className="app">
      <Row 
        title="Netflix Originals" 
        fetchUrl={requests.fetchNetflixOriginals} 
        isLargeRow 
      />
      <Row title="Trending Series" fetchUrl={requests.fetchTrending} />
    </div>
  );
};

export default SeriesPage;