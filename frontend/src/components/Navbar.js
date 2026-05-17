import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  FaHome, FaCheckCircle, FaComments, FaClock, FaUserCircle, 
  FaSignOutAlt, FaHeartbeat, FaBook, FaGamepad, FaBrain, 
  FaUserSecret, FaMoon
} from 'react-icons/fa';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/dashboard', icon: <FaHome size={13} />, label: 'Home' },
    { path: '/habits', icon: <FaCheckCircle size={13} />, label: 'Habits' },
    { path: '/chat', icon: <FaComments size={13} />, label: 'Chat' },
    { path: '/sleep', icon: <FaMoon size={13} />, label: 'Sleep' },
    { path: '/profile', icon: <FaUserCircle size={13} />, label: 'Profile' },
  ];

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
  };

  return (
    <div style={styles.navbar}>
      <div style={styles.navContent}>
        <div style={styles.logo} onClick={() => navigate('/dashboard')}>
          <FaHeartbeat size={16} color="#667eea" />
          <span style={styles.logoText}>Mind<span style={{ color: '#764ba2' }}>Ease</span></span>
        </div>
        
        <div style={styles.navLinks}>
          {navItems.map((item) => (
            <div
              key={item.path}
              style={{
                ...styles.navItem,
                ...(location.pathname === item.path ? styles.navItemActive : {})
              }}
              onClick={() => navigate(item.path)}
            >
              {item.icon}
              <span style={styles.navLabel}>{item.label}</span>
            </div>
          ))}
          <div style={styles.navItem} onClick={handleLogout}>
            <FaSignOutAlt size={12} />
            <span style={styles.navLabel}>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  navbar: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    background: 'white',
    boxShadow: '0 1px 4px rgba(0,0,0,0.05)',
    zIndex: 1000,
    padding: '4px 0',
  },
  navContent: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: '4px',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    cursor: 'pointer',
  },
  logoText: {
    fontSize: '14px',
    fontWeight: 'bold',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  navLinks: {
    display: 'flex',
    gap: '1px',
    flexWrap: 'wrap',
    alignItems: 'center',
  },
  navItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    padding: '4px 8px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    color: '#666',
    fontSize: '12px',
  },
  navItemActive: {
    background: '#667eea10',
    color: '#667eea',
  },
  navLabel: {
    fontSize: '10px',
    fontWeight: '500',
  },
};

export default Navbar;