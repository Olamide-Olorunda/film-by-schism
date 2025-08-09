import React from 'react';
import Row from '../../components/Row/Row';
import requests from '../../services/api';

const FilmsPage = () => {
  return (
    <div className="app">
      <Row title="Top Rated Films" fetchUrl={requests.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={requests.fetchComedyMovies} />
    </div>
  );
};

export default FilmsPage;