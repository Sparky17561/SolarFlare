import React from 'react';
import TimeCarousel, { KpDataProvider } from './components/TimeCarousel';
import GeomagneticIndex from './components/GeomagneticIndex';
import SolarWindDashboard from './components/SolarWindDashboard';
import './App.css';
import ElectronFlux from './components/ElectronFlux';
import ProtonFlux from './components/ProtonFlux';
import XrayFlux from './components/XrayFlux';

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
    <ElectronFlux />
    <ProtonFlux />
    <XrayFlux />
    </>
    
    
  );
}

export default App;