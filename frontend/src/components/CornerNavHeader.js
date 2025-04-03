import React from 'react';
import { Link } from 'react-router-dom';
import './CornerNavHeader.css';

const CornerNavHeader = () => {
  return (
    <header className="corner-nav-header">
      {/* Logo Section */}
      <div className="corner-logo">
        <div className="corner-header-circle"></div>
        <span>اردو فہم</span>
      </div>

      {/* Right Corner Icons */}
      <div className="corner-header-right">
        <div className="corner-icons">
          <div className="corner-icon corner-cancel-icon">
            <Link to="/">
              <i className="fa fa-times"></i> {/* Cancel Icon */}
            </Link>
          </div>
          <div className="corner-icon corner-search-icon">
            <Link to="/search">
              <i className="fa fa-search"></i> {/* Search Icon */}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CornerNavHeader;
