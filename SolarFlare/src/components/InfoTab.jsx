// InfoTab.jsx
import React from 'react';


const InfoTab = () => {
  return (
    <div className="info-tab">
      <h2 className="info-tab__title">KP Index</h2>
      <p className="info-tab__text">
        The Kp index provides a global measure of geomagnetic activity over 3-hour intervals. 
        The Kp index is provided by the NOAA Space Weather Prediction Center (
        <a
          href="https://www.swpc.noaa.gov/"
          className="info-tab__link"
          target="_blank"
          rel="noopener noreferrer"
        >
          NOAA SWPC
        </a>
        ).
      </p>
    </div>
  );
};

export default InfoTab;
