import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import InfoTab from './components/Infotab';
import TimeSelector from './components/Carousel';
import Chart from './components/Graph';
import Features from './components/Features';
import AdditionalInfo from './components/AdditionalInfo';
import './App.css';

const App = () => {
  const [currentPeriod, setCurrentPeriod] = useState('All');
  const [isLoading, setIsLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('KP');
  const [kpData, setKpData] = useState([]);
  const [liveData, setLiveData] = useState({ currentKp: '0.00', status: 'Unknown', stations: 0, aRunning: 0 });
  const [stats, setStats] = useState({ maxKp: '0.0', avgKp: '0.0', stormHours: 0, condition: 'Unknown' });

  // Fetch data on mount
  useEffect(() => { handleRefresh(); }, []);

  // Recalculate stats when data or period changes
  useEffect(() => {
    const slice = getDataForPeriod(currentPeriod);
    const values = slice.map(d => d.kp);
    if (values.length) {
      const maxKp = Math.max(...values);
      const avgKp = (values.reduce((a, v) => a + v, 0) / values.length).toFixed(2);
      const stormHours = values.filter(v => v >= 5).length;
      const latest = slice[slice.length - 1];
      setStats({ maxKp: maxKp.toFixed(1), avgKp, stormHours, condition: latest.kp >= 5 ? 'Storm' : 'Active' });
    }
  }, [kpData, currentPeriod]);

  // Determine slice size based on period (window hours)
  const getDataForPeriod = (period) => {
    const periodMap = { '6h': 6, '12h': 12, '24h': 24, '3d': 72, '7d': 168 };
    const hours = periodMap[period];
    if (!hours) return kpData;
    // data points every 3h, inclusive: count = hours/3 + 1
    const count = Math.min(kpData.length, Math.floor(hours / 3) + 1);
    return kpData.slice(-count);
  };

  // Fetch and parse KP data
  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch('https://services.swpc.noaa.gov/products/noaa-planetary-k-index.json');
      const data = await resp.json();
      if (data.length > 1) {
        const parsed = data.slice(1).map(e => ({
          time: e[0],
          kp: parseFloat(e[1]),
          aRunning: parseInt(e[2], 10),
          stations: parseInt(e[3], 10)
        }));
        setKpData(parsed);
        const latest = parsed[parsed.length - 1];
        setLiveData({ currentKp: latest.kp.toFixed(2), status: latest.kp >= 5 ? 'Storm' : 'Active', stations: latest.stations, aRunning: latest.aRunning });
      }
    } catch (err) {
      console.error('Fetch failed:', err);
    }
    setTimeout(() => setIsLoading(false), 1500);
  };

  const periodData = getDataForPeriod(currentPeriod);

  return (
    <div className={`app ${sidebarOpen ? 'app--sidebar-open' : ''}`}>
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <div className="main-content">
        <Navbar onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <div className="page-body">
          <InfoTab />

          {/* Full-width time selector */}
          <div className="dashboard-grid__full-controls">
            <TimeSelector
              currentPeriod={currentPeriod}
              setCurrentPeriod={setCurrentPeriod}
              onRefresh={handleRefresh}
              isLoading={isLoading}
            />
          </div>

          {/* KPI Chart */}
          <Chart data={periodData} currentPeriod={currentPeriod} isLoading={isLoading} />

          {/* Features + stats */}
          <Features stats={stats} />

          {/* Additional information section */}
          <AdditionalInfo />
        </div>
      </div>
    </div>
  );
};

export default App;
