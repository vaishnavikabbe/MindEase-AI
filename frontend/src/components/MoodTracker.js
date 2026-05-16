import React, { useState, useEffect } from 'react';
import { FaSmile, FaMeh, FaFrown, FaAngry, FaGrinStars, FaSadTear } from 'react-icons/fa';

function MoodTracker({ selectedMood, setSelectedMood }) {
  const [moodHistory, setMoodHistory] = useState([]);
  const [weeklySummary, setWeeklySummary] = useState({});
  const [showStats, setShowStats] = useState(false);

  const moods = [
    { emoji: <FaGrinStars size={28} />, label: 'Excellent', color: '#2ecc71', value: 'excellent', score: 5 },
    { emoji: <FaSmile size={28} />, label: 'Good', color: '#3498db', value: 'good', score: 4 },
    { emoji: <FaMeh size={28} />, label: 'Okay', color: '#f39c12', value: 'okay', score: 3 },
    { emoji: <FaFrown size={28} />, label: 'Low', color: '#e67e22', value: 'low', score: 2 },
    { emoji: <FaSadTear size={28} />, label: 'Sad', color: '#e74c3c', value: 'sad', score: 1 },
    { emoji: <FaAngry size={28} />, label: 'Stressed', color: '#c0392b', value: 'stressed', score: 1 },
  ];

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = () => {
    const savedHistory = localStorage.getItem('moodHistory');
    if (savedHistory) {
      try {
        let parsed = JSON.parse(savedHistory);
        // Ensure it's an array
        if (!Array.isArray(parsed)) {
          parsed = [];
        }
        setMoodHistory(parsed);
        calculateWeeklySummary(parsed);
      } catch (e) {
        console.error('Error loading mood history:', e);
        setMoodHistory([]);
      }
    } else {
      setMoodHistory([]);
    }
  };

  const calculateWeeklySummary = (history) => {
    // Ensure history is an array
    if (!Array.isArray(history)) {
      setWeeklySummary({});
      return;
    }
    
    const last7Days = history.slice(-7);
    const moodCounts = {};
    last7Days.forEach(entry => {
      if (entry && entry.mood) {
        moodCounts[entry.mood] = (moodCounts[entry.mood] || 0) + 1;
      }
    });
    setWeeklySummary(moodCounts);
  };

  const handleMoodSelect = (mood) => {
    // Update selected mood
    setSelectedMood(mood.value);
    
    // Get today's date
    const today = new Date().toISOString().split('T')[0];
    
    // Get existing history
    const savedHistory = localStorage.getItem('moodHistory');
    let history = [];
    
    if (savedHistory) {
      try {
        const parsed = JSON.parse(savedHistory);
        if (Array.isArray(parsed)) {
          history = parsed;
        }
      } catch (e) {
        console.error('Error parsing mood history:', e);
      }
    }
    
    // Check if already logged today
    const existingIndex = history.findIndex(entry => entry && entry.date === today);
    
    if (existingIndex !== -1) {
      // Update existing entry
      history[existingIndex] = {
        date: today,
        mood: mood.value,
        label: mood.label,
        score: mood.score,
        timestamp: new Date().toISOString()
      };
    } else {
      // Add new entry
      history.push({
        date: today,
        mood: mood.value,
        label: mood.label,
        score: mood.score,
        timestamp: new Date().toISOString()
      });
    }
    
    // Keep only last 30 days
    if (history.length > 30) {
      history = history.slice(-30);
    }
    
    // Save to localStorage
    localStorage.setItem('moodHistory', JSON.stringify(history));
    setMoodHistory(history);
    calculateWeeklySummary(history);
  };

  const getTodayMood = () => {
    const today = new Date().toISOString().split('T')[0];
    if (!Array.isArray(moodHistory)) return null;
    const todayEntry = moodHistory.find(entry => entry && entry.date === today);
    if (todayEntry) {
      const mood = moods.find(m => m.value === todayEntry.mood);
      return mood;
    }
    return null;
  };

  const todayMood = getTodayMood();

  return (
    <div style={styles.container}>
      <div style={styles.moodGrid}>
        {moods.map((mood) => (
          <div
            key={mood.value}
            style={{
              ...styles.moodCard,
              ...(selectedMood === mood.value ? { ...styles.moodCardActive, borderColor: mood.color, background: `${mood.color}10` } : {}),
              ...(todayMood?.value === mood.value ? { ...styles.moodCardToday, borderColor: mood.color } : {})
            }}
            onClick={() => handleMoodSelect(mood)}
          >
            <div style={{ ...styles.moodEmoji, color: mood.color }}>{mood.emoji}</div>
            <span style={styles.moodLabel}>{mood.label}</span>
            {todayMood?.value === mood.value && (
              <span style={styles.todayBadge}>Today</span>
            )}
          </div>
        ))}
      </div>

      {/* Stats Button */}
      <button 
        onClick={() => setShowStats(!showStats)} 
        style={styles.statsBtn}
      >
        📊 View Mood History
      </button>

      {/* Stats Panel */}
      {showStats && (
        <div style={styles.statsPanel}>
          <div style={styles.statsHeader}>
            <h4>Weekly Mood Summary</h4>
            <button onClick={() => setShowStats(false)} style={styles.closeStatsBtn}>✕</button>
          </div>
          <div style={styles.statsContent}>
            {Object.keys(weeklySummary).length === 0 ? (
              <p style={styles.noStats}>No mood data yet. Start tracking!</p>
            ) : (
              <div style={styles.statsList}>
                {Object.entries(weeklySummary).map(([mood, count]) => {
                  const moodData = moods.find(m => m.value === mood);
                  return (
                    <div key={mood} style={styles.statItem}>
                      <span style={styles.statEmoji}>{moodData?.emoji}</span>
                      <span style={styles.statLabel}>{moodData?.label}</span>
                      <div style={styles.statBarBg}>
                        <div style={{...styles.statBarFill, width: `${(count / 7) * 100}%`, background: moodData?.color}} />
                      </div>
                      <span style={styles.statCount}>{count} day{count !== 1 ? 's' : ''}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Recent Moods Mini Display */}
      {Array.isArray(moodHistory) && moodHistory.length > 0 && (
        <div style={styles.recentMoods}>
          <span style={styles.recentLabel}>Recent:</span>
          {moodHistory.slice(-5).reverse().map((entry, idx) => {
            if (!entry) return null;
            const moodData = moods.find(m => m.value === entry.mood);
            return (
              <span key={idx} style={styles.recentMood} title={moodData?.label}>
                {moodData?.emoji}
              </span>
            );
          })}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    width: '100%',
  },
  moodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    gap: '10px',
    marginBottom: '15px',
  },
  moodCard: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '12px 8px',
    borderRadius: '16px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    background: 'white',
    border: '2px solid transparent',
    position: 'relative',
  },
  moodCardActive: {
    transform: 'scale(1.02)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  moodCardToday: {
    borderWidth: '2px',
  },
  moodEmoji: {
    fontSize: '28px',
    marginBottom: '6px',
  },
  moodLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#555',
  },
  todayBadge: {
    position: 'absolute',
    top: '-8px',
    right: '-8px',
    background: '#667eea',
    color: 'white',
    fontSize: '8px',
    padding: '2px 6px',
    borderRadius: '10px',
    fontWeight: 'bold',
  },
  
  statsBtn: {
    width: '100%',
    padding: '8px',
    background: 'white',
    border: '1px solid #e0e0e0',
    borderRadius: '30px',
    fontSize: '11px',
    cursor: 'pointer',
    marginBottom: '10px',
    transition: 'all 0.2s',
  },
  
  statsPanel: {
    background: 'white',
    borderRadius: '16px',
    padding: '15px',
    marginTop: '10px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  },
  statsHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
  },
  closeStatsBtn: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    color: '#999',
  },
  statsContent: {
    maxHeight: '200px',
    overflowY: 'auto',
  },
  statsList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  statItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    fontSize: '12px',
  },
  statEmoji: {
    fontSize: '20px',
    width: '35px',
  },
  statLabel: {
    width: '70px',
    color: '#555',
  },
  statBarBg: {
    flex: 1,
    height: '8px',
    background: '#f0f0f0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  statBarFill: {
    height: '100%',
    borderRadius: '10px',
    transition: 'width 0.3s',
  },
  statCount: {
    width: '50px',
    fontSize: '11px',
    color: '#888',
  },
  noStats: {
    textAlign: 'center',
    color: '#999',
    fontSize: '12px',
    padding: '20px',
  },
  
  recentMoods: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '8px 12px',
    background: 'white',
    borderRadius: '30px',
    marginTop: '10px',
  },
  recentLabel: {
    fontSize: '10px',
    color: '#999',
  },
  recentMood: {
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'transform 0.2s',
  },
};

export default MoodTracker;