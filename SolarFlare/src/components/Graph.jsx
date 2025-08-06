import React, { useState, useRef } from 'react';

const Graph = ({ data, isLoading, currentPeriod }) => {
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });
  const chartRef = useRef(null);

  // Determine Kp level based on ranges
  const getKpLevel = (kp) => {
    if (kp <= 4) return 'g0';       // G0: 0-4
    if (kp === 5) return 'g1';      // G1: 5
    if (kp === 6) return 'g2';      // G2: 6
    if (kp === 7) return 'g3';      // G3: 7
    if (kp === 8) return 'g4';      // G4: 8
    return 'g5';                    // G5: 9+
  };

  // Color mapping for each level
  const levelColors = {
    g0: '#8BE69D', // G0 (Kp 0-4): Quiet Conditions
    g1: '#B6ED66', // G1 (Kp 5): Minor Geomagnetic Storm
    g2: '#F1C75B', // G2 (Kp 6): Moderate Storm
    g3: '#F49B4F', // G3 (Kp 7): Strong Storm
    g4: '#F35C65', // G4 (Kp 8): Severe Storm
    g5: '#C85FF5'  // G5 (Kp 9): Extreme Storm
  };

  // Prepare the chart data from parsed objects
  const chartData = data.map((d) => {
    const dateObj = new Date(d.time);
    return {
      rawTs: d.time,
      date: dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      time: dateObj.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true }),
      kp: parseFloat(d.kp),
      aRunning: parseInt(d.aRunning, 10),
      stations: parseInt(d.stations, 10),
      level: getKpLevel(parseFloat(d.kp))
    };
  });

  const maxKp = 9;
  const currentKp = chartData.length
    ? chartData[chartData.length - 1].kp.toFixed(2)
    : '0.00';

  const handleBarHover = (e, dataPoint) => {
    const rect = chartRef.current.getBoundingClientRect();
    setTooltip({
      show: true,
      x: e.clientX - rect.left + 10,
      y: e.clientY - rect.top - 10,
      data: dataPoint
    });
  };
  const handleBarLeave = () => setTooltip({ show: false, x: 0, y: 0, data: null });

  const yLabels = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className="y-label" style={{ bottom: `${(i / 9) * 100}%` }}>{i}</div>
  ));
  const gridLines = Array.from({ length: 10 }, (_, i) => (
    <div key={i} className={`grid-line ${i % 3 === 0 ? 'major' : ''}`} style={{ bottom: `${(i / 9) * 100}%` }} />
  ));

  const interval = Math.max(1, Math.floor(chartData.length / 8));
  const xLabels = chartData
    .filter((_, idx) => idx % interval === 0)
    .map((d, idx) => (
      <div key={idx} className="x-label">
        <span className="x-label-date">{d.date}</span>
        <span className="x-label-time">{d.time}</span>
      </div>
    ));

  return (
    <div className="graph-container">
      <div className="graph-header">
        <h3 className="graph-title">
          KP INDEX CHART <span className="period-indicator">({currentPeriod})</span>
        </h3>
        {!isLoading && (
          <div className="current-kp">Current Kp: <strong>{currentKp}</strong></div>
        )}
      </div>

      {isLoading ? (
        <div className="loading-container">
          <div className="spinner" />
          <p className="loading-text">Loading KP data…</p>
        </div>
      ) : !chartData.length ? (
        <div className="no-data-container">
          <p className="no-data-text">No data available</p>
        </div>
      ) : (
        <div className="chart-container" ref={chartRef}>
          <div className="chart-area">
            <div className="y-axis">{yLabels}</div>
            <div className="chart-grid">{gridLines}</div>
            <div className="bars-container">
              {chartData.map((d, i) => {
                const pct = (d.kp / maxKp) * 100;
                return (
                  <div
                    key={i}
                    className="bar"
                    style={{ height: `${pct}%`, backgroundColor: levelColors[d.level] }}
                    onMouseEnter={(e) => handleBarHover(e, d)}
                    onMouseLeave={handleBarLeave}
                  />
                );
              })}
            </div>
            <div className="x-axis">{xLabels}</div>
            {tooltip.show && tooltip.data && (
              <div className="tooltip-custom show" style={{ left: tooltip.x, top: tooltip.y }}>
                <div className="tooltip-time">{tooltip.data.date}, {tooltip.data.time}</div>
                <div className="tooltip-kp">Kp: {tooltip.data.kp.toFixed(2)}</div>
                <div className="tooltip-details">
                  A-Running: {tooltip.data.aRunning}<br />Stations: {tooltip.data.stations}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Graph;