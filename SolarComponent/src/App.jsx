import React from 'react';
import TimeCarousel, { KpDataProvider } from './components/TimeCarousel';
import GeomagneticIndex from './components/GeomagneticIndex';
import SolarWindDashboard from './components/SolarWindDashboard';
import './App.css';

function App() {
  return (
    <>
    <KpDataProvider>
      <div className="app">
        <div className="container">
          <TimeCarousel />
          <GeomagneticIndex />
        </div>
      </div>
    </KpDataProvider>
    <SolarWindDashboard/>
    </>
    
    
  );
}

export default App;