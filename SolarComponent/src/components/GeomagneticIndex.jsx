import React, { useState } from 'react';
import { useKpData } from './TimeCarousel';
import './GeomagneticIndex.css';

const GeomagneticIndex = () => {
  const { kpData: data, currentPeriod } = useKpData();
  const [tooltip, setTooltip] = useState({ show: false, x: 0, y: 0, data: null });

  const getKpClass = (kp) => {
    const value = parseFloat(kp);
    if (value < 5) return 'g0';
    if (value < 6) return 'g1';
    if (value < 7) return 'g2';
    if (value < 8) return 'g3';
    if (value < 9) return 'g4';
    return 'g5';
  };

  const formatTime = (timeStr, period) => {
    const date = new Date(timeStr);
    
    if (period === '6h' || period === '12h' || period === '24h') {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
      });
    } else if (period === '3d') {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  const handleBarHover = (e, dataPoint, index) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltip({
      show: true,
      x: e.pageX + 15,
      y: e.pageY - 80,
      data: {
        time: formatTime(dataPoint[0], '24h') + ' - ' + formatTime(dataPoint[0], '7d'),
        kp: dataPoint[1],
        aRunning: dataPoint[2],
        stations: dataPoint[3]
      }
    });
  };

  const handleBarLeave = () => {
    setTooltip({ show: false, x: 0, y: 0, data: null });
  };

  const handleMouseMove = (e) => {
    if (tooltip.show) {
      setTooltip(prev => ({
        ...prev,
        x: e.pageX + 15,
        y: e.pageY - 80
      }));
    }
  };

  const currentKp = data.length > 0 ? data[data.length - 1][1] : '0.0';
  const labelFrequency = Math.max(1, Math.floor(data.length / 8));

  return (
    <div className="geomagnetic-index" onMouseMove={handleMouseMove}>
      <div className="chart-header">
        <h2 className="chart-title">Geomagnetic Activity</h2>
        <div className="current-kp">
          <span>Current Kp:</span>
          <span className="kp-value">{currentKp}</span>
        </div>
      </div>

      <div className="chart-area">
        <div className="y-axis">
          {[...Array(10)].map((_, i) => (
            <div key={i} className="y-label">{i}</div>
          ))}
        </div>
        
        <div className="chart-grid">
          {[...Array(10)].map((_, i) => (
            <div 
              key={i} 
              className={`grid-line ${i % 3 === 0 ? 'major' : ''}`}
              style={{ bottom: `${(i / 9) * 100}%` }}
            />
          ))}
        </div>

        <div className="bars-container">
          {data.map((dataPoint, index) => {
            const kpValue = parseFloat(dataPoint[1]);
            return (
              <div
                key={index}
                className={`bar ${getKpClass(dataPoint[1])}`}
                style={{ height: `${Math.max(2, (kpValue / 9) * 100)}%` }}
                onMouseEnter={(e) => handleBarHover(e, dataPoint, index)}
                onMouseLeave={handleBarLeave}
              />
            );
          })}
        </div>

        <div className="x-axis">
          {data.map((dataPoint, index) => {
            if (index % labelFrequency === 0) {
              return (
                <div key={index} className="x-label">
                  {formatTime(dataPoint[0], currentPeriod)}
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>

      {tooltip.show && tooltip.data && (
        <div 
          className="tooltip show"
          style={{ left: `${tooltip.x}px`, top: `${tooltip.y}px` }}
        >
          <div className="tooltip-time">{tooltip.data.time}</div>
          <div className="tooltip-kp">Kp Index: {tooltip.data.kp}</div>
          <div>A-Running: <span>{tooltip.data.aRunning}</span></div>
          <div>Stations: <span>{tooltip.data.stations}</span></div>
        </div>
      )}
    </div>
  );
};

export default GeomagneticIndex;