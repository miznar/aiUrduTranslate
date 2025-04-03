import React from 'react';
import CornerNavHeader from './CornerNavHeader';
import './CornerNavigation.css';

const CornerNavigation = () => {
  return (
    <div className="corner-navigation-page">
      <CornerNavHeader /> {/* Header */}

      {/* Unique Circle Buttons */}
      <div className="corner-nav-button-container">
        <div className="corner-nav-button">Learn More</div>
        <div className="corner-nav-button">Start Translating</div>
      </div>
    </div>
  );
};

export default CornerNavigation;
