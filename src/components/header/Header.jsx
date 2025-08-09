import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from '../../context/AuthContext';
import SearchBar from '../Search/SearchBar';
import './header.css';

export function Header() {
  const [Mobile, setMobile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <header>
      <div className="container flexSB">
        <div className="logo">
          <Link to="/">
            <h1>Film By Schism</h1>
          </Link>
        </div>
        
        <div className={`header__search-container ${showSearch ? 'active' : ''}`}>
          <SearchBar />
        </div>

        <nav className="flexSB">
          <ul className={Mobile ? "navMenu-list" : "flexSB"} onClick={() => setMobile(false)}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/series'>Series</Link></li>
            <li><Link to='/films'>Films</Link></li>
            {user && <li><Link to='/favorites'>My List</Link></li>}
          </ul>
          <button className="toggle" onClick={() => setMobile(!Mobile)}>
            {Mobile ? <i className='fa fa-times'></i> : <i className='fa fa-bars'></i>}
          </button>
        </nav>
        
        <div className="account flexSB">
          <i 
            className="fa fa-search mobile-search" 
            onClick={() => setShowSearch(!showSearch)}
          />
          {user ? (
            <>
              <i className="fa fa-bell"></i>
              <div className="user-menu">
                <i className="fa fa-user"></i>
                <div className="dropdown">
                  <span>{user.email}</span>
                  <button onClick={() => navigate('/favorites')}>
                    My List
                  </button>
                  <button onClick={logout}>
                    Sign Out
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="auth-link">Sign In</Link>
              <button className="subscribe-btn" onClick={() => navigate('/register')}>
                Subscribe Now
              </button>
            </>
          )}
        </div>
      </div>
      
      {showSearch && (
        <div className="mobile-search-container">
          <SearchBar />
        </div>
      )}
    </header>
  );
}

export default Header;