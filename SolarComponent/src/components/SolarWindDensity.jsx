import React, { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';
import { useSolarWindData } from './SolarWindProvider';
import './SolarWindChart.css';

Chart.register(...registerables);

const SolarWindDensity = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { getFilteredPlasmaData, currentPeriod, isLoading } = useSolarWindData();

  // Helper function to filter data based on time period from the latest data point
  const filterDataByPeriod = (data, period) => {
    if (!data || data.length === 0) return [];
    
    // Sort data by time to ensure we get the actual latest entry
    const sortedData = [...data].sort((a, b) => new Date(b.time) - new Date(a.time));
    
    // Get the latest timestamp from the data, not current time
    const latestDataTime = new Date(sortedData[0].time);
    let cutoffTime;
    
    switch (period) {
      case '6h':
        cutoffTime = new Date(latestDataTime.getTime() - 6 * 60 * 60 * 1000);
        break;
      case '12h':
        cutoffTime = new Date(latestDataTime.getTime() - 12 * 60 * 60 * 1000);
        break;
      case '24h':
        cutoffTime = new Date(latestDataTime.getTime() - 24 * 60 * 60 * 1000);
        break;
      case '3d':
        cutoffTime = new Date(latestDataTime.getTime() - 3 * 24 * 60 * 60 * 1000);
        break;
      case '7d':
        cutoffTime = new Date(latestDataTime.getTime() - 7 * 24 * 60 * 60 * 1000);
        break;
      case 'all':
      default:
        return sortedData.sort((a, b) => new Date(a.time) - new Date(b.time));
    }
    
    // Filter and return data within the time range, sorted chronologically for display
    return sortedData
      .filter(point => new Date(point.time) >= cutoffTime)
      .sort((a, b) => new Date(a.time) - new Date(b.time));
  };

  // Get appropriate time format based on period
  const getTimeFormat = (date, period) => {
    if (['6h', '12h', '24h'].includes(period)) {
      return date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit', 
        hour12: false 
      });
    } else if (['3d', '7d'].includes(period)) {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
      });
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric'
      });
    }
  };

  useEffect(() => {
    const allAvailableData = getFilteredPlasmaData();
    const data = filterDataByPeriod(allAvailableData, currentPeriod);
    
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    if (!data.length) return;

    const ctx = chartRef.current.getContext('2d');
    
    const labels = data.map(point => getTimeFormat(new Date(point.time), currentPeriod));
    const densities = data.map(point => point.density);
    const currentDensity = densities[densities.length - 1] || 0;
    const avgDensity = densities.reduce((a, b) => a + b, 0) / densities.length;
    const minDensity = Math.min(...densities);
    const maxDensity = Math.max(...densities);

    // Create gradient for density
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(74, 144, 226, 0.8)');
    gradient.addColorStop(0.5, 'rgba(74, 144, 226, 0.4)');
    gradient.addColorStop(1, 'rgba(74, 144, 226, 0.1)');

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Solar Wind Density',
          data: densities,
          borderColor: '#4A90E2',
          backgroundColor: gradient,
          fill: true,
          tension: 0.4,
          pointRadius: 0,
          pointHoverRadius: 8,
          pointHoverBorderWidth: 3,
          pointHoverBorderColor: '#2563EB',
          pointHoverBackgroundColor: '#4A90E2',
          borderWidth: 3,
          pointBorderWidth: 0,
          pointBackgroundColor: 'transparent'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuart'
        },
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            enabled: true,
            backgroundColor: 'rgba(17, 24, 39, 0.95)',
            titleColor: '#F3F4F6',
            bodyColor: '#F3F4F6',
            borderColor: '#4A90E2',
            borderWidth: 2,
            cornerRadius: 8,
            padding: 12,
            displayColors: false,
            titleFont: {
              size: 14,
              weight: 'bold'
            },
            bodyFont: {
              size: 13
            },
            callbacks: {
              title: function(context) {
                return `Time: ${context[0].label}`;
              },
              label: function(context) {
                return `Density: ${context.parsed.y.toFixed(2)} p/cm³`;
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#9CA3AF',
              maxTicksLimit: 8,
              font: {
                size: 11
              }
            },
            border: {
              display: false
            }
          },
          y: {
            grid: {
              color: 'rgba(75, 85, 99, 0.3)',
              drawBorder: false,
              lineWidth: 1
            },
            ticks: {
              color: '#9CA3AF',
              font: {
                size: 11
              },
              callback: function(value) {
                return value.toFixed(1) + ' p/cm³';
              }
            },
            border: {
              display: false
            }
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        },
        elements: {
          line: {
            borderJoinStyle: 'round',
            borderCapStyle: 'round'
          }
        },
        onHover: (event, elements) => {
          event.native.target.style.cursor = elements.length > 0 ? 'crosshair' : 'default';
        }
      }
    });

    // Update stats with better formatting and actual time range
    const statsElement = document.querySelector('.density-stats');
    if (statsElement) {
      const formatDensity = (density) => density.toFixed(2);
      const getDensityColor = (density) => {
        if (density < 5) return '#10B981'; // green - low
        if (density < 15) return '#F59E0B'; // amber - moderate
        if (density < 25) return '#EF4444'; // red - high
        return '#DC2626'; // dark red - very high
      };

      // Get actual time range from the filtered data
      const latestTime = data.length > 0 ? new Date(data[data.length - 1].time) : null;
      const earliestTime = data.length > 0 ? new Date(data[0].time) : null;
      
      const formatDateTime = (date) => {
        return date.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false
        });
      };

      statsElement.innerHTML = `
        <div class="stat-item">
          <span class="stat-label">Current:</span>
          <span class="stat-value" style="color: ${getDensityColor(currentDensity)}">${formatDensity(currentDensity)} p/cm³</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Average:</span>
          <span class="stat-value">${formatDensity(avgDensity)} p/cm³</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Range:</span>
          <span class="stat-value">${formatDensity(minDensity)} - ${formatDensity(maxDensity)} p/cm³</span>
        </div>
        <div class="stat-item">
          <span class="stat-label">Data Points:</span>
          <span class="stat-value">${data.length}</span>
        </div>
        ${earliestTime && latestTime ? `
        <div class="stat-item time-range">
          <span class="stat-label">Time Range:</span>
          <span class="stat-value time-range-value">
            <div>${formatDateTime(earliestTime)}</div>
            <div class="to-separator">to</div>
            <div>${formatDateTime(latestTime)}</div>
          </span>
        </div>
        ` : ''}
      `;
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [getFilteredPlasmaData, currentPeriod]);

  const allAvailableData = getFilteredPlasmaData();
  const data = filterDataByPeriod(allAvailableData, currentPeriod);

  // Get period description
  const getPeriodDescription = () => {
    switch (currentPeriod) {
      case '6h': return 'Last 6 Hours';
      case '12h': return 'Last 12 Hours';
      case '24h': return 'Last 24 Hours';
      case '3d': return 'Last 3 Days';
      case '7d': return 'Last 7 Days';
      case 'all': return 'All Available Data';
      default: return currentPeriod.toUpperCase();
    }
  };

  return (
    <div className="solar-wind-chart">
      <div className="chart-header">
        <h2 className="chart-title">
          <span className="chart-icon">⚪</span>
          Solar Wind Density
          <span className="period-indicator">({getPeriodDescription()})</span>
        </h2>
        <div className="chart-loading">
          {isLoading && <div className="loading-spinner"></div>}
        </div>
      </div>
      
      <div className="chart-container">
        {data.length > 0 ? (
          <>
            <canvas ref={chartRef}></canvas>
            <div className="chart-stats density-stats"></div>
          </>
        ) : (
          <div className="no-data">
            <div className="no-data-icon">📊</div>
            <div className="no-data-text">
              No data available for {getPeriodDescription().toLowerCase()}
            </div>
            <div className="no-data-subtext">
              Try selecting a different time period or refreshing the data
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SolarWindDensity;