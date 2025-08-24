import React from 'react';
import { Star, MapPin, Mail, Phone, Github, Twitter, Linkedin, ExternalLink } from 'lucide-react';
import './Footer.css';

const Footer = () => {
  const products = [
    { name: 'Time Carousel', link: '/time-carousel' },
    { name: 'Geomagnetic Index', link: '/geomagnetic' },
    { name: 'Solar Wind Dashboard', link: '/solar-wind' },
    { name: 'Electron Flux', link: '/electron-flux' },
    { name: 'Proton Flux', link: '/proton-flux' },
    { name: 'X-ray Flux', link: '/xray-flux' }
  ];

  const companyLinks = [
    { name: 'About Us', link: '#about' },
    { name: 'Our Team', link: '#team' },
    { name: 'Careers', link: '#careers' },
    { name: 'Press', link: '#press' },
    { name: 'Blog', link: '#blog' },
    { name: 'Research', link: '#research' }
  ];

  const resourceLinks = [
    { name: 'Documentation', link: '#docs' },
    { name: 'API Reference', link: '#api' },
    { name: 'Tutorials', link: '#tutorials' },
    { name: 'Support', link: '#support' },
    { name: 'Status', link: '#status' },
    { name: 'Changelog', link: '#changelog' }
  ];

  const handleLinkClick = (link) => {
    if (link.startsWith('/')) {
      window.location.href = link;
    } else if (link.startsWith('#')) {
      const element = document.querySelector(link);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      window.open(link, '_blank');
    }
  };

  return (
    <footer id="contact" className="footer">
      <div className="footer-background">
        <div className="footer-orb footer-orb-1"></div>
        <div className="footer-orb footer-orb-2"></div>
        <div className="footer-orb footer-orb-3"></div>
      </div>
      
      <div className="footer-container">
        <div className="footer-content">
          {/* Brand Section */}
          <div className="footer-section brand-section">
            <div className="footer-logo">
              <div className="footer-logo-icon">
                <Star />
              </div>
              <span className="footer-logo-text">SAKEC Space Observatory</span>
            </div>
            <p className="footer-description">
              Advanced space weather monitoring and solar observation tools for researchers, 
              scientists, and space enthusiasts worldwide.
            </p>
            <div className="footer-social">
              <button className="social-link" onClick={() => handleLinkClick('https://github.com')}>
                <Github />
              </button>
              <button className="social-link" onClick={() => handleLinkClick('https://twitter.com')}>
                <Twitter />
              </button>
              <button className="social-link" onClick={() => handleLinkClick('https://linkedin.com')}>
                <Linkedin />
              </button>
            </div>
          </div>
          
          {/* Products Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Products</h4>
            <div className="footer-links">
              {products.map((product, index) => (
                <button
                  key={index}
                  className="footer-link"
                  onClick={() => handleLinkClick(product.link)}
                >
                  <span>{product.name}</span>
                  <ExternalLink className="link-icon" />
                </button>
              ))}
            </div>
          </div>
          
          {/* Company Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Company</h4>
            <div className="footer-links">
              {companyLinks.map((link, index) => (
                <button
                  key={index}
                  className="footer-link"
                  onClick={() => handleLinkClick(link.link)}
                >
                  <span>{link.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Resources Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Resources</h4>
            <div className="footer-links">
              {resourceLinks.map((link, index) => (
                <button
                  key={index}
                  className="footer-link"
                  onClick={() => handleLinkClick(link.link)}
                >
                  <span>{link.name}</span>
                </button>
              ))}
            </div>
          </div>
          
          {/* Contact Section */}
          <div className="footer-section">
            <h4 className="footer-heading">Contact</h4>
            <div className="contact-info">
              <div className="contact-item">
                <MapPin className="contact-icon" />
                <span>Mumbai, Maharashtra, India</span>
              </div>
              <div className="contact-item">
                <Mail className="contact-icon" />
                <span>info@sakecspace.edu</span>
              </div>
              <div className="contact-item">
                <Phone className="contact-icon" />
                <span>+91 12345 67890</span>
              </div>
            </div>
            
            <div className="newsletter">
              <h5 className="newsletter-title">Stay Updated</h5>
              <div className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="newsletter-input"
                />
                <button className="newsletter-button">Subscribe</button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-bottom-content">
            <p className="footer-copyright">
              © 2025 SAKEC Space Observatory. All rights reserved.
            </p>
            <div className="footer-bottom-links">
              <button className="footer-bottom-link" onClick={() => handleLinkClick('#privacy')}>
                Privacy Policy
              </button>
              <button className="footer-bottom-link" onClick={() => handleLinkClick('#terms')}>
                Terms of Service
              </button>
              <button className="footer-bottom-link" onClick={() => handleLinkClick('#cookies')}>
                Cookie Policy
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;