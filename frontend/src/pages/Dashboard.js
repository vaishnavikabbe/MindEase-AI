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
    { icon: <FaComments size={18} />, label: 'AI Chat', color: '#667eea', path: '/chat' },
    { icon: <FaBook size={18} />, label: 'Journal', color: '#e74c3c', path: '/journal' },
    { icon: <FaHeartbeat size={18} />, label: 'Mood History', color: '#2ecc71', path: '/mood-history' },
    { icon: <FaGamepad size={18} />, label: 'Games', color: '#f39c12', path: '/games' },
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
                    <FaUser size={16} color="#fff" />
                  </div>
                )}
              </div>
              <div>
                <h2 style={styles.greeting}>{greeting}, {userName}! 👋</h2>
                <p style={styles.welcomeText}>Ready to nurture your wellness?</p>
              </div>
            </div>
            <div style={styles.streakBadge}>
              <FaFire color="#e74c3c" size={14} />
              <span style={styles.streakNumber}>{stats.streak}</span>
              <span style={styles.streakText}>day streak</span>
            </div>
          </div>
          <div style={styles.quoteBox}>
            <p style={styles.quoteText}>✨ "{randomQuote.quote}"</p>
          </div>
        </div>

        {/* Stats Row - Bigger */}
        <div style={styles.statsRow}>
          <div style={styles.statTile}>
            <div style={styles.statValueBig}>{stats.streak}</div>
            <div style={styles.statLabelBig}>Day Streak</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueBig}>{stats.totalFocus}</div>
            <div style={styles.statLabelBig}>Focus Minutes</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueBig}>{stats.habitsCompleted}</div>
            <div style={styles.statLabelBig}>Habits Done</div>
          </div>
          <div style={styles.statTile}>
            <div style={styles.statValueBig}>{stats.badges}</div>
            <div style={styles.statLabelBig}>Badges</div>
          </div>
        </div>

        {/* Three Bigger Cards */}
        <div style={styles.threeCardsRow}>
          
          <div style={styles.compactCard} onClick={() => navigate('/academic-load')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>📚</span>
              <span style={styles.compactCardTitle}>Academic Load</span>
              <FaArrowRight size={12} color="#667eea" />
            </div>
            {upcomingItems.length === 0 ? (
              <p style={styles.compactCardEmpty}>No pending tasks</p>
            ) : (
              upcomingItems.map(item => (
                <div key={item.id} style={styles.compactTask}>
                  <span>{item.type === 'exam' ? '📝' : '📄'}</span>
                  <span style={styles.compactTaskTitle}>{item.title}</span>
                </div>
              ))
            )}
            <div style={styles.compactCardFooter}>
              <span>View all tasks →</span>
            </div>
          </div>

          <div style={styles.compactCard} onClick={() => navigate('/burnout')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>🔥</span>
              <span style={styles.compactCardTitle}>Burnout Check</span>
              <FaArrowRight size={12} color="#667eea" />
            </div>
            <div style={styles.compactTip}>
              <span>💡 {currentTip}</span>
            </div>
            <div style={styles.compactCardFooter}>
              <span>Take assessment →</span>
            </div>
          </div>

          <div style={styles.compactCard} onClick={() => navigate('/anonymous')}>
            <div style={styles.compactCardHeader}>
              <span style={styles.compactCardIcon}>🔒</span>
              <span style={styles.compactCardTitle}>Anonymous Support</span>
              <FaArrowRight size={12} color="#667eea" />
            </div>
            <div style={styles.compactAnonymous}>
              <span>Share anonymously</span>
              <span style={styles.compactBadge}>100% Private</span>
            </div>
            <div style={styles.compactCardFooter}>
              <span>Start chatting →</span>
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

        {/* Quick Actions - Bigger */}
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
  navSpacer: {
    height: '52px',
  },
  content: {
    maxWidth: '1000px',
    margin: '0 auto',
    padding: '0 16px 20px 16px',
  },
  
  // Welcome Card
  welcomeCard: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '16px',
    padding: '20px 24px',
    color: 'white',
    marginBottom: '20px',
  },
  welcomeContent: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  userInfoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
  },
  avatarContainer: {
    width: '45px',
    height: '45px',
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
    fontSize: '18px',
    marginBottom: '4px',
    fontWeight: '600',
  },
  welcomeText: {
    opacity: 0.85,
    fontSize: '12px',
  },
  streakBadge: {
    background: 'rgba(255,255,255,0.2)',
    padding: '8px 16px',
    borderRadius: '30px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  streakNumber: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  streakText: {
    fontSize: '11px',
  },
  quoteBox: {
    background: 'rgba(255,255,255,0.12)',
    padding: '10px 14px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  quoteText: {
    fontSize: '13px',
    fontStyle: 'italic',
    marginBottom: '3px',
  },
  quoteAuthor: {
    fontSize: '10px',
    opacity: 0.8,
  },
  
  // Stats Row - Bigger
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '25px',
  },
  statTile: {
    background: 'white',
    borderRadius: '14px',
    padding: '16px 10px',
    textAlign: 'center',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  statValueBig: {
    fontSize: '28px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabelBig: {
    fontSize: '12px',
    color: '#888',
    marginTop: '5px',
  },

  // Three Bigger Cards
  threeCardsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '16px',
    marginBottom: '25px',
  },
  compactCard: {
    background: 'white',
    borderRadius: '16px',
    padding: '18px',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  compactCardHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '12px',
    fontSize: '15px',
    fontWeight: '600',
    color: '#333',
  },
  compactCardIcon: {
    fontSize: '22px',
  },
  compactCardTitle: {
    flex: 1,
    fontSize: '14px',
  },
  compactCardEmpty: {
    fontSize: '12px',
    color: '#999',
    textAlign: 'center',
    padding: '15px 0',
    margin: 0,
  },
  compactTask: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 0',
    fontSize: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  compactTaskTitle: {
    fontSize: '12px',
    color: '#555',
  },
  compactTip: {
    padding: '12px 0',
    fontSize: '12px',
    color: '#667eea',
    textAlign: 'center',
  },
  compactAnonymous: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 0',
    fontSize: '12px',
  },
  compactBadge: {
    fontSize: '10px',
    background: '#e8f5e9',
    padding: '4px 10px',
    borderRadius: '20px',
    color: '#2ecc71',
  },
  compactCardFooter: {
    marginTop: '12px',
    paddingTop: '10px',
    borderTop: '1px solid #f0f0f0',
    fontSize: '11px',
    color: '#667eea',
    textAlign: 'center',
  },

  section: {
    marginBottom: '25px',
  },
  sectionHeader: {
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '16px',
    fontWeight: '600',
    color: '#333',
  },
  
  // Quick Actions - Bigger
  actionGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '15px',
    marginBottom: '25px',
  },
  compactActionCard: {
    background: 'white',
    borderRadius: '14px',
    padding: '16px 12px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
  },
  compactActionIcon: {
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 10px',
  },
  compactActionLabel: {
    fontSize: '13px',
    fontWeight: '500',
    color: '#333',
  },
  
  // Emergency Banner
  emergencyBanner: {
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
    borderRadius: '14px',
    padding: '14px 20px',
    color: 'white',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    fontSize: '13px',
  },
  emergencyBtn: {
    background: 'white',
    color: '#ee5a24',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '30px',
    fontWeight: 'bold',
    cursor: 'pointer',
    fontSize: '12px',
  },
};

export default Dashboard;