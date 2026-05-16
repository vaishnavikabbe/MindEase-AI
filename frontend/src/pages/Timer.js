import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaPlay, FaPause, FaRedo, FaCheckCircle, FaBrain, FaCoffee } from 'react-icons/fa';

function Timer() {
  const [time, setTime] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('focus');
  const [sessions, setSessions] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);

  const focusTime = 25 * 60;
  const breakTime = 5 * 60;

  useEffect(() => {
    let interval = null;
    if (isActive && time > 0) {
      interval = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);
    } else if (time === 0 && isActive) {
      setIsActive(false);
      setIsCompleted(true);
      if (mode === 'focus') {
        setSessions(sessions + 1);
      }
    }
    return () => clearInterval(interval);
  }, [isActive, time, mode, sessions]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const startTimer = () => {
    setIsActive(true);
    setIsCompleted(false);
  };

  const pauseTimer = () => {
    setIsActive(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setTime(focusTime);
    } else {
      setTime(breakTime);
    }
    setIsCompleted(false);
  };

  const switchMode = () => {
    setIsActive(false);
    if (mode === 'focus') {
      setMode('break');
      setTime(breakTime);
    } else {
      setMode('focus');
      setTime(focusTime);
    }
    setIsCompleted(false);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>
            {mode === 'focus' ? '🎯 Focus Timer' : '☕ Break Time'}
          </h1>
        </div>

        <div style={styles.timerCard}>
          <div style={styles.modeIndicator}>
            <div 
              style={{...styles.modeButton, ...(mode === 'focus' ? styles.modeActiveFocus : {})}}
              onClick={() => mode === 'break' && switchMode()}
            >
              <FaBrain size={14} /> Focus
            </div>
            <div 
              style={{...styles.modeButton, ...(mode === 'break' ? styles.modeActiveBreak : {})}}
              onClick={() => mode === 'focus' && switchMode()}
            >
              <FaCoffee size={14} /> Break
            </div>
          </div>

          <div style={styles.timerDisplay}>
            <span style={styles.timerText}>{formatTime()}</span>
          </div>

          <div style={styles.controls}>
            {!isActive ? (
              <button onClick={startTimer} style={styles.playBtn}>
                <FaPlay size={14} /> Start
              </button>
            ) : (
              <button onClick={pauseTimer} style={styles.pauseBtn}>
                <FaPause size={14} /> Pause
              </button>
            )}
            <button onClick={resetTimer} style={styles.resetBtn}>
              <FaRedo size={12} /> Reset
            </button>
          </div>

          {isCompleted && (
            <div style={styles.completionMsg}>
              <FaCheckCircle size={24} color="#2ecc71" />
              <p style={styles.completionText}>
                {mode === 'focus' ? '🎉 Great job! Time for a break!' : '😊 Break over! Ready to focus?'}
              </p>
            </div>
          )}
        </div>

        <div style={styles.statsCard}>
          <div style={styles.statsGrid}>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{sessions}</span>
              <span style={styles.statLabel}>Focus Sessions</span>
            </div>
            <div style={styles.statItem}>
              <span style={styles.statValue}>{sessions * 25}</span>
              <span style={styles.statLabel}>Minutes Focused</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  navSpacer: {
    height: '52px',
  },
  content: {
    maxWidth: '450px',
    margin: '0 auto',
    padding: '0 16px 24px 16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  title: {
    fontSize: '22px',
    marginBottom: '0',
    color: 'white',
  },
  timerCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    boxShadow: '0 10px 25px rgba(0,0,0,0.15)',
    marginBottom: '16px',
  },
  modeIndicator: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
    background: '#f0f0f0',
    borderRadius: '40px',
    padding: '4px',
  },
  modeButton: {
    flex: 1,
    textAlign: 'center',
    padding: '8px',
    borderRadius: '40px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '13px',
    fontWeight: '500',
  },
  modeActiveFocus: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
  },
  modeActiveBreak: {
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    color: 'white',
  },
  timerDisplay: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  timerText: {
    fontSize: '56px',
    fontWeight: 'bold',
    fontFamily: 'monospace',
    color: '#333',
    letterSpacing: '2px',
  },
  controls: {
    display: 'flex',
    gap: '12px',
    justifyContent: 'center',
  },
  playBtn: {
    background: 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '40px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  pauseBtn: {
    background: 'linear-gradient(135deg, #f39c12 0%, #e67e22 100%)',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '40px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  resetBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '40px',
    fontSize: '14px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontWeight: '500',
  },
  completionMsg: {
    marginTop: '16px',
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  completionText: {
    margin: 0,
    fontSize: '13px',
    fontWeight: '600',
    color: '#2ecc71',
  },
  statsCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '14px',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
  },
  statItem: {
    textAlign: 'center',
  },
  statValue: {
    display: 'block',
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: '11px',
    color: '#888',
  },
};

export default Timer;