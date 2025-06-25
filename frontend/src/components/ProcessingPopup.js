import React from 'react';
import './ProcessingPopup.css';

const ProcessingPopup = () => {
  return (
    <div className="processing-popup-overlay">
      <div className="processing-popup">
        <h2>Translation is getting ready</h2>
        <p>This may take a few moments. Please wait.</p>
      </div>
    </div>
  );
};

export default ProcessingPopup;
