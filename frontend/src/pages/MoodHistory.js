import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FaCalendarAlt, FaChartLine, FaSmile, FaMeh, FaFrown, FaAngry, FaGrinStars, FaSadTear } from 'react-icons/fa';

function MoodHistory() {
  const [moodHistory, setMoodHistory] = useState([]);
  const [view, setView] = useState('week'); // week, month

  const moods = {
    excellent: { emoji: <FaGrinStars size={20} />, label: 'Excellent', color: '#2ecc71' },
    good: { emoji: <FaSmile size={20} />, label: 'Good', color: '#3498db' },
    okay: { emoji: <FaMeh size={20} />, label: 'Okay', color: '#f39c12' },
    low: { emoji: <FaFrown size={20} />, label: 'Low', color: '#e67e22' },
    sad: { emoji: <FaSadTear size={20} />, label: 'Sad', color: '#e74c3c' },
    stressed: { emoji: <FaAngry size={20} />, label: 'Stressed', color: '#c0392b' },
  };

  useEffect(() => {
    loadMoodHistory();
  }, []);

  const loadMoodHistory = () => {
    const saved = localStorage.getItem('moodHistory');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          setMoodHistory(parsed.reverse());
        }
      } catch (e) {
        console.error('Error loading mood history:', e);
      }
    }
  };

  const getMoodData = (moodValue) => {
    return moods[moodValue] || { emoji: '📝', label: moodValue, color: '#999' };
  };

  const getAverageMood = () => {
    const scores = { excellent: 5, good: 4, okay: 3, low: 2, sad: 1, stressed: 1 };
    const total = moodHistory.reduce((sum, entry) => sum + (scores[entry.mood] || 3), 0);
    const avg = total / (moodHistory.length || 1);
    if (avg >= 4.5) return { text: 'Excellent', emoji: '🌟', color: '#2ecc71' };
    if (avg >= 3.5) return { text: 'Good', emoji: '😊', color: '#3498db' };
    if (avg >= 2.5) return { text: 'Okay', emoji: '😐', color: '#f39c12' };
    if (avg >= 1.5) return { text: 'Low', emoji: '😔', color: '#e67e22' };
    return { text: 'Needs Attention', emoji: '💙', color: '#e74c3c' };
  };

  const averageMood = getAverageMood();
  const filteredHistory = moodHistory;

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📊 Mood History</h1>
          <p style={styles.subtitle}>Track your emotional journey</p>
        </div>

        {/* Stats Summary */}
        <div style={styles.statsCard}>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{moodHistory.length}</span>
            <span style={styles.statLabel}>Total Entries</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{averageMood.emoji}</span>
            <span style={styles.statLabel}>Average Mood</span>
          </div>
          <div style={styles.statItem}>
            <span style={styles.statValue}>{averageMood.text}</span>
            <span style={styles.statLabel}>Overall</span>
          </div>
        </div>

        {/* Mood Timeline */}
        <div style={styles.timelineCard}>
          <h3 style={styles.timelineTitle}>📅 Mood Timeline</h3>
          {filteredHistory.length === 0 ? (
            <div style={styles.emptyState}>
              <p>No mood data yet. Start tracking your mood from the dashboard!</p>
            </div>
          ) : (
            <div style={styles.timeline}>
              {filteredHistory.map((entry, index) => {
                const moodData = getMoodData(entry.mood);
                return (
                  <div key={index} style={styles.timelineItem}>
                    <div style={styles.timelineDate}>
                      {new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </div>
                    <div style={{...styles.timelineMood, background: `${moodData.color}15`, borderColor: moodData.color}}>
                      <span style={styles.timelineEmoji}>{moodData.emoji}</span>
                      <span style={styles.timelineLabel}>{moodData.label}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
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
    maxWidth: '600px',
    margin: '0 auto',
    padding: '0 16px 24px 16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    marginBottom: '6px',
  },
  subtitle: {
    fontSize: '12px',
    opacity: 0.8,
  },
  statsCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    textAlign: 'center',
  },
  statItem: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: '11px',
    color: '#888',
  },
  timelineCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
  },
  timelineTitle: {
    fontSize: '16px',
    marginBottom: '16px',
    color: '#333',
  },
  timeline: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  timelineItem: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '10px',
    background: '#f8f9ff',
    borderRadius: '12px',
  },
  timelineDate: {
    width: '100px',
    fontSize: '12px',
    color: '#666',
  },
  timelineMood: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '6px 12px',
    borderRadius: '20px',
    border: '1px solid',
  },
  timelineEmoji: {
    fontSize: '18px',
  },
  timelineLabel: {
    fontSize: '12px',
    fontWeight: '500',
  },
  emptyState: {
    textAlign: 'center',
    padding: '40px',
    color: '#999',
  },
};

export default MoodHistory;