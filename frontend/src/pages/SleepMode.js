import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaMoon, FaSun, FaVolumeUp, FaVolumeMute, FaBed, 
  FaLeaf, FaWater, FaCloudRain, FaFire, FaTree, 
  FaHeadphones, FaBell, FaClock, FaHeartbeat,
  FaPlay, FaPause, FaStop, FaArrowLeft, FaStar
} from 'react-icons/fa';

function SleepMode() {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);
  const [selectedSound, setSelectedSound] = useState(null);
  const [volume, setVolume] = useState(50);
  const [isMuted, setIsMuted] = useState(false);
  const [timerMinutes, setTimerMinutes] = useState(30);
  const [timeLeft, setTimeLeft] = useState(null);
  const [breathPhase, setBreathPhase] = useState('inhale');
  const [breathCount, setBreathCount] = useState(0);
  const [isBreathing, setIsBreathing] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [showStars, setShowStars] = useState(true);
  const audioRef = useRef(null);

  // Sound library
  const sounds = [
    { id: 'rain', name: 'Gentle Rain', icon: <FaCloudRain size={24} />, color: '#4a90e2', url: 'https://www.soundjay.com/nature/sounds/rain-on-umbrella-01.mp3' },
    { id: 'ocean', name: 'Ocean Waves', icon: <FaWater size={24} />, color: '#2ecc71', url: 'https://www.soundjay.com/nature/sounds/ocean-waves-01.mp3' },
    { id: 'forest', name: 'Forest Ambience', icon: <FaTree size={24} />, color: '#27ae60', url: 'https://www.soundjay.com/nature/sounds/birds-chirping-01.mp3' },
    { id: 'fireplace', name: 'Fireplace', icon: <FaFire size={24} />, color: '#e67e22', url: 'https://www.soundjay.com/nature/sounds/fireplace-01.mp3' },
    { id: 'thunder', name: 'Thunderstorm', icon: <FaCloudRain size={24} />, color: '#34495e', url: 'https://www.soundjay.com/nature/sounds/thunder-and-rain-01.mp3' },
    { id: 'lofi', name: 'Lo-fi Sleep', icon: <FaHeadphones size={24} />, color: '#9b59b6', url: 'https://www.soundjay.com/misc/sounds/lofi-beat-01.mp3' },
  ];

  // Breathing sequence
  useEffect(() => {
    let interval;
    if (isBreathing) {
      interval = setInterval(() => {
        setBreathPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          if (prev === 'exhale') {
            setBreathCount(c => c + 1);
            return 'inhale';
          }
          return 'inhale';
        });
      }, 4000);
    }
    return () => clearInterval(interval);
  }, [isBreathing]);

  // Sleep timer
  useEffect(() => {
    let timer;
    if (timeLeft !== null && timeLeft > 0) {
      timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 60000);
    } else if (timeLeft === 0) {
      stopSound();
      setIsBreathing(false);
      alert('✨ Sleep mode completed. Goodnight! ✨');
    }
    return () => clearTimeout(timer);
  }, [timeLeft]);

  // Play sound
  const playSound = (sound) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    setSelectedSound(sound);
    const audio = new Audio(sound.url);
    audio.loop = true;
    audio.volume = volume / 100;
    audio.play();
    audioRef.current = audio;
    setIsActive(true);
    
    // Start breathing guide
    setIsBreathing(true);
  };

  const stopSound = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
    setIsActive(false);
    setSelectedSound(null);
    setIsBreathing(false);
    setBreathPhase('inhale');
  };

  const adjustVolume = (newVolume) => {
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume / 100;
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? volume / 100 : 0;
    }
  };

  const startSleepTimer = () => {
    setTimeLeft(timerMinutes);
  };

  const cancelTimer = () => {
    setTimeLeft(null);
  };

  const getBreathText = () => {
    if (breathPhase === 'inhale') return 'Breathe In... 🌬️';
    if (breathPhase === 'hold') return 'Hold... ⏸️';
    return 'Breathe Out... 💨';
  };

  const stars = [...Array(100)].map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    top: Math.random() * 100,
    size: Math.random() * 3 + 1,
    delay: Math.random() * 5
  }));

  return (
    <div style={{...styles.container, background: darkMode ? 'linear-gradient(135deg, #0a0a2a 0%, #1a1a3a 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'}}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      {/* Animated Stars */}
      {showStars && (
        <div style={styles.starsContainer}>
          {stars.map(star => (
            <div
              key={star.id}
              style={{
                ...styles.star,
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: `${star.size}px`,
                height: `${star.size}px`,
                animationDelay: `${star.delay}s`
              }}
            />
          ))}
        </div>
      )}

      <div style={styles.content}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
          <FaArrowLeft size={12} /> Back to Home
        </button>

        {/* Main Sleep Mode Card */}
        <div style={styles.sleepCard}>
          <div style={styles.sleepHeader}>
            <FaMoon size={28} color="#f1c40f" />
            <h1 style={styles.sleepTitle}>Sleep & Calm Mode</h1>
            <button onClick={() => setDarkMode(!darkMode)} style={styles.themeBtn}>
              {darkMode ? <FaSun size={16} /> : <FaMoon size={16} />}
            </button>
          </div>
          <p style={styles.sleepSubtitle}>Find your peace, drift into tranquility</p>

          {/* Breathing Orb */}
          <div style={styles.breathingContainer}>
            <div style={{...styles.breathingOrb, transform: `scale(${breathPhase === 'inhale' ? 1.3 : breathPhase === 'exhale' ? 0.8 : 1.1})`, transition: 'transform 4s ease-in-out'}}>
              <div style={styles.orbInner}>
                <FaHeartbeat size={40} color="#fff" />
              </div>
            </div>
            <div style={styles.breathText}>{getBreathText()}</div>
            <div style={styles.breathCount}>Breaths: {breathCount}</div>
            <button onClick={() => setIsBreathing(!isBreathing)} style={styles.breathToggle}>
              {isBreathing ? 'Pause' : 'Start'} Breathing
            </button>
          </div>

          {/* Sound Library */}
          <div style={styles.soundSection}>
            <h3 style={styles.sectionTitle}>🎵 Calming Sounds</h3>
            <div style={styles.soundGrid}>
              {sounds.map(sound => (
                <div
                  key={sound.id}
                  style={{...styles.soundCard, background: selectedSound?.id === sound.id ? `${sound.color}20` : 'rgba(255,255,255,0.1)', borderColor: selectedSound?.id === sound.id ? sound.color : 'rgba(255,255,255,0.2)'}}
                  onClick={() => playSound(sound)}
                >
                  <div style={{...styles.soundIcon, color: sound.color}}>{sound.icon}</div>
                  <div style={styles.soundName}>{sound.name}</div>
                  {selectedSound?.id === sound.id && (
                    <div style={styles.playingIndicator}>
                      <div style={styles.wave}></div>
                      <div style={styles.wave}></div>
                      <div style={styles.wave}></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Volume Control */}
          {selectedSound && (
            <div style={styles.volumeControl}>
              <button onClick={toggleMute} style={styles.muteBtn}>
                {isMuted ? <FaVolumeMute size={18} /> : <FaVolumeUp size={18} />}
              </button>
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => adjustVolume(e.target.value)}
                style={styles.volumeSlider}
              />
              <span style={styles.volumeValue}>{volume}%</span>
              <button onClick={stopSound} style={styles.stopBtn}>
                <FaStop size={14} /> Stop
              </button>
            </div>
          )}

          {/* Sleep Timer */}
          <div style={styles.timerSection}>
            <h3 style={styles.sectionTitle}>⏰ Sleep Timer</h3>
            <div style={styles.timerControls}>
              {[15, 30, 45, 60].map(mins => (
                <button
                  key={mins}
                  onClick={() => setTimerMinutes(mins)}
                  style={{...styles.timerBtn, background: timerMinutes === mins ? '#667eea' : 'rgba(255,255,255,0.1)'}}
                >
                  {mins} min
                </button>
              ))}
            </div>
            {timeLeft !== null ? (
              <div style={styles.activeTimer}>
                <FaClock size={16} />
                <span>Time left: {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span>
                <button onClick={cancelTimer} style={styles.cancelTimerBtn}>Cancel</button>
              </div>
            ) : (
              <button onClick={startSleepTimer} style={styles.startTimerBtn}>
                Start {timerMinutes} min Timer
              </button>
            )}
          </div>

          {/* Bedtime Reminder */}
          <div style={styles.reminderCard}>
            <FaBell size={14} color="#f1c40f" />
            <span>Set a bedtime reminder to build a healthy sleep routine</span>
            <button style={styles.reminderBtn}>Set Reminder</button>
          </div>
        </div>

        {/* Daily Affirmation */}
        <div style={styles.affirmationCard}>
          <FaStar size={16} color="#f1c40f" />
          <p style={styles.affirmationText}>
            "You have done enough today. Rest is not a reward, it's a necessity. Let go of what you cannot control and sink into the peace of this moment."
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    transition: 'background 0.5s ease',
    position: 'relative',
    overflowX: 'hidden',
  },
  navSpacer: { height: '52px' },
  starsContainer: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: 'none',
    zIndex: 0,
  },
  star: {
    position: 'absolute',
    background: 'white',
    borderRadius: '50%',
    animation: 'twinkle 3s infinite',
    opacity: 0.6,
  },
  content: {
    maxWidth: '550px',
    margin: '0 auto',
    padding: '12px',
    position: 'relative',
    zIndex: 1,
  },
  backBtn: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    color: 'white',
    padding: '8px 14px',
    borderRadius: '25px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    marginBottom: '16px',
    backdropFilter: 'blur(10px)',
  },
  sleepCard: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(20px)',
    borderRadius: '30px',
    padding: '24px',
    marginBottom: '20px',
    border: '1px solid rgba(255,255,255,0.15)',
    boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  },
  sleepHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  sleepTitle: {
    fontSize: '24px',
    color: 'white',
    margin: 0,
  },
  themeBtn: {
    background: 'rgba(255,255,255,0.15)',
    border: 'none',
    borderRadius: '50%',
    width: '36px',
    height: '36px',
    cursor: 'pointer',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sleepSubtitle: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: '13px',
    marginBottom: '24px',
  },
  breathingContainer: {
    textAlign: 'center',
    padding: '20px',
    background: 'rgba(255,255,255,0.05)',
    borderRadius: '30px',
    marginBottom: '24px',
  },
  breathingOrb: {
    width: '120px',
    height: '120px',
    background: 'linear-gradient(135deg, #667eea, #764ba2)',
    borderRadius: '50%',
    margin: '0 auto 20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 30px rgba(102,126,234,0.5)',
  },
  orbInner: {
    width: '80px',
    height: '80px',
    background: 'rgba(255,255,255,0.2)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  breathText: {
    fontSize: '18px',
    fontWeight: '600',
    color: 'white',
    marginBottom: '8px',
  },
  breathCount: {
    fontSize: '12px',
    color: 'rgba(255,255,255,0.6)',
    marginBottom: '12px',
  },
  breathToggle: {
    background: '#667eea',
    border: 'none',
    padding: '8px 20px',
    borderRadius: '25px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },
  soundSection: {
    marginBottom: '24px',
  },
  sectionTitle: {
    fontSize: '16px',
    color: 'white',
    marginBottom: '12px',
  },
  soundGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
  },
  soundCard: {
    padding: '14px',
    borderRadius: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    transition: 'all 0.2s',
    border: '1px solid',
  },
  soundIcon: {
    fontSize: '28px',
    marginBottom: '6px',
  },
  soundName: {
    fontSize: '11px',
    color: 'white',
  },
  playingIndicator: {
    display: 'flex',
    justifyContent: 'center',
    gap: '3px',
    marginTop: '8px',
  },
  wave: {
    width: '3px',
    height: '8px',
    background: '#2ecc71',
    borderRadius: '2px',
    animation: 'wave 1s infinite',
  },
  volumeControl: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    padding: '12px',
    background: 'rgba(255,255,255,0.1)',
    borderRadius: '30px',
    marginBottom: '24px',
  },
  muteBtn: {
    background: 'none',
    border: 'none',
    color: 'white',
    cursor: 'pointer',
  },
  volumeSlider: {
    flex: 1,
    height: '4px',
    borderRadius: '2px',
    background: 'rgba(255,255,255,0.2)',
    WebkitAppearance: 'none',
  },
  volumeValue: {
    fontSize: '11px',
    color: 'white',
    minWidth: '35px',
  },
  stopBtn: {
    background: '#e74c3c',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  timerSection: {
    marginBottom: '20px',
  },
  timerControls: {
    display: 'flex',
    gap: '8px',
    marginBottom: '12px',
  },
  timerBtn: {
    flex: 1,
    padding: '8px',
    background: 'rgba(255,255,255,0.1)',
    border: 'none',
    borderRadius: '25px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '12px',
  },
  startTimerBtn: {
    width: '100%',
    padding: '10px',
    background: 'rgba(102,126,234,0.6)',
    border: 'none',
    borderRadius: '25px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '13px',
  },
  activeTimer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    padding: '10px',
    background: 'rgba(46,204,113,0.2)',
    borderRadius: '25px',
    fontSize: '13px',
    color: 'white',
  },
  cancelTimerBtn: {
    background: '#e74c3c',
    border: 'none',
    padding: '4px 12px',
    borderRadius: '15px',
    color: 'white',
    cursor: 'pointer',
    fontSize: '11px',
  },
  reminderCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '10px',
    padding: '12px',
    background: 'rgba(241,196,15,0.1)',
    borderRadius: '16px',
    fontSize: '12px',
    color: 'white',
  },
  reminderBtn: {
    background: 'rgba(241,196,15,0.3)',
    border: 'none',
    padding: '6px 14px',
    borderRadius: '20px',
    color: '#f1c40f',
    cursor: 'pointer',
    fontSize: '11px',
  },
  affirmationCard: {
    background: 'rgba(255,255,255,0.08)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    padding: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    border: '1px solid rgba(255,255,255,0.1)',
  },
  affirmationText: {
    fontSize: '13px',
    color: 'rgba(255,255,255,0.8)',
    fontStyle: 'italic',
    margin: 0,
    lineHeight: 1.4,
  },
};

// Add animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.3; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.2); }
  }
  @keyframes wave {
    0%, 100% { height: 8px; }
    50% { height: 15px; }
  }
`;
document.head.appendChild(styleSheet);

export default SleepMode;