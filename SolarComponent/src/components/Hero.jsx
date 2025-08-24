import React, { useEffect, useRef } from 'react';
import Spline from '@splinetool/react-spline';
import './Hero.css';

/** Inline arrow icon (no external dependency) */
const ArrowRightIcon = ({ className = '', size = 18 }) => (
  <svg
    className={className}
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const buttonsRef = useRef(null);
  const statusRef = useRef(null);

  useEffect(() => {
    // Lightweight, non-fatal GSAP loader (animations optional)
    let scriptEl = null;
    let tl = null;
    const loadGSAP = () =>
      new Promise((resolve, reject) => {
        if (window.gsap) return resolve(window.gsap);
        scriptEl = document.createElement('script');
        scriptEl.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        scriptEl.async = true;
        scriptEl.onload = () => (window.gsap ? resolve(window.gsap) : reject(new Error('gsap missing')));
        scriptEl.onerror = reject;
        document.head.appendChild(scriptEl);
      });

    loadGSAP()
      .then((gsap) => {
        tl = gsap.timeline();
        tl.from(titleRef.current, { duration: 1.1, y: 80, opacity: 0, ease: 'power3.out' })
          .from(subtitleRef.current, { duration: 0.9, y: 30, opacity: 0, ease: 'power2.out' }, '-=0.6')
          .from(buttonsRef.current?.children || [], { duration: 0.7, y: 20, opacity: 0, stagger: 0.12 }, '-=0.4');

        gsap.to('.floating-element-1', { y: -18, duration: 3.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
        gsap.to('.floating-element-2', { y: 18, duration: 4.5, yoyo: true, repeat: -1, ease: 'sine.inOut', delay: 0.6 });
        gsap.to('.gradient-text', { backgroundPosition: '200% center', duration: 4, repeat: -1, ease: 'none' });
      })
      .catch(() => {
        /* animations are optional — fail gracefully */
      });

    return () => {
      try {
        if (tl?.kill) tl.kill();
      } catch (e) {}
      if (scriptEl?.parentNode) scriptEl.parentNode.removeChild(scriptEl);
    };
  }, []);

  return (
    <section className="hero" aria-label="Hero section">
      <div className="hero-background" aria-hidden>
        <div className="floating-element floating-element-1" />
        <div className="floating-element floating-element-2" />
        <div className="glass-orb glass-orb-1" />
        <div className="glass-orb glass-orb-2" />
        <div className="glass-orb glass-orb-3" />
      </div>

      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-text">
            <h1 ref={titleRef} className="hero-title">
              Explore the
              <span className="gradient-text"> Universe</span>
            </h1>

            <p ref={subtitleRef} className="hero-subtitle">
              Advanced space weather monitoring and solar observation tools for researchers, scientists, and space
              enthusiasts around the world.
            </p>

            <div ref={buttonsRef} className="hero-buttons">
              <button className="btn btn-primary" type="button">
                <span>Get Started</span>
                <ArrowRightIcon className="btn-icon" />
              </button>

              <button className="btn btn-secondary" type="button">
                Learn More
              </button>
            </div>

            <div ref={statusRef} className="hero-status">
              <div className="status-item">
                <div className="status-indicator status-live" />
                <span>Live Data</span>
              </div>

              <div className="status-item">
                <div className="status-indicator status-updates" />
                <span>Real-time Updates</span>
              </div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden>
            <div className="spline-container">
              {/* Spline canvas (interactive). If you need non-interactive, add style={{pointerEvents:'none'}} */}
              <Spline scene="https://prod.spline.design/kC0fRW4ysvggBoRK/scene.splinecode" />

              {/* --- smart overlays to hide badge while blending --- */}
              <div className="spline-gradient-overlay" />
              <div className="spline-badge-mask" />

              {/* subtle corner glows (optional decorative) */}
              <div className="spline-corner-overlay corner-top-left" />
              <div className="spline-corner-overlay corner-bottom-right" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
