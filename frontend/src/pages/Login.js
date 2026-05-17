import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBrain, FaSmile, FaRobot } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    if (isSignup && !name) {
      setError('Please enter your name');
      setLoading(false);
      return;
    }
    
    if (!email || !password) {
      setError('Please enter email and password');
      setLoading(false);
      return;
    }
    
    // Simulate a tiny delay for better UX
    setTimeout(() => {
      // Store user info in localStorage
      localStorage.setItem('userName', isSignup ? name : (name || email.split('@')[0]));
      localStorage.setItem('userEmail', email);
      
      // Set login flag
      localStorage.setItem('isLoggedIn', 'true');
      
      setLoading(false);
      
      // Use window.location for guaranteed redirect without refresh issues
      window.location.href = '/dashboard';
    }, 500);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.logoContainer}>
          <div style={styles.logoIcon}>
            <FaBrain size={50} color="#667eea" />
          </div>
          <h1 style={styles.logoText}>
            Mind<span style={{ color: '#764ba2' }}>Ease</span>
          </h1>
          <p style={styles.tagline}>Your Personal Mental Wellness Companion</p>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            <FaRobot style={styles.featureIcon} />
            <span>AI Support</span>
          </div>
          <div style={styles.feature}>
            <FaHeart style={styles.featureIcon} />
            <span>Mood Tracking</span>
          </div>
          <div style={styles.feature}>
            <FaSmile style={styles.featureIcon} />
            <span>Habit Building</span>
          </div>
        </div>

        {error && <div style={styles.errorMsg}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          {isSignup && (
            <input
              type="text"
              placeholder="Full Name"
              style={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            style={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            style={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          <button type="submit" style={styles.button} disabled={loading}>
            {loading ? (
              <span>⏳ Please wait...</span>
            ) : (
              isSignup ? '✨ Create Account ✨' : '🚀 Get Started 🚀'
            )}
          </button>
        </form>

        <p style={styles.switchText}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => {
            setIsSignup(!isSignup);
            setError('');
            setLoading(false);
          }} style={styles.switchLink}>
            {isSignup ? 'Sign In' : 'Sign Up'}
          </span>
        </p>

        <div style={styles.demoHint}>
          <p>🎯 Demo: Use any email & password to login</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    padding: '16px',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '30px',
    padding: '30px 24px',
    width: '100%',
    maxWidth: '450px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '24px',
  },
  logoIcon: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 12px',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '4px',
  },
  tagline: {
    color: '#666',
    fontSize: '12px',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '24px',
    padding: '12px',
    background: '#f8f9ff',
    borderRadius: '15px',
    flexWrap: 'wrap',
    gap: '10px',
  },
  feature: {
    textAlign: 'center',
    fontSize: '11px',
    color: '#667eea',
  },
  featureIcon: {
    fontSize: '18px',
    marginBottom: '4px',
    display: 'block',
  },
  errorMsg: {
    background: '#ffeaa7',
    color: '#d63031',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '16px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  input: {
    padding: '12px 16px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
  },
  button: {
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '16px',
    fontWeight: '600',
    cursor: 'pointer',
    width: '100%',
    transition: 'opacity 0.3s',
  },
  buttonDisabled: {
    opacity: 0.7,
    cursor: 'not-allowed',
  },
  switchText: {
    textAlign: 'center',
    marginTop: '16px',
    color: '#666',
    fontSize: '12px',
  },
  switchLink: {
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  demoHint: {
    textAlign: 'center',
    marginTop: '16px',
    padding: '8px',
    background: '#fff3cd',
    borderRadius: '8px',
    fontSize: '10px',
    color: '#856404',
  },
};

export default Login;