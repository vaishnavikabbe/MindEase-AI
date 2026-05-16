import React, { useState } from 'react';
import { FaCheckCircle, FaCircle } from 'react-icons/fa';

function HabitCard({ habit }) {
  const [completed, setCompleted] = useState(false);

  const progressPercent = (habit.progress / parseInt(habit.target)) * 100;

  return (
    <div style={styles.card}>
      <div style={styles.header}>
        <div style={styles.titleSection}>
          <span style={styles.emoji}>{habit.name.split(' ')[0]}</span>
          <div>
            <h4 style={styles.name}>{habit.name}</h4>
            <p style={styles.target}>Target: {habit.target}</p>
          </div>
        </div>
        <div onClick={() => setCompleted(!completed)} style={styles.checkIcon}>
          {completed ? <FaCheckCircle color="#2ecc71" size={28} /> : <FaCircle color="#ccc" size={28} />}
        </div>
      </div>
      <div style={styles.progressSection}>
        <div style={styles.progressBar}>
          <div style={{...styles.progressFill, width: `${Math.min(progressPercent, 100)}%`, background: habit.color}} />
        </div>
        <span style={styles.progressText}>{habit.progress}/{habit.target} {habit.unit}</span>
      </div>
    </div>
  );
}

const styles = {
  card: {
    background: 'white',
    borderRadius: '15px',
    padding: '15px',
    marginBottom: '10px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  titleSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  emoji: {
    fontSize: '28px',
  },
  name: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '4px',
  },
  target: {
    fontSize: '12px',
    color: '#666',
  },
  checkIcon: {
    cursor: 'pointer',
  },
  progressSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  progressBar: {
    flex: 1,
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: '4px',
    transition: 'width 0.3s ease',
  },
  progressText: {
    fontSize: '12px',
    color: '#666',
    minWidth: '60px',
  },
};

export default HabitCard;