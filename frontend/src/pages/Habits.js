import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaPlus, FaCheckCircle, FaCircle, FaTrash, FaPlay, FaPause, FaRedo, FaStopwatch } from 'react-icons/fa';

function Habits() {
  const [habits, setHabits] = useState([
    { id: 1, name: '💧 Drink Water', target: '8 glasses', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 0 },
    { id: 2, name: '🏃 Exercise', target: '30 mins', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 1800 },
    { id: 3, name: '🧘 Meditate', target: '10 mins', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 600 },
    { id: 4, name: '📚 Read Book', target: '20 pages', completed: false, timerActive: false, timerSeconds: 0, targetSeconds: 0 },
  ]);
  const [newHabit, setNewHabit] = useState('');
  const [newHabitTime, setNewHabitTime] = useState('');
  const [celebrating, setCelebrating] = useState(null);

  // Stopwatch timer effect - counts up every SECOND
  useEffect(() => {
    const intervals = [];
    habits.forEach(habit => {
      if (habit.timerActive && !habit.completed) {
        const interval = setInterval(() => {
          setHabits(prev => prev.map(h => {
            if (h.id === habit.id) {
              const newSeconds = h.timerSeconds + 1;
              // Auto-complete when reaching target time
              if (h.targetSeconds > 0 && newSeconds >= h.targetSeconds) {
                return { ...h, timerSeconds: h.targetSeconds, timerActive: false, completed: true };
              }
              return { ...h, timerSeconds: newSeconds };
            }
            return h;
          }));
        }, 1000); // Update every SECOND
        intervals.push(interval);
      }
    });
    
    // Check for newly completed habits
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

  // Format seconds to MM:SS or HH:MM:SS
  const formatTime = (totalSeconds) => {
    if (totalSeconds <= 0) return '0:00';
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Format target time for display
  const formatTargetTime = (seconds) => {
    if (seconds <= 0) return '';
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (minutes > 0 && secs === 0) return `${minutes} min`;
    if (minutes > 0 && secs > 0) return `${minutes}m ${secs}s`;
    return `${secs} sec`;
  };

  const getTimerProgress = (habit) => {
    if (habit.targetSeconds === 0) return 0;
    return (habit.timerSeconds / habit.targetSeconds) * 100;
  };

  const completedCount = habits.filter(h => h.completed).length;

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>✅ Habit Tracker</h1>
          <p style={styles.subtitle}>Track your habits with a real-time stopwatch</p>
        </div>

        {celebrating && (
          <div style={styles.celebrationOverlay}>
            <div style={styles.celebrationText}>
              🎉 Great Job! 🎉
            </div>
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
              placeholder="Add a new habit..."
              style={styles.input}
              value={newHabit}
              onChange={(e) => setNewHabit(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addHabit()}
            />
            <input
              type="number"
              placeholder="Target minutes"
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
                    {isCompleted ? 
                      <FaCheckCircle color="#2ecc71" size={28} /> : 
                      <FaCircle color="#ccc" size={28} />
                    }
                  </div>
                  <div style={styles.habitInfo}>
                    <h4 style={{...styles.habitName, textDecoration: isCompleted ? 'line-through' : 'none'}}>
                      {habit.name}
                    </h4>
                    <p style={styles.habitTarget}>🎯 {habit.target}</p>
                    
                    {hasTarget && (
                      <div style={styles.timerSection}>
                        {/* Animated Progress Bar */}
                        <div style={styles.timerBar}>
                          <div 
                            style={{
                              ...styles.timerFill, 
                              width: `${progress}%`,
                              transition: 'width 0.3s ease-out'
                            }} 
                          />
                          {/* Moving dot graphic */}
                          <div style={{...styles.movingDot, left: `${progress}%`}}>
                            <div style={styles.dot} />
                          </div>
                        </div>
                        
                        {/* Timer Display */}
                        <div style={styles.timerInfo}>
                          <FaStopwatch size={14} color={isActive ? '#2ecc71' : '#667eea'} />
                          <span style={styles.timerElapsedText}>
                            ⏱️ {elapsedFormatted}
                          </span>
                          {habit.targetSeconds > 0 && (
                            <span style={styles.timerTargetText}>
                              / {formatTargetTime(habit.targetSeconds)}
                            </span>
                          )}
                        </div>
                        
                        {/* Timer Controls */}
                        <div style={styles.timerControls}>
                          {!isActive && !isCompleted && habit.timerSeconds < habit.targetSeconds && (
                            <button onClick={() => startTimer(habit.id)} className="btn-play" style={styles.timerBtnPlay}>
                              <FaPlay size={12} /> Start
                            </button>
                          )}
                          {isActive && (
                            <button onClick={() => pauseTimer(habit.id)} style={styles.timerBtnPause}>
                              <FaPause size={12} /> Pause
                            </button>
                          )}
                          {habit.timerSeconds > 0 && (
                            <button onClick={() => resetTimer(habit.id)} style={styles.timerBtnReset}>
                              <FaRedo size={12} /> Reset
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                    
                    {/* Achievement Badge */}
                    {isCompleted && habit.targetSeconds > 0 && habit.timerSeconds >= habit.targetSeconds && (
                      <div style={styles.completedBadge}>
                        🏆 Completed {formatTargetTime(habit.targetSeconds)}!
                      </div>
                    )}
                  </div>
                </div>
                <button onClick={() => deleteHabit(habit.id)} style={styles.deleteBtn}>
                  <FaTrash color="#e74c3c" size={18} />
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
            <p>Add a time limit to your habits and watch the timer count up!</p>
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
  content: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '20px',
    paddingTop: '80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '14px',
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
    padding: '20px 40px',
    borderRadius: '50px',
    fontSize: '24px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
    animation: 'popIn 0.5s ease-out',
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
    width: '10px',
    height: '10px',
    top: '-10px',
    animation: 'fall 3s linear forwards',
    opacity: 0.8,
  },
  
  progressCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
  },
  progressInfo: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '10px',
    fontSize: '14px',
    fontWeight: '500',
  },
  progressBar: {
    height: '10px',
    background: '#e0e0e0',
    borderRadius: '5px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '5px',
    transition: 'width 0.5s ease',
  },
  
  addHabitCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    marginBottom: '20px',
  },
  addHabitInputs: {
    display: 'flex',
    gap: '10px',
    marginBottom: '10px',
  },
  input: {
    flex: 2,
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  timeInput: {
    flex: 1,
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  addBtn: {
    width: '100%',
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontWeight: '600',
  },
  
  habitsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginBottom: '20px',
  },
  habitItem: {
    background: 'white',
    borderRadius: '15px',
    padding: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    transition: 'all 0.3s ease',
  },
  habitCompleted: {
    opacity: 0.8,
    background: '#f0fff0',
  },
  habitActive: {
    border: '2px solid #2ecc71',
    boxShadow: '0 4px 15px rgba(46,204,113,0.2)',
  },
  habitLeft: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '15px',
    flex: 1,
  },
  checkbox: {
    cursor: 'pointer',
    paddingTop: '2px',
  },
  habitInfo: {
    flex: 1,
  },
  habitName: {
    fontSize: '16px',
    marginBottom: '4px',
    color: '#333',
  },
  habitTarget: {
    fontSize: '12px',
    color: '#666',
    marginBottom: '8px',
  },
  
  timerSection: {
    marginTop: '10px',
    padding: '10px',
    background: '#f8f9ff',
    borderRadius: '10px',
  },
  timerBar: {
    height: '8px',
    background: '#e0e0e0',
    borderRadius: '4px',
    overflow: 'hidden',
    marginBottom: '8px',
    position: 'relative',
  },
  timerFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #2ecc71, #667eea)',
    borderRadius: '4px',
    transition: 'width 0.3s ease-out',
  },
  movingDot: {
    position: 'absolute',
    top: '-4px',
    transform: 'translateX(-50%)',
    transition: 'left 0.3s ease-out',
  },
  dot: {
    width: '12px',
    height: '12px',
    backgroundColor: '#2ecc71',
    borderRadius: '50%',
    border: '2px solid white',
    boxShadow: '0 0 5px rgba(0,0,0,0.2)',
  },
  timerInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '11px',
    marginBottom: '8px',
    flexWrap: 'wrap',
  },
  timerElapsedText: {
    fontWeight: 'bold',
    color: '#2ecc71',
    fontSize: '13px',
    fontFamily: 'monospace',
  },
  timerTargetText: {
    color: '#999',
    fontSize: '11px',
  },
  timerControls: {
    display: 'flex',
    gap: '8px',
  },
  timerBtnPlay: {
    padding: '4px 12px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    transition: 'transform 0.2s',
  },
  timerBtnPause: {
    padding: '4px 12px',
    background: '#f39c12',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  timerBtnReset: {
    padding: '4px 12px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '15px',
    cursor: 'pointer',
    fontSize: '10px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  
  completedBadge: {
    marginTop: '8px',
    padding: '6px 10px',
    background: '#2ecc71',
    color: 'white',
    borderRadius: '8px',
    fontSize: '11px',
    textAlign: 'center',
    animation: 'slideIn 0.3s ease-out',
  },
  
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    opacity: 0.6,
    transition: 'opacity 0.2s',
  },
  
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    background: 'white',
    borderRadius: '15px',
    color: '#666',
  },
  
  tipsCard: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '15px',
    padding: '15px',
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    border: '1px solid #667eea',
  },
  tipIcon: {
    fontSize: '30px',
  },
  tipContent: {
    flex: 1,
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes popIn {
    0% {
      transform: translate(-50%, -50%) scale(0);
      opacity: 0;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
  }
  
  @keyframes fall {
    0% {
      transform: translateY(-10px) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(100vh) rotate(360deg);
      opacity: 0;
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .btn-play:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);

export default Habits;