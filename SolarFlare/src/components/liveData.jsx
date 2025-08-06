// LiveData.jsx
import React from 'react';


const LiveData = ({ currentKp, status, stations, aRunning }) => {
  return (
    <div className="live-data">
      <h3 className="live-data__title">Live Data</h3>
      
      <div className="live-data__grid">
        <div className="card card--blue">
          <div className="card__label">Current KP</div>
          <div className="card__value card__value--blue">{currentKp}</div>
        </div>
        <div className="card card--green">
          <div className="card__label">Status</div>
          <div className="card__value card__value--green">{status}</div>
        </div>
        <div className="card card--purple">
          <div className="card__label">Stations</div>
          <div className="card__value">{stations}</div>
        </div>
        <div className="card card--pink">
          <div className="card__label">A-Running</div>
          <div className="card__value">{aRunning}</div>
        </div>
      </div>
    </div>
  );
};

export default LiveData;
