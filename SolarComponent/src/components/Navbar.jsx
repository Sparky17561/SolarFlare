import React, { useState, useEffect } from 'react';
import { Menu, X, Star, ChevronDown } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);

  const products = [
    { name: 'Time Carousel', link: '/time-carousel' },
    { name: 'Geomagnetic Index', link: '/geomagnetic' },
    { name: 'Solar Wind Dashboard', link: '/solar-wind' },
    { name: 'Electron Flux', link: '/electron-flux' },
    { name: 'Proton Flux', link: '/proton-flux' },
    { name: 'X-ray Flux', link: '/xray-flux' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleProductClick = (link) => {
    window.location.href = link;
  };

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="nav-container">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="logo-icon">
              <Star />
            </div>
            <span className="logo-text">SAKEC Space Observatory</span>
          </div>
          
          <div className="nav-links">
            <a href="#home" className="nav-link active">Home</a>
            <a href="#about" className="nav-link">About</a>
            <div 
              className="nav-dropdown"
              onMouseEnter={() => setProductsOpen(true)}
              onMouseLeave={() => setProductsOpen(false)}
            >
              <button className="nav-link dropdown-trigger">
                Products <ChevronDown className={`dropdown-arrow ${productsOpen ? 'rotated' : ''}`} />
              </button>
              <div className={`dropdown-menu ${productsOpen ? 'dropdown-open' : ''}`}>
                {products.map((product, index) => (
                  <button
                    key={index}
                    className="dropdown-item"
                    onClick={() => handleProductClick(product.link)}
                  >
                    {product.name}
                  </button>
                ))}
              </div>
            </div>
            <a href="#blogs" className="nav-link">Blogs</a>
            <a href="#contact" className="nav-link">Contact</a>
          </div>
          
          <button
            className="mobile-menu-btn"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`mobile-menu ${isOpen ? 'mobile-menu-open' : ''}`}>
        <div className="mobile-menu-content">
          <a href="#home" className="mobile-link">Home</a>
          <a href="#about" className="mobile-link">About</a>
          <div className="mobile-dropdown">
            <button 
              className="mobile-dropdown-trigger"
              onClick={() => setProductsOpen(!productsOpen)}
            >
              Products <ChevronDown className={`dropdown-arrow ${productsOpen ? 'rotated' : ''}`} />
            </button>
            <div className={`mobile-dropdown-menu ${productsOpen ? 'mobile-dropdown-open' : ''}`}>
              {products.map((product, index) => (
                <button
                  key={index}
                  className="mobile-dropdown-item"
                  onClick={() => handleProductClick(product.link)}
                >
                  {product.name}
                </button>
              ))}
            </div>
          </div>
          <a href="#blogs" className="mobile-link">Blogs</a>
          <a href="#contact" className="mobile-link">Contact</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;