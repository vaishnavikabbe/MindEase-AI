import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaComments, FaClock, FaHeartbeat, FaBrain, FaFire, FaCalendar, 
  FaUser, FaBook, FaUserSecret, FaChartLine, FaExclamationTriangle,
  FaCheckCircle, FaCircle, FaArrowRight, FaGamepad, FaMoon
} from 'react-icons/fa';
import Navbar from '../components/Navbar';
import MoodTracker from '../components/MoodTracker';

function Dashboard() {
  const navigate = useNavigate();
  const [userName, setUserName] = useState('');
  const [userAvatar, setUserAvatar] = useState(null);
  const [greeting, setGreeting] = useState('');
  const [selectedMood, setSelectedMood] = useState(null);
  
  const [academicItems, setAcademicItems] = useState([]);
  const [currentTip, setCurrentTip] = useState('');

  const burnoutTips = [
    "Take a 5-min break 🧘", "Sleep 7-8 hours 😴", "Drink water 💧",
    "Talk to a friend 💬", "Deep breathing 🌬️", "Step outside 🌞"
  ];

  const stats = {
    streak: 12,
    totalFocus: 245,
    habitsCompleted: 18,
    badges: 8
  };

  useEffect(() => {
    const name = localStorage.getItem('userName') || 'Friend';
    const avatar = localStorage.getItem('userAvatar');
    setUserName(name);
    setUserAvatar(avatar);
    
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('🌅 Good Morning');
    else if (hour < 18) setGreeting('☀️ Good Afternoon');
    else setGreeting('🌙 Good Evening');
    
    const savedAcademic = localStorage.getItem('academicLoad');
    if (savedAcademic) setAcademicItems(JSON.parse(savedAcademic));
    
    setCurrentTip(burnoutTips[Math.floor(Math.random() * burnoutTips.length)]);
  }, []);

  const upcomingItems = academicItems.filter(i => !i.completed).slice(0, 1);

  const quickActions = [
    { icon: <FaComments size={16} />, label: 'AI Chat', color: '#667eea', path: '/chat' },
    { icon: <FaBook size={16} />, label: 'Journal', color: '#e74c3c', path: '/journal' },
    { icon: <FaHeartbeat size={16} />, label: 'Mood History', color: '#2ecc71', path: '/mood-history' },
    { icon: <FaGamepad size={16} />, label: 'Games', color: '#f39c12', path: '/games' },
    { icon: <FaMoon size={16} />, label: 'Sleep Mode', color: '#8e44ad', path: '/sleep' },
  ];

  const inspirationalQuotes = [
    { quote: "You are stronger than you think", author: "MindEase" },
    { quote: "One small step at a time", author: "MindEase" },
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        {/* Welcome Card */}
        <div style={styles.welcomeCard}>
          <div style={styles.welcomeContent}>
            <div style={styles.userInfoContainer}>
              <div style={styles.avatarContainer}>
                {userAvatar ? (
                  <img src={userAvatar} alt="Avatar" style={styles.userAvatar} />
                ) : (
                  <div style={styles.avatarPlaceholder}>
                    <FaUser size={14} color="#fff" />
                  </div>
                )}
              </div>
              <div>
                <h2 style={styles.greeting}>{greeting}, {userName}! 👋</h2>
                <p style={styles.welcomeText}>Ready to nurture your wellness?</p>
              </div>
            </div>
            <div style={styles.streakBadge}>
              <FaFire color="#e74c3c" size={12} />
              <span style={styles.streakNumber}>{stats.streak}</span>
              <span style={styles.streakText}>🔥day streak</span>
            </div>
          </div>
          <div style={styles.quoteBox}>
            <p style={styles.quoteText}>✨ "{randomQuote.quote}"</p>
          </div>
        </div>

        {/* Stats Row - 2x2 Grid */}
        <div style={styles.statsRow}>
          <div style={styles.statTile}>
            <div style={styles.statValue}>{stats.streak}</div>
            <div style={styles.statLabel}>🔥Day Streak</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValue}>{stats.totalFocus}</div>
            <div style={styles.statLabel}>⏰Focus Min</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValue}>{stats.habitsCompleted}</div>
            <div style={styles.statLabel}>🌱Habits</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValue}>{stats.badges}</div>
            <div style={styles.statLabel}>🎖️Badges</div>
          </div>
        </div>

        {/* Three Cards - Side by Side (3 columns) */}
        <div style={styles.threeCardsRow}>
          
          {/* Academic Load Card */}
          <div style={styles.smallCard} onClick={() => navigate('/academic-load')}>
            <div style={styles.smallCardHeader}>
              <span style={styles.smallCardIcon}>📚</span>
              <FaArrowRight size={8} color="#667eea" />
            </div>
            <div style={styles.smallCardTitle}>Academic</div>
            {upcomingItems.length === 0 ? (
              <div style={styles.smallCardBadge}>No tasks</div>
            ) : (
              <div style={styles.smallCardBadge}>{upcomingItems[0].title.substring(0, 10)}</div>
            )}
          </div>

          {/* Burnout Check Card */}
          <div style={styles.smallCard} onClick={() => navigate('/burnout')}>
            <div style={styles.smallCardHeader}>
              <span style={styles.smallCardIcon}>🔥</span>
              <FaArrowRight size={8} color="#667eea" />
            </div>
            <div style={styles.smallCardTitle}>Burnout</div>
            <div style={styles.smallCardBadge}>Check →</div>
          </div>

          {/* Anonymous Card */}
          <div style={styles.smallCard} onClick={() => navigate('/anonymous')}>
            <div style={styles.smallCardHeader}>
              <span style={styles.smallCardIcon}>🔒</span>
              <FaArrowRight size={8} color="#667eea" />
            </div>
            <div style={styles.smallCardTitle}>Anonymous</div>
            <div style={styles.smallCardBadge}>Chat →</div>
          </div>
        </div>

        {/* Mood Tracker */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>🎭 How are you feeling?</h3>
          </div>
          <MoodTracker selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        </div>

        {/* Quick Actions - 2x2 Grid (Now 5 items, will wrap) */}
        <div style={styles.actionGrid}>
          {quickActions.map((action, index) => (
            <div
              key={index}
              style={styles.compactActionCard}
              onClick={() => navigate(action.path)}
            >
              <div style={{...styles.compactActionIcon, background: `${action.color}12`, color: action.color}}>
                {action.icon}
              </div>
              <span style={styles.compactActionLabel}>{action.label}</span>
            </div>
          ))}
        </div>

        {/* Emergency Banner */}
        <div style={styles.emergencyBanner}>
          <span>🚨 24/7 Support</span>
          <button style={styles.emergencyBtn} onClick={() => navigate('/emergency')}>
            Get Help →
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: '#f5f7fa',
  },
  navSpacer: {
    height: '52px',
  },
  content: {
    maxWidth: '100%',
    margin: '0 auto',
    padding: '12px',
  },
  
  // Welcome Card
  welcomeCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '14px 16px',
    color: 'white',
    marginBottom: '16px',
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarContainer: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    overflow: 'hidden',
    border: '2px solid white',
  },
  userAvatar: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    background: 'rgba(255,255,255,0.25)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: '14px',
    marginBottom: '2px',
    fontWeight: '600',
  },
  welcomeText: {
    opacity: 0.85,
    fontSize: '10px',
  },
  streakBadge: {
    background: 'rgba(255,255,255,0.2)',
    padding: '6px 12px',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
  },
  streakNumber: {
    fontSize: '14px',
    fontWeight: 'bold',
  },
  streakText: {
    fontSize: '9px',
  },
  quoteBox: {
    background: 'rgba(255,255,255,0.1)',
    padding: '8px 10px',
    borderRadius: '10px',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: '11px',
    fontStyle: 'italic',
    margin: 0,
  },
  
  // Stats Row - 2x2 Grid
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
    marginBottom: '16px',
  },
  statTile: {
    background: 'white',
    borderRadius: '12px',
    padding: '12px 8px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  statValue: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: '10px',
    color: '#888',
    marginTop: '4px',
  },

  // Three Cards - Side by Side (3 columns)
  threeCardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '16px',
  },
  smallCard: {
    background: 'white',
    borderRadius: '14px',
    padding: '12px 8px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
    textAlign: 'center',
  },
  smallCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  smallCardIcon: {
    fontSize: '24px',
  },
  smallCardTitle: {
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '8px',
  },
  smallCardBadge: {
    fontSize: '9px',
    color: '#667eea',
    background: '#f0f0ff',
    padding: '3px 6px',
    borderRadius: '10px',
    display: 'inline-block',
  },

  section: {
    marginBottom: '16px',
  },
  sectionHeader: {
    marginBottom: '10px',
  },
  sectionTitle: {
    fontSize: '14px',
    fontWeight: '600',
    color: '#333',
  },
  
  // Quick Actions - 2x2 Grid (auto-wrap)
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginBottom: '16px',
  },
  compactActionCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '14px 10px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  compactActionIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 8px',
  },
  compactActionLabel: {
    fontSize: '11px',
    fontWeight: '500',
    color: '#555',
  },
  
  // Emergency Banner
  emergencyBanner: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    borderRadius: '12px',
    padding: '10px 14px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '11px',
  },
  emergencyBtn: {
    background: 'white',
    color: '#ee5a24',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '25px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '10px',
  },
};

export default Dashboard;