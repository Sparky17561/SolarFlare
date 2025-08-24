import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductDesc from './components/ProductDesc';
import Footer from './components/Footer';
import { Activity, Globe, Radio, Zap, Shield, Star } from 'lucide-react';
import './App.css';

function App() {
  const products = [
    {
      icon: Activity,
      title: "Time Carousel",
      description: "Navigate through time-series space weather data with an intuitive carousel interface for comprehensive analysis.",
      features: ["Interactive timeline navigation", "Historical data access", "Smooth transitions", "Responsive design"],
      link: "/time-carousel"
    },
    {
      icon: Globe,
      title: "Geomagnetic Index",
      description: "Monitor Earth's magnetic field variations and geomagnetic storm activity in real-time with advanced analytics.",
      features: ["Kp index tracking", "Storm alerts", "Historical trends", "Data visualization"],
      link: "/geomagnetic"
    },
    {
      icon: Radio,
      title: "Solar Wind Dashboard",
      description: "Comprehensive solar wind parameter monitoring with advanced analytics and forecasting capabilities.",
      features: ["Real-time data streams", "Parameter analysis", "Forecast models", "Alert system"],
      link: "/solar-wind"
    },
    {
      icon: Zap,
      title: "Electron Flux",
      description: "Track high-energy electron populations in Earth's radiation belts and magnetosphere with precision.",
      features: ["Multi-energy channels", "Belt analysis", "Hazard assessment", "Trend monitoring"],
      link: "/electron-flux"
    },
    {
      icon: Shield,
      title: "Proton Flux",
      description: "Monitor solar energetic proton events and their impact on space systems and technology.",
      features: ["Event detection", "Energy spectra", "Dose calculations", "Risk assessment"],
      link: "/proton-flux"
    },
    {
      icon: Star,
      title: "X-ray Flux",
      description: "Solar X-ray monitoring for flare detection and comprehensive space weather forecasting.",
      features: ["Flare classification", "Intensity monitoring", "Forecast integration", "Alert notifications"],
      link: "/xray-flux"
    }
  ];

  return (
    <div className="App">
      <Navbar />
      <Hero />
      
      <section id="products" className="products-section">
        <div className="container">
          <div className="products-header">
            <h2 className="products-title">Our Products</h2>
            <p className="products-subtitle">
              Cutting-edge tools for space weather monitoring, solar observation, and geomagnetic analysis
            </p>
          </div>
          
          <div className="products-grid">
            {products.map((product, index) => (
              <ProductDesc
                key={index}
                icon={product.icon}
                title={product.title}
                description={product.description}
                features={product.features}
                link={product.link}
                delay={index * 100}
              />
            ))}
          </div>
        </div>
      </section>
      
      <section id="about" className="about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="about-title">About SAKEC Space Observatory</h2>
              <p className="about-description">
                At SAKEC Space Observatory, we're dedicated to advancing our understanding of space weather 
                and its effects on Earth and technology. Our cutting-edge monitoring systems provide real-time 
                data and analysis to researchers, scientists, and organizations worldwide.
              </p>
              <p className="about-description">
                Founded with a mission to make space weather data accessible and actionable, we combine 
                advanced technology with user-friendly interfaces to deliver comprehensive solutions for 
                space weather monitoring and analysis.
              </p>
            </div>
            <div className="about-visual">
              <div className="about-card">
                <Globe className="about-icon" />
                <h3>24/7 Monitoring</h3>
                <p>Continuous space weather surveillance</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}

export default App;