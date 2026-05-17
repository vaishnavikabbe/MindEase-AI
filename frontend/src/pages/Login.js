import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBrain, FaSmile, FaRobot } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    
    if (isSignup && !name) {
      setError('Please enter your name');
      return;
    }
    
    if (!email || !password) {
      setError('Please enter email and password');
      return;
    }
    
    // Store user info in localStorage
    localStorage.setItem('userName', isSignup ? name : (name || email.split('@')[0]));
    localStorage.setItem('userEmail', email);
    
    // Set login flag
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to dashboard
    navigate('/dashboard');
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
          
          <button type="submit" style={styles.button}>
            {isSignup ? '✨ Create Account ✨' : '🚀 Get Started 🚀'}
          </button>
        </form>

        <p style={styles.switchText}>
          {isSignup ? 'Already have an account? ' : "Don't have an account? "}
          <span onClick={() => {
            setIsSignup(!isSignup);
            setError('');
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
  },
  card: {
    background: 'rgba(255, 255, 255, 0.98)',
    borderRadius: '30px',
    padding: '40px',
    width: '450px',
    maxWidth: '90%',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '30px',
  },
  logoIcon: {
    width: '80px',
    height: '80px',
    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
  },
  logoText: {
    fontSize: '32px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '5px',
  },
  tagline: {
    color: '#666',
    fontSize: '14px',
  },
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '30px',
    padding: '15px',
    background: '#f8f9ff',
    borderRadius: '15px',
  },
  feature: {
    textAlign: 'center',
    fontSize: '12px',
    color: '#667eea',
  },
  featureIcon: {
    fontSize: '20px',
    marginBottom: '5px',
    display: 'block',
  },
  errorMsg: {
    background: '#ffeaa7',
    color: '#d63031',
    padding: '10px',
    borderRadius: '10px',
    fontSize: '13px',
    textAlign: 'center',
    marginBottom: '15px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  input: {
    padding: '14px 18px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '16px',
    outline: 'none',
  },
  button: {
    padding: '14px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    fontSize: '18px',
    fontWeight: '600',
    cursor: 'pointer',
  },
  switchText: {
    textAlign: 'center',
    marginTop: '20px',
    color: '#666',
  },
  switchLink: {
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  demoHint: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    background: '#fff3cd',
    borderRadius: '8px',
    fontSize: '12px',
    color: '#856404',
  },
};

export default Login;