import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaGamepad, FaHeart, FaSmile, FaTrophy, FaRedo, FaPlay, FaPause, FaStar, FaArrowLeft } from 'react-icons/fa';

function Games() {
  const navigate = useNavigate();
  const [activeGame, setActiveGame] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Breathing Game
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [bubbleSize, setBubbleSize] = useState(60);
  
  // Affirmation Wheel
  const [affirmationIndex, setAffirmationIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  
  const affirmations = [
    "You are enough 🌸", "This feeling will pass 💙", "You've got this! ✨",
    "Breathe and reset 🧘", "You matter 💜", "Small steps count 🌱",
    "Be kind to yourself 🤍", "You are loved 💕"
  ];
  
  // Quotes
  const [quoteIndex, setQuoteIndex] = useState(0);
  const quotes = [
    { text: "You are braver than you believe, stronger than you seem", author: "Winnie the Pooh" },
    { text: "Believe you can and you're halfway there", author: "Theodore Roosevelt" },
    { text: "Every day may not be good, but there's good in every day", author: "Unknown" },
    { text: "You've survived 100% of your worst days", author: "Unknown" }
  ];
  
  // Gratitude Jar
  const [gratitude, setGratitude] = useState('');
  const [gratitudeList, setGratitudeList] = useState([]);
  
  // Breathing timer
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        if (breathPhase === 'inhale') {
          setBubbleSize(prev => Math.min(prev + 6, 200));
          if (bubbleSize >= 190) setBreathPhase('hold');
        } else if (breathPhase === 'hold') {
          setTimeout(() => setBreathPhase('exhale'), 800);
        } else {
          setBubbleSize(prev => Math.max(prev - 6, 60));
          if (bubbleSize <= 70) {
            setBreathPhase('inhale');
            setBreathCount(c => {
              const newCount = c + 1;
              if (newCount % 3 === 0) setScore(s => s + 10);
              return newCount;
            });
          }
        }
      }, 150);
    }
    return () => clearInterval(interval);
  }, [isBreathing, breathPhase, bubbleSize]);
  
  // Spin wheel
  const spinWheel = () => {
    if (spinning) return;
    setSpinning(true);
    let spins = 0;
    const interval = setInterval(() => {
      setAffirmationIndex(Math.floor(Math.random() * affirmations.length));
      spins++;
      if (spins > 20) {
        clearInterval(interval);
        setSpinning(false);
        setScore(s => s + 5);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
      }
    }, 50);
  };
  
  // New quote
  const newQuote = () => {
    setQuoteIndex((quoteIndex + 1) % quotes.length);
    setScore(s => s + 10);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 1500);
  };
  
  // Add gratitude
  const addGratitude = () => {
    if (gratitude.trim()) {
      setGratitudeList([{ text: gratitude, date: new Date().toLocaleDateString() }, ...gratitudeList]);
      setGratitude('');
      setScore(s => s + 15);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 2000);
    }
  };
  
  // Load high score
  useEffect(() => {
    const saved = localStorage.getItem('gameScore');
    if (saved) setHighScore(parseInt(saved));
  }, []);
  
  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      localStorage.setItem('gameScore', score);
    }
  }, [score, highScore]);
  
  const resetGame = () => {
    setScore(0);
    setBreathCount(0);
    setGratitudeList([]);
  };
  
  const gamesList = [
    { id: 'breath', name: 'Breathing Bubble', icon: '🌬️', color: '#2ecc71', desc: 'Relax with guided breathing' },
    { id: 'affirmation', name: 'Affirmation Wheel', icon: '🎡', color: '#9b59b6', desc: 'Get positive messages' },
    { id: 'quote', name: 'Comforting Quotes', icon: '💬', color: '#3498db', desc: 'Daily dose of wisdom' },
    { id: 'gratitude', name: 'Gratitude Jar', icon: '🏺', color: '#f39c12', desc: 'Write what you\'re grateful for' },
  ];
  
  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        {/* Header */}
        <div style={styles.header}>
          <h1 style={styles.title}><FaGamepad size={24} /> Calming Corner</h1>
          <p style={styles.subtitle}>Games to relax, recharge, and feel better</p>
          <div style={styles.scoreBar}>
            <div style={styles.scoreCard}>
              <FaStar color="#f1c40f" size={14} />
              <span style={styles.scoreValue}>{score}</span>
              <span style={styles.scoreLabel}>Cheer Points</span>
            </div>
            <div style={styles.scoreCard}>
              <FaTrophy color="#f39c12" size={14} />
              <span style={styles.scoreValue}>{highScore}</span>
              <span style={styles.scoreLabel}>Best Score</span>
            </div>
          </div>
        </div>
        
        {/* Game Selection */}
        {!activeGame && (
          <div style={styles.gamesGrid}>
            {gamesList.map(game => (
              <div key={game.id} style={{...styles.gameCard, borderTop: `4px solid ${game.color}`}} onClick={() => setActiveGame(game.id)}>
                <div style={styles.gameIcon}>{game.icon}</div>
                <h3 style={styles.gameName}>{game.name}</h3>
                <p style={styles.gameDesc}>{game.desc}</p>
                <button style={{...styles.playBtn, background: game.color}}>Play →</button>
              </div>
            ))}
          </div>
        )}
        
        {/* Breathing Game */}
        {activeGame === 'breath' && (
          <div style={styles.gameContainer}>
            <button onClick={() => setActiveGame(null)} style={styles.backBtn}><FaArrowLeft size={10} /> Back</button>
            <h2 style={styles.gameTitle}>🌬️ Breathing Bubble</h2>
            <div style={styles.bubbleContainer}>
              <div style={{...styles.bubble, width: bubbleSize, height: bubbleSize}}>
                <span style={styles.bubbleText}>
                  {breathPhase === 'inhale' ? 'Inhale' : breathPhase === 'hold' ? 'Hold' : 'Exhale'}
                </span>
              </div>
            </div>
            <div style={styles.breathControls}>
              {!isBreathing ? (
                <button onClick={() => setIsBreathing(true)} style={styles.startBtn}><FaPlay /> Start</button>
              ) : (
                <button onClick={() => setIsBreathing(false)} style={styles.pauseBtn}><FaPause /> Pause</button>
              )}
              <button onClick={() => { setIsBreathing(false); setBreathCount(0); setBreathPhase('inhale'); setBubbleSize(60); }} style={styles.resetBtn}><FaRedo /> Reset</button>
            </div>
            <p style={styles.gameHint}>🌿 Breaths: {breathCount} | ✨ +10 every 3 breaths</p>
          </div>
        )}
        
        {/* Affirmation Wheel */}
        {activeGame === 'affirmation' && (
          <div style={styles.gameContainer}>
            <button onClick={() => setActiveGame(null)} style={styles.backBtn}><FaArrowLeft size={10} /> Back</button>
            <h2 style={styles.gameTitle}>✨ Affirmation Wheel</h2>
            <div style={styles.wheelContainer}>
              <div style={{...styles.wheel, animation: spinning ? 'spin 0.3s linear infinite' : 'none'}}>
                <span style={styles.wheelEmoji}>🎡</span>
              </div>
              <div style={styles.affirmationCard}>
                <p style={styles.affirmationText}>{affirmations[affirmationIndex]}</p>
              </div>
            </div>
            <button onClick={spinWheel} disabled={spinning} style={styles.spinBtn}>
              {spinning ? 'Spinning...' : '🎡 Spin the Wheel'}
            </button>
            <p style={styles.gameHint}>✨ +5 Cheer Points each spin</p>
          </div>
        )}
        
        {/* Quotes Game */}
        {activeGame === 'quote' && (
          <div style={styles.gameContainer}>
            <button onClick={() => setActiveGame(null)} style={styles.backBtn}><FaArrowLeft size={10} /> Back</button>
            <h2 style={styles.gameTitle}>📖 Comforting Quotes</h2>
            <div style={styles.quoteCard}>
              <p style={styles.quoteText}>"{quotes[quoteIndex].text}"</p>
              <p style={styles.quoteAuthor}>— {quotes[quoteIndex].author}</p>
            </div>
            <button onClick={newQuote} style={styles.newQuoteBtn}>✨ New Quote ✨</button>
            <p style={styles.gameHint}>💬 +10 Cheer Points each quote</p>
          </div>
        )}
        
        {/* Gratitude Jar */}
        {activeGame === 'gratitude' && (
          <div style={styles.gameContainer}>
            <button onClick={() => setActiveGame(null)} style={styles.backBtn}><FaArrowLeft size={10} /> Back</button>
            <h2 style={styles.gameTitle}>🙏 Gratitude Jar</h2>
            <div style={styles.jar}>
              <div style={styles.jarInner}>
                {gratitudeList.slice(0, 3).map((item, i) => (
                  <div key={i} style={styles.jarNote}>✨ {item.text}</div>
                ))}
                {gratitudeList.length === 0 && <p style={styles.jarEmpty}>Your gratitude notes appear here 💙</p>}
              </div>
            </div>
            <div style={styles.gratitudeInput}>
              <input
                type="text"
                placeholder="I'm grateful for..."
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addGratitude()}
                style={styles.gratitudeField}
              />
              <button onClick={addGratitude} style={styles.addBtn}>Add</button>
            </div>
            <p style={styles.gameHint}>🌟 +15 Cheer Points each gratitude</p>
          </div>
        )}
        
        {/* Reset Button */}
        {activeGame && (
          <button onClick={resetGame} style={styles.resetAllBtn}>
            <FaRedo /> Reset Cheer Points
          </button>
        )}
        
        {/* Motivational Message */}
        <div style={styles.motivationCard}>
          <FaHeart color="#e84393" size={16} />
          <p>Taking a break to play is self-care. You deserve this moment of peace. 💙</p>
        </div>
      </div>
      
      {/* Confetti */}
      {showConfetti && (
        <div style={styles.confettiContainer}>
          {[...Array(30)].map((_, i) => (
            <div key={i} style={{...styles.confetti, left: `${Math.random() * 100}%`, backgroundColor: `hsl(${Math.random() * 360}, 70%, 60%)`}} />
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  navSpacer: { height: '52px' },
  content: { maxWidth: '550px', margin: '0 auto', padding: '0 16px 24px 16px' },
  
  header: { textAlign: 'center', marginBottom: '24px', color: 'white' },
  title: { fontSize: '24px', marginBottom: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' },
  subtitle: { fontSize: '11px', opacity: 0.9 },
  
  scoreBar: { display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '16px' },
  scoreCard: { background: 'rgba(255,255,255,0.2)', padding: '6px 12px', borderRadius: '30px', display: 'flex', alignItems: 'center', gap: '6px' },
  scoreValue: { fontSize: '16px', fontWeight: 'bold' },
  scoreLabel: { fontSize: '9px', opacity: 0.8 },
  
  gamesGrid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' },
  gameCard: { background: 'white', borderRadius: '18px', padding: '16px', textAlign: 'center', cursor: 'pointer' },
  gameIcon: { fontSize: '32px', marginBottom: '8px' },
  gameName: { fontSize: '14px', fontWeight: '600', marginBottom: '4px' },
  gameDesc: { fontSize: '10px', color: '#666', marginBottom: '10px' },
  playBtn: { padding: '5px 12px', borderRadius: '20px', border: 'none', color: 'white', cursor: 'pointer', fontSize: '10px' },
  
  gameContainer: { background: 'white', borderRadius: '20px', padding: '20px', marginBottom: '16px' },
  backBtn: { background: 'none', border: 'none', color: '#667eea', cursor: 'pointer', marginBottom: '16px', fontSize: '11px', display: 'flex', alignItems: 'center', gap: '5px' },
  gameTitle: { fontSize: '20px', marginBottom: '16px', textAlign: 'center' },
  
  bubbleContainer: { display: 'flex', justifyContent: 'center', alignItems: 'center', height: '200px' },
  bubble: { borderRadius: '50%', background: 'linear-gradient(135deg, #667eea, #764ba2)', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'width 0.15s, height 0.15s', margin: '0 auto' },
  bubbleText: { color: 'white', fontWeight: 'bold', fontSize: '12px' },
  breathControls: { display: 'flex', gap: '10px', justifyContent: 'center', marginTop: '16px' },
  startBtn: { padding: '8px 16px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' },
  pauseBtn: { padding: '8px 16px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' },
  resetBtn: { padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '11px' },
  
  wheelContainer: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px', marginBottom: '16px' },
  wheel: { width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, #f093fb, #f5576c)', display: 'flex', alignItems: 'center', justifyContent: 'center' },
  wheelEmoji: { fontSize: '40px' },
  affirmationCard: { padding: '12px', background: '#f8f9ff', borderRadius: '12px', textAlign: 'center' },
  affirmationText: { fontSize: '14px', fontWeight: '500', margin: 0 },
  spinBtn: { width: '100%', padding: '10px', background: 'linear-gradient(135deg, #667eea, #764ba2)', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', fontSize: '13px' },
  
  quoteCard: { background: '#f8f9ff', borderRadius: '16px', padding: '20px', textAlign: 'center', marginBottom: '16px' },
  quoteText: { fontSize: '14px', lineHeight: 1.4, marginBottom: '10px', fontStyle: 'italic' },
  quoteAuthor: { fontSize: '11px', color: '#999' },
  newQuoteBtn: { width: '100%', padding: '10px', background: '#3498db', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' },
  
  jar: { background: 'linear-gradient(135deg, #f39c12, #e67e22)', borderRadius: '20px', padding: '15px', marginBottom: '16px' },
  jarInner: { background: 'rgba(255,255,255,0.9)', borderRadius: '12px', padding: '12px', minHeight: '100px' },
  jarNote: { background: '#fff3cd', padding: '5px 8px', borderRadius: '8px', marginBottom: '5px', fontSize: '10px' },
  jarEmpty: { textAlign: 'center', color: '#999', fontSize: '11px', padding: '15px' },
  gratitudeInput: { display: 'flex', gap: '8px' },
  gratitudeField: { flex: 1, padding: '8px 12px', border: '1px solid #e0e0e0', borderRadius: '25px', outline: 'none', fontSize: '11px' },
  addBtn: { padding: '8px 16px', background: '#2ecc71', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer' },
  
  gameHint: { textAlign: 'center', fontSize: '10px', color: '#999', marginTop: '12px' },
  
  resetAllBtn: { width: '100%', padding: '8px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '25px', cursor: 'pointer', marginTop: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '11px' },
  
  motivationCard: { background: 'rgba(255,255,255,0.95)', borderRadius: '12px', padding: '12px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '10px', color: '#555' },
  
  confettiContainer: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, pointerEvents: 'none', zIndex: 1000 },
  confetti: { position: 'absolute', width: '8px', height: '8px', top: '-10px', animation: 'fall 3s linear forwards', opacity: 0.8 },
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
  @keyframes fall {
    0% { transform: translateY(-10px) rotate(0deg); opacity: 1; }
    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
  }
`;
document.head.appendChild(styleSheet);

export default Games;