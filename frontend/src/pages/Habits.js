import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPlus, FaCheckCircle, FaCircle, FaTrash, FaPlay, FaPause, FaRedo, FaStopwatch, FaArrowLeft } from 'react-icons/fa';

function Habits() {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([
    { id: 1, name: '💧 Drink Water', target: '8 glasses', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 0 },
    { id: 2, name: '🏃 Exercise', target: '30 mins', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 1800 },
    { id: 3, name: '🧘 Meditate', target: '10 mins', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 600 },
    { id: 4, name: '📚 Read Book', target: '20 pages', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 0 },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('');
  const [celebrating, setCelebrating] = useState(null);

  useEffect(() => {
    const intervals = [];
    habits.forEach(habit => {
      if (habit.timerActive && !habit.completed) {
        const interval = setInterval(() => {
          setHabits(prev => prev.map(h => {
            if (h.id === habit.id) {
              const newSeconds = h.timerSeconds + 1;
              if (h.targetSeconds > 0 && newSeconds >= h.targetSeconds) {
                return { ...h, timerSeconds: h.targetSeconds, timerActive: false, completed: true };
              }
              return { ...h, timerSeconds: newSeconds };
            }
            return h;
          }));
        }, 1000);
        intervals.push(interval);
      }
    });
    
    habits.forEach(habit => {
      if (habit.completed && habit.timerSeconds >= habit.targetSeconds && habit.targetSeconds > 0) {
        setCelebrating(habit.id);
        setTimeout(() => setCelebrating(null), 3000);
      }
    });
    
    return () => intervals.forEach(clearInterval);
  }, [habits]);

  const toggleHabit = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, completed: !habit.completed, timerActive: false } : habit
    ));
    if (!habits.find(h => h.id === id).completed) {
      setCelebrating(id);
      setTimeout(() => setCelebrating(null), 2000);
    }
  };

  const startTimer = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id && !habit.completed
        ? { ...habit, timerActive: true }
        : habit
    ));
  };

  const pauseTimer = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, timerActive: false } : habit
    ));
  };

  const resetTimer = (id) => {
    setHabits(habits.map(habit =>
      habit.id === id ? { ...habit, timerSeconds: 0, timerActive: false, completed: false } : habit
    ));
  };

  const addHabit = () => {
    if (newHabit.trim()) {
      const timeInMinutes = parseInt(newHabitTime) || 0;
      const timeInSeconds = timeInMinutes * 60;
      setHabits([...habits, {
        id: Date.now(),
        name: newHabit,
        target: timeInMinutes > 0 ? `${timeInMinutes} mins` : 'Daily',
        completed: false,
        timerActive: false,
        timerSeconds: 0,
        targetSeconds: timeInSeconds
      }]);
      setNewHabit('');
      setNewHabitTime('');
    }
  };

  const deleteHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return '0:00';
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatTargetTime = (seconds) => {
    if (seconds <= 0) return '';
    const minutes = Math.floor(seconds / 60);
    return `${minutes} min`;
  };

  const getTimerProgress = (habit) => {
    if (habit.targetSeconds === 0) return 0;
    return (habit.timerSeconds / habit.targetSeconds) * 100;
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
          <FaArrowLeft size={12} /> Back to Home
        </button>

        <div style={styles.header}>
          <h1 style={styles.title}>✅ Habit Tracker</h1>
          <p style={styles.subtitle}>Track your habits with a real-time stopwatch</p>
        </div>

        {celebrating && (
          <div style={styles.celebrationOverlay}>
            <div style={styles.celebrationText}>🎉 Great Job! 🎉</div>
            <div style={styles.confettiContainer}>
              {[...Array(50)].map((_, i) => (
                <div key={i} style={{...styles.confetti, left: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 2}s`, backgroundColor: `hsl(${Math.random() * 360}, 70%, 50%)`}} />
              ))}
            </div>
          </div>
        )}

        <div style={styles.progressCard}>
          <div style={styles.progressInfo}>
            <span>📊 Daily Progress</span>
            <span>{completedCount}/{habits.length} completed</span>
          </div>
          <div style={styles.progressBar}>
            <div style={{...styles.progressFill, width: `${(completedCount/habits.length)*100}%`}} />
          </div>
        </div>

        <div style={styles.addHabitCard}>
          <div style={styles.addHabitInputs}>
            <input
              type="text"
              placeholder="Add a habit..."
              style={styles.input}
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            <input
              type="number"
              placeholder="Minutes"
              style={styles.timeInput}
              value={newHabitTime}
              onChange={(e) => setNewHabitTime(e.target.value)}
            />
          </div>
          <button onClick={addHabit} style={styles.addBtn}>
            <FaPlus /> Add Habit
          </button>
        </div>

        <div style={styles.habitsList}>
          {habits.map(habit => {
            const progress = getTimerProgress(habit);
            const isActive = habit.timerActive;
            const isCompleted = habit.completed;
            const hasTarget = habit.targetSeconds > 0;
            const elapsedFormatted = formatTime(habit.timerSeconds);
            
            return (
              <div key={habit.id} style={{...styles.habitItem, ...(isCompleted ? styles.habitCompleted : {}), ...(isActive ? styles.habitActive : {})}}>
                <div style={styles.habitLeft}>
                  <div onClick={() => toggleHabit(habit.id)} style={styles.checkbox}>
                    {isCompleted ? <FaCheckCircle color="#2ecc71" size={22} /> : <FaCircle color="#ccc" size={22} />}
                  </div>
                  <div style={styles.habitInfo}>
                    <h4 style={{...styles.habitName, textDecoration: isCompleted ? 'line-through' : 'none'}}>
                      {habit.name}
                    </h4>
                    <p style={styles.habitTarget}>🎯 {habit.target}</p>
                    
                    {hasTarget && (
                      <div style={styles.timerSection}>
                        <div style={styles.timerBar}>
                          <div style={{...styles.timerFill, width: `${progress}%`}} />
                        </div>
                        <div style={styles.timerInfo}>
                          <FaStopwatch size={12} color={isActive ? '#2ecc71' : '#667eea'} />
                          <span style={styles.timerElapsedText}>{elapsedFormatted}</span>
                          <span style={styles.timerTargetText}>/{formatTargetTime(habit.targetSeconds)}</span>
                        </div>
                        <div style={styles.timerControls}>
                          {!isActive && !isCompleted && habit.timerSeconds < habit.targetSeconds && (
                            <button onClick={() => startTimer(habit.id)} style={styles.timerBtnPlay}><FaPlay size={10} /> Start</button>
                          )}
                          {isActive && <button onClick={() => pauseTimer(habit.id)} style={styles.timerBtnPause}><FaPause size={10} /> Pause</button>}
                          {habit.timerSeconds > 0 && <button onClick={() => resetTimer(habit.id)} style={styles.timerBtnReset}><FaRedo size={10} /> Reset</button>}
                        </div>
                      </div>
                    )}
                    
                    {isCompleted && habit.targetSeconds > 0 && habit.timerSeconds >= habit.targetSeconds && (
                      <div style={styles.completedBadge}>🏆 Completed!</div>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteHabit(habit.id)} style={styles.deleteBtn}>
                  <FaTrash color="#e74c3c" size={14} />
                </button>
              </div>
            );
          })}
        </div>

        {habits.length === 0 && (
          <div style={styles.emptyState}>
            <p>✨ No habits yet. Add your first habit above! ✨</p>
          </div>
        )}

        <div style={styles.tipsCard}>
          <div style={styles.tipIcon}>💡</div>
          <div style={styles.tipContent}>
            <h4>Live Stopwatch</h4>
            <p>Add a time limit and watch the timer count up!</p>
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
    maxWidth: '100%',
    margin: '0 auto',
    padding: '12px',
    paddingTop: '0',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '11px',
    marginBottom: '12px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
    color: 'white',
  },
  title: {
    fontSize: '24px',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '11px',
    opacity: 0.9,
  },
  
  celebrationOverlay: {
    position: 'fixed',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    pointerEvents: 'none',
    zIndex: 1000,
  },
  celebrationText: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(0,0,0,0.85)',
    color: 'white',
    padding: '12px 24px',
    borderRadius: '40px',
    fontSize: '18px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    zIndex: 1002,
  },
  confettiContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    overflow: 'hidden',
    zIndex: 1001,
  },
  confetti: {
    position: 'absolute',
    width: '8px',
    height: '8px',
    top: '-10px',
    animation: 'fall 3s linear forwards',
    opacity: 0.8,
  },
  
  progressCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '16px',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: '500',
  },
  progressBar: {
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '4px',
    transition: 'width 0.3s',
  },
  
  addHabitCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '14px',
    marginBottom: '16px',
  },
  addHabitInputs: {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    marginBottom: '10px',
  },
  input: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  timeInput: {
    width: '100%',
    padding: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '13px',
    outline: 'none',
    boxSizing: 'border-box',
  },
  addBtn: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontWeight: '600',
    fontSize: '13px',
  },
  
  habitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginBottom: '16px',
  },
  habitItem: {
    background: 'white',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  habitCompleted: {
    opacity: 0.8,
    background: '#f0fff0',
  },
  habitActive: {
    border: '2px solid #2ecc71',
  },
  habitLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '10px',
    flex: 1,
  },
  checkbox: {
    cursor: 'pointer',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: '14px',
    marginBottom: '4px',
    color: '#333',
  },
  habitTarget: {
    fontSize: '11px',
    color: '#666',
    marginBottom: '6px',
  },
  
  timerSection: {
    marginTop: '8px',
    padding: '8px',
    background: '#f8f9ff',
    borderRadius: '8px',
  },
  timerBar: {
    height: '4px',
    background: '#e0e0e0',
    borderRadius: '2px',
    overflow: 'hidden',
    marginBottom: '6px',
  },
  timerFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2ecc71, #667eea)',
    borderRadius: '2px',
    transition: 'width 0.3s',
  },
  timerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '10px',
    marginBottom: '6px',
    flexWrap: 'wrap',
  },
  timerElapsedText: {
    fontWeight: 'bold',
    color: '#2ecc71',
    fontSize: '11px',
    fontFamily: 'monospace',
  },
  timerTargetText: {
    color: '#999',
    fontSize: '10px',
  },
  timerControls: {
    display: 'flex',
    gap: '6px',
  },
  timerBtnPlay: {
    padding: '3px 8px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '9px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  timerBtnPause: {
    padding: '3px 8px',
    background: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '9px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  timerBtnReset: {
    padding: '3px 8px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontSize: '9px',
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
  },
  
  completedBadge: {
    marginTop: '6px',
    padding: '4px 8px',
    background: '#2ecc71',
    color: 'white',
    borderRadius: '6px',
    fontSize: '9px',
    textAlign: 'center',
  },
  
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.5,
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '30px',
    background: 'white',
    borderRadius: '12px',
    color: '#999',
    fontSize: '12px',
  },
  
  tipsCard: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '12px',
    padding: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  tipIcon: {
    fontSize: '24px',
  },
  tipContent: {
    flex: 1,
  },
  tipContent: {
    flex: 1,
    fontSize: '11px',
  },
  tipContent: {
    flex: 1,
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes popIn {
    0% { transform: translate(-50%, -50%) scale(0); opacity: 0; }
    50% { transform: translate(-50%, -50%) scale(1.2); }
    100% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
  }
  @keyframes fall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

export default Habits;