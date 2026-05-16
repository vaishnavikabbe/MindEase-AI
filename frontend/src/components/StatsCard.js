import React from 'react';
import CountUp from 'react-countup';

function StatsCard({ icon, value, label, color }) {
  return (
    <div style={styles.card}>
      <div style={{...styles.icon, color: color}}>{icon}</div>
      <div style={styles.value}>
        <CountUp end={value} duration={2} />
      </div>
      <div style={styles.label}>{label}</div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  icon: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  value: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: '12px',
    color: '#666',
    marginTop: '5px',
  },
};

export default StatsCard;