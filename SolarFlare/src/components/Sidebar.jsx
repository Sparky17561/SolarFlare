// Sidebar.jsx
import React from 'react';

const Sidebar = ({ isOpen, onClose, activeTab, setActiveTab }) => {
  const menuItems = [
    { id: 'About', icon: '📊', label: 'About' },
    { id: 'KP', icon: '⚡', label: 'KP' },
    { id: 'featureX', icon: '💬', label: 'featureX' },
    { id: 'featureY', icon: '📝', label: 'featureY' }
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} />
      )}
      
      {/* Sidebar */}
      <div
        className={`sidebar ${isOpen ? 'sidebar--open' : ''}`}
      >
        <div className="sidebar__content">
          <div className="sidebar__header">
            <h4 className="sidebar__title">Augura Space</h4>
            <button
              className="sidebar__close-btn"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          
          <nav className="sidebar__nav">
            {menuItems.map(item => (
              <button
                key={item.id}
                className={`sidebar__item ${
                  activeTab === item.id ? 'sidebar__item--active' : ''
                }`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="sidebar__icon">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
