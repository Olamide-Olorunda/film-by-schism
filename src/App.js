import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import Header from './components/header/Header';
import HomePage from './pages/Home/HomePage';
import FilmsPage from './pages/Films/FilmsPage';
import SeriesPage from './pages/Series/SeriesPage';
import Login from './pages/Auth/Login';
import Favorites from './pages/Favorites/Favorites'; // Updated import path
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/films" element={<FilmsPage />} />
          <Route path="/series" element={<SeriesPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;