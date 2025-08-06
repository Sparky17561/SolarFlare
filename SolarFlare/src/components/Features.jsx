import React from 'react';


const Features = ({ stats }) => {
  const { maxKp, avgKp, stormHours, condition } = stats;

  const levels = [
    { label: 'G0 (Kp 0-4): Quiet Conditions', color: '#8BE69D' },
    { label: 'G1 (Kp 5): Minor Geomagnetic Storm', color: '#B6ED66' },
    { label: 'G2 (Kp 6): Moderate Storm', color: '#F1C75B' },
    { label: 'G3 (Kp 7): Strong Storm', color: '#F49B4F' },
    { label: 'G4 (Kp 8): Severe Storm', color: '#F35C65' },
    { label: 'G5 (Kp 9): Extreme Storm', color: '#C85FF5' },
  ];

  return (
    <div className="features-grid">
      <div className="levels-row">
        {levels.map((level, idx) => (
          <div key={idx} className="level-box" style={{ backgroundColor: level.color }}>
            {level.label}
          </div>
        ))}
      </div>

      <div className="stats-row">
        <div className="stat-card">
          <div className="stat-value">{maxKp}</div>
          <div className="stat-label">MAXIMUM KP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{avgKp}</div>
          <div className="stat-label">AVERAGE KP</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{stormHours}</div>
          <div className="stat-label">STORM HOURS</div>
        </div>
        <div className="stat-card">
          <div className="stat-value active">{condition}</div>
          <div className="stat-label">CURRENT STATUS</div>
        </div>
      </div>
    </div>
  );
};

export default Features;
