import React, { useState, useEffect, createContext, useContext } from 'react';

// Create context for solar wind data
export const SolarWindContext = createContext();

// Custom hook to use the solar wind data context
export const useSolarWindData = () => {
  const context = useContext(SolarWindContext);
  if (!context) {
    throw new Error('useSolarWindData must be used within a SolarWindProvider');
  }
  return context;
};

// Provider component that manages all solar wind data
export const SolarWindProvider = ({ children }) => {
  const [plasmaData, setPlasmaData] = useState([]);
  const [magData, setMagData] = useState([]);
  const [currentDashboard, setCurrentDashboard] = useState('speed');
  const [currentPeriod, setCurrentPeriod] = useState('24h');
  const [isLoading, setIsLoading] = useState(false);

  const fetchPlasmaData = async () => {
    try {
      const response = await fetch('https://services.swpc.noaa.gov/products/solar-wind/plasma-7-day.json');
      const rawData = await response.json();
      const processedData = rawData.slice(1).map(row => ({
        time: new Date(row[0]),
        density: parseFloat(row[1]) || 0,
        speed: parseFloat(row[2]) || 0,
        temperature: parseFloat(row[3]) || 0
      }));
      setPlasmaData(processedData);
    } catch (error) {
      console.error('Error fetching plasma data:', error);
    }
  };

  const fetchMagData = async () => {
    try {
      const response = await fetch('https://services.swpc.noaa.gov/products/solar-wind/mag-7-day.json');
      const rawData = await response.json();
      const processedData = rawData.slice(1).map(row => ({
        time: new Date(row[0]),
        bz: parseFloat(row[3]) || 0
      }));
      setMagData(processedData);
    } catch (error) {
      console.error('Error fetching magnetic data:', error);
    }
  };

  const refreshData = async () => {
    setIsLoading(true);
    await Promise.all([fetchPlasmaData(), fetchMagData()]);
    setIsLoading(false);
  };

  // FIXED: Filter data based on latest data point, not current time
  const filterDataByPeriod = (data, period) => {
    if (!data || data.length === 0) return [];
    
    // Sort data by time to ensure we get the actual latest entry
    const sortedData = [...data].sort((a, b) => b.time.getTime() - a.time.getTime());
    
    // Get the latest timestamp from the data, not current time
    const latestDataTime = sortedData[0].time.getTime();
    let ms;
    
    switch (period) {
      case '6h': ms = 6 * 3600 * 1000; break;
      case '12h': ms = 12 * 3600 * 1000; break;
      case '24h': ms = 24 * 3600 * 1000; break;
      case '3d': ms = 3 * 24 * 3600 * 1000; break;
      case '7d': ms = 7 * 24 * 3600 * 1000; break;
      default: 
        return sortedData.sort((a, b) => a.time.getTime() - b.time.getTime()); // Return all data, sorted chronologically
    }
    
    // Filter based on latest data point time, then sort chronologically for display
    return sortedData
      .filter(d => latestDataTime - d.time.getTime() <= ms)
      .sort((a, b) => a.time.getTime() - b.time.getTime());
  };

  // Initial data fetch
  useEffect(() => {
    refreshData();
  }, []);

  const value = {
    plasmaData,
    magData,
    currentDashboard,
    currentPeriod,
    isLoading,
    setCurrentDashboard,
    setCurrentPeriod,
    refreshData,
    // Provide both raw and filtered data
    getRawPlasmaData: () => plasmaData,
    getRawMagData: () => magData,
    getFilteredPlasmaData: () => filterDataByPeriod(plasmaData, currentPeriod),
    getFilteredMagData: () => filterDataByPeriod(magData, currentPeriod)
  };

  return (
    <SolarWindContext.Provider value={value}>
      {children}
    </SolarWindContext.Provider>
  );
};