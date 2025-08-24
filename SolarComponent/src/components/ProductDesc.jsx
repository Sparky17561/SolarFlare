import React, { useEffect, useRef } from 'react';
import { ChevronRight, ArrowRight } from 'lucide-react';
import './ProductDesc.css';

const ProductDesc = ({ icon: Icon, title, description, features, link, delay = 0 }) => {
  const cardRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Check if GSAP is loaded
            if (window.gsap) {
              window.gsap.fromTo(
                entry.target,
                {
                  y: 50,
                  opacity: 0,
                  scale: 0.9
                },
                {
                  y: 0,
                  opacity: 1,
                  scale: 1,
                  duration: 0.8,
                  delay: delay / 1000,
                  ease: "power3.out"
                }
              );
            } else {
              // Fallback CSS animation
              entry.target.style.animation = `slideInUp 0.8s ease-out ${delay}ms forwards`;
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  const handleTryClick = () => {
    // Simulate page navigation
    window.location.href = link;
  };

  return (
    <div className="product-card" ref={cardRef}>
      <div className="card-background"></div>
      <div className="card-content">
        <div className="card-header">
          <div className="card-icon">
            <Icon />
          </div>
          <h3 className="card-title">{title}</h3>
        </div>
        
        <p className="card-description">{description}</p>
        
        <div className="card-features">
          {features.map((feature, index) => (
            <div key={index} className="feature-item">
              <ChevronRight className="feature-icon" />
              <span className="feature-text">{feature}</span>
            </div>
          ))}
        </div>
        
        <button className="card-button" onClick={handleTryClick}>
          <span>Try Now</span>
          <ArrowRight className="button-icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductDesc;