// Carousel.jsx
import React from 'react';


const Carousel = ({ currentPeriod, setCurrentPeriod, onRefresh, isLoading }) => {
  const timeOptions = ['6h', '12h', '24h', '3d', '7d', 'All'];

  return (
    <div className="carousel-container">
      <div className="period-buttons">
        {timeOptions.map((period) => (
          <button
            key={period}
            className={`period-button ${
              currentPeriod === period ? 'period-button--active' : ''
            }`}
            onClick={() => setCurrentPeriod(period)}
          >
            {period}
          </button>
        ))}
      </div>
      
      <button
        className="refresh-button"
        onClick={onRefresh}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className="spinner" aria-hidden="true"></span>
            <span>Refreshing...</span>
          </>
        ) : (
          '🔄 Refresh Data'
        )}
      </button>
      
      <div className="info-text">
        <div className="info-text__item">
          Selected Period: <span className="info-text__highlight">{currentPeriod}</span>
        </div>
        <div className="info-text__item">
          Last Updated: {new Date().toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default Carousel;
