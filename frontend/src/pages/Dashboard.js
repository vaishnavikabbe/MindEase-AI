import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FaComments, FaClock, FaHeartbeat, FaBrain, FaFire, FaCalendar, 
  FaUser, FaBook, FaUserSecret, FaChartLine, FaExclamationTriangle,
  FaCheckCircle, FaCircle, FaArrowRight, FaGamepad
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

  const upcomingItems = academicItems.filter(i => !i.completed).slice(0, 2);

  const quickActions = [
    { icon: <FaComments size={14} />, label: 'AI Chat', color: '#667eea', path: '/chat' },
    { icon: <FaBook size={14} />, label: 'Journal', color: '#e74c3c', path: '/journal' },
    { icon: <FaHeartbeat size={14} />, label: 'Mood History', color: '#2ecc71', path: '/mood-history' },
    { icon: <FaGamepad size={14} />, label: 'Games', color: '#f39c12', path: '/games' },
  ];

  const inspirationalQuotes = [
    { quote: "You are stronger than you think", author: "MindEase" },
    { quote: "One small step at a time", author: "MindEase" },
  ];

  const randomQuote = inspirationalQuotes[Math.floor(Math.random() * inspirationalQuotes.length)];

  return (
    <div style={styles.container}>
      <Navbar />
      
      {/* Spacer div to prevent content from hiding under navbar */}
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
              <span style={styles.streakText}>day streak</span>
            </div>
          </div>
          <div style={styles.quoteBox}>
            <p style={styles.quoteText}>✨ "{randomQuote.quote}"</p>
          </div>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statTile}>
            <div style={styles.statValueSmall}>{stats.streak}</div>
            <div style={styles.statLabelSmall}>🔥Day Streak</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueSmall}>{stats.totalFocus}</div>
            <div style={styles.statLabelSmall}>⏰Focus Min</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueSmall}>{stats.habitsCompleted}</div>
            <div style={styles.statLabelSmall}>🌱Habits</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueSmall}>{stats.badges}</div>
            <div style={styles.statLabelSmall}>🎖️Badges</div>
          </div>
        </div>

        {/* Three Compact Cards */}
        <div style={styles.threeCardsRow}>
          
          <div style={styles.compactCard} onClick={() => navigate('/academic-load')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>📚</span>
              <span style={styles.compactCardTitle}>Academic</span>
              <FaArrowRight size={10} color="#667eea" />
            </div>
            {upcomingItems.length === 0 ? (
              <p style={styles.compactCardEmpty}>No tasks</p>
            ) : (
              upcomingItems.map(item => (
                <div key={item.id} style={styles.compactTask}>
                  <span>{item.type === 'exam' ? '📝' : '📄'}</span>
                  <span style={styles.compactTaskTitle}>{item.title}</span>
                </div>
              ))
            )}
            <div style={styles.compactCardFooter}>
              <span>View all →</span>
            </div>
          </div>

          <div style={styles.compactCard} onClick={() => navigate('/burnout')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>🔥</span>
              <span style={styles.compactCardTitle}>Burnout</span>
              <FaArrowRight size={10} color="#667eea" />
            </div>
            <div style={styles.compactTip}>
              <span>💡 {currentTip}</span>
            </div>
            <div style={styles.compactCardFooter}>
              <span>Check →</span>
            </div>
          </div>

          <div style={styles.compactCard} onClick={() => navigate('/anonymous')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>🔒</span>
              <span style={styles.compactCardTitle}>Anonymous</span>
              <FaArrowRight size={10} color="#667eea" />
            </div>
            <div style={styles.compactAnonymous}>
              <span>Share anonymously</span>
              <span style={styles.compactBadge}>Private</span>
            </div>
            <div style={styles.compactCardFooter}>
              <span>Chat →</span>
            </div>
          </div>
        </div>

        {/* Mood Tracker */}
        <div style={styles.section}>
          <div style={styles.sectionHeader}>
            <h3 style={styles.sectionTitle}>🎭 How are you feeling?</h3>
          </div>
          <MoodTracker selectedMood={selectedMood} setSelectedMood={setSelectedMood} />
        </div>

        {/* Quick Actions */}
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
          <span>🚨 24/7 Support Available</span>
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
  // IMPORTANT: This spacer prevents content from hiding under fixed navbar
  navSpacer: {
    height: '52px',  // Same height as navbar
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 16px 20px 16px',
  },
  
  // Welcome Card
  welcomeCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '14px',
    padding: '12px 16px',
    color: 'white',
    marginBottom: '15px',
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
    flexWrap: 'wrap',
    gap: '8px',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  avatarContainer: {
    width: '36px',
    height: '36px',
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
    padding: '4px 10px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  streakNumber: {
    fontSize: '13px',
    fontWeight: 'bold',
  },
  streakText: {
    fontSize: '9px',
  },
  quoteBox: {
    background: 'rgba(255,255,255,0.1)',
    padding: '6px 10px',
    borderRadius: '8px',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: '11px',
    fontStyle: 'italic',
    margin: 0,
  },
  
  // Stats Row
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '15px',
  },
  statTile: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px 4px',
    textAlign: 'center',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  statValueSmall: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabelSmall: {
    fontSize: '9px',
    color: '#888',
  },

  // Three Compact Cards
  threeCardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '15px',
  },
  compactCard: {
    background: 'white',
    borderRadius: '12px',
    padding: '10px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  compactCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    marginBottom: '8px',
    fontSize: '12px',
    fontWeight: '600',
    color: '#333',
  },
  compactCardIcon: {
    fontSize: '14px',
  },
  compactCardTitle: {
    flex: 1,
    fontSize: '12px',
  },
  compactCardEmpty: {
    fontSize: '10px',
    color: '#999',
    textAlign: 'center',
    padding: '10px 0',
    margin: 0,
  },
  compactTask: {
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    padding: '4px 0',
    fontSize: '10px',
    borderBottom: '1px solid #f0f0f0',
  },
  compactTaskTitle: {
    fontSize: '10px',
    color: '#555',
  },
  compactTip: {
    padding: '8px 0',
    fontSize: '10px',
    color: '#667eea',
    textAlign: 'center',
  },
  compactAnonymous: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    padding: '8px 0',
    fontSize: '10px',
  },
  compactBadge: {
    fontSize: '8px',
    background: '#e8f5e9',
    padding: '2px 6px',
    borderRadius: '10px',
    color: '#2ecc71',
  },
  compactCardFooter: {
    marginTop: '8px',
    paddingTop: '6px',
    borderTop: '1px solid #f0f0f0',
    fontSize: '9px',
    color: '#667eea',
    textAlign: 'center',
  },

  section: {
    marginBottom: '15px',
  },
  sectionHeader: {
    marginBottom: '8px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
  },
  
  // Quick Actions
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    marginBottom: '15px',
  },
  compactActionCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
  },
  compactActionIcon: {
    width: '30px',
    height: '30px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 5px',
  },
  compactActionLabel: {
    fontSize: '10px',
    fontWeight: '500',
    color: '#555',
  },
  
  // Emergency Banner
  emergencyBanner: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    borderRadius: '10px',
    padding: '8px 12px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '10px',
  },
  emergencyBtn: {
    background: 'white',
    color: '#ee5a24',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '10px',
  },
};

export default Dashboard;