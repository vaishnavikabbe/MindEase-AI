import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaHeart, FaBrain, FaSmile, FaRobot, FaMars, FaVenus, FaUpload, FaImage, FaTimes } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState('');
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const navigate = useNavigate();

  // Avatar arrays (same as Profile page)
  const boyAvatars = [
    { id: 1, url: 'https://randomuser.me/api/portraits/men/1.jpg', name: 'Alex' },
    { id: 2, url: 'https://randomuser.me/api/portraits/men/2.jpg', name: 'Ben' },
    { id: 3, url: 'https://randomuser.me/api/portraits/men/3.jpg', name: 'Charlie' },
    { id: 4, url: 'https://randomuser.me/api/portraits/men/4.jpg', name: 'David' },
    { id: 5, url: 'https://randomuser.me/api/portraits/men/5.jpg', name: 'Ethan' },
    { id: 6, url: 'https://randomuser.me/api/portraits/men/6.jpg', name: 'Frank' },
  ];

  const girlAvatars = [
    { id: 1, url: 'https://randomuser.me/api/portraits/women/1.jpg', name: 'Emma' },
    { id: 2, url: 'https://randomuser.me/api/portraits/women/2.jpg', name: 'Sophia' },
    { id: 3, url: 'https://randomuser.me/api/portraits/women/3.jpg', name: 'Olivia' },
    { id: 4, url: 'https://randomuser.me/api/portraits/women/4.jpg', name: 'Ava' },
    { id: 5, url: 'https://randomuser.me/api/portraits/women/5.jpg', name: 'Mia' },
    { id: 6, url: 'https://randomuser.me/api/portraits/women/6.jpg', name: 'Isabella' },
  ];

  const customAvatars = [
    { id: 1, url: 'https://i.pinimg.com/736x/a1/27/73/a1277303ec49ee936b2ba11bb3a98a18.jpg', name: 'Cartoon 1', category: 'cartoon' },
    { id: 2, url: 'https://i1-c.pinimg.com/1200x/67/ef/9d/67ef9d9bb1b009281379840a737c811f.jpg', name: 'Cartoon 2', category: 'cartoon' },
  ];

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
    
    // Store selected avatar if any
    if (selectedAvatar) {
      localStorage.setItem('userAvatar', selectedAvatar);
      localStorage.setItem('userAvatarCategory', 'selected');
    }
    
    // Set login flag
    localStorage.setItem('isLoggedIn', 'true');
    
    // Redirect to dashboard
    navigate('/dashboard');
  };

  // Avatar selection handlers
  const handleAvatarSelect = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    setShowAvatarPicker(false);
    setSelectedCategory(null);
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedAvatar(reader.result);
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUrlSubmit = () => {
    if (customImageUrl.trim()) {
      setSelectedAvatar(customImageUrl);
      setShowAvatarPicker(false);
      setCustomImageUrl('');
      setShowUrlInput(false);
    }
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

        {/* Avatar Preview for Signup */}
        {isSignup && (
          <div style={styles.avatarSection}>
            <div style={styles.avatarPreview} onClick={() => setShowAvatarPicker(true)}>
              {selectedAvatar ? (
                <img src={selectedAvatar} alt="Avatar" style={styles.avatarImage} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <FaSmile size={30} color="#ccc" />
                </div>
              )}
              <button style={styles.chooseAvatarBtn}>Choose Avatar</button>
            </div>
          </div>
        )}

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
            setSelectedAvatar(null);
          }} style={styles.switchLink}>
            {isSignup ? 'Sign In' : 'Sign Up'}
          </span>
        </p>

        <div style={styles.demoHint}>
          <p>🎯 Demo: Use any email & password to login</p>
        </div>
      </div>

      {/* Avatar Picker Modal */}
      {showAvatarPicker && (
        <div style={styles.modal} onClick={() => setShowAvatarPicker(false)}>
          <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalHeader}>
              <h4>Choose Your Avatar</h4>
              <button onClick={() => setShowAvatarPicker(false)} style={styles.closeBtn}>✕</button>
            </div>
            
            {/* Upload Options */}
            <div style={styles.uploadSection}>
              <label style={styles.uploadBtn}>
                <FaUpload /> Upload Photo
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
              </label>
              <button style={styles.urlBtn} onClick={() => setShowUrlInput(!showUrlInput)}>
                <FaImage /> Use Image URL
              </button>
            </div>

            {showUrlInput && (
              <div style={styles.urlInputContainer}>
                <input type="text" placeholder="Paste image URL here..." value={customImageUrl} onChange={(e) => setCustomImageUrl(e.target.value)} style={styles.urlInput} />
                <button onClick={handleUrlSubmit} style={styles.urlSubmitBtn}>Add</button>
              </div>
            )}

            {!selectedCategory ? (
              <>
                <div style={styles.categoryGrid}>
                  <div style={styles.categoryCard} onClick={() => setSelectedCategory('boys')}>
                    <FaMars size={40} color="#3498db" />
                    <h4>Boys</h4>
                  </div>
                  <div style={styles.categoryCard} onClick={() => setSelectedCategory('girls')}>
                    <FaVenus size={40} color="#e84393" />
                    <h4>Girls</h4>
                  </div>
                </div>
                <div style={styles.customSection}>
                  <h4 style={styles.customTitle}>🎨 More Avatars</h4>
                  <div style={styles.avatarGrid}>
                    {customAvatars.map((avatar) => (
                      <div key={avatar.id} style={styles.avatarOption} onClick={() => handleAvatarSelect(avatar.url)}>
                        <img src={avatar.url} alt={avatar.name} style={styles.avatarOptionImage} />
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              <>
                <button onClick={() => setSelectedCategory(null)} style={styles.backBtn}>← Back</button>
                <div style={styles.avatarGrid}>
                  {(selectedCategory === 'boys' ? boyAvatars : girlAvatars).map((avatar) => (
                    <div key={avatar.id} style={styles.avatarOption} onClick={() => handleAvatarSelect(avatar.url)}>
                      <img src={avatar.url} alt={avatar.name} style={styles.avatarOptionImage} />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
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
    maxHeight: '90vh',
    overflowY: 'auto',
  },
  logoContainer: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logoIcon: {
    width: '70px',
    height: '70px',
    background: 'linear-gradient(135deg, #667eea20 0%, #764ba220 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 15px',
  },
  logoText: {
    fontSize: '28px',
    fontWeight: '800',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '5px',
  },
  tagline: {
    color: '#666',
    fontSize: '12px',
  },
  
  // Avatar Section
  avatarSection: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  avatarPreview: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
    cursor: 'pointer',
  },
  avatarImage: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #667eea',
  },
  avatarPlaceholder: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    background: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #ccc',
  },
  chooseAvatarBtn: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '5px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    cursor: 'pointer',
  },
  
  features: {
    display: 'flex',
    justifyContent: 'space-around',
    marginBottom: '20px',
    padding: '12px',
    background: '#f8f9ff',
    borderRadius: '15px',
  },
  feature: {
    textAlign: 'center',
    fontSize: '11px',
    color: '#667eea',
  },
  featureIcon: {
    fontSize: '18px',
    marginBottom: '5px',
    display: 'block',
  },
  errorMsg: {
    background: '#ffeaa7',
    color: '#d63031',
    padding: '8px',
    borderRadius: '10px',
    fontSize: '12px',
    textAlign: 'center',
    marginBottom: '15px',
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
    transition: 'all 0.3s ease',
    outline: 'none',
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
  },
  switchText: {
    textAlign: 'center',
    marginTop: '15px',
    color: '#666',
    fontSize: '13px',
  },
  switchLink: {
    color: '#667eea',
    cursor: 'pointer',
    fontWeight: '600',
    textDecoration: 'underline',
  },
  demoHint: {
    textAlign: 'center',
    marginTop: '15px',
    padding: '8px',
    background: '#fff3cd',
    borderRadius: '8px',
    fontSize: '11px',
    color: '#856404',
  },
  
  // Modal Styles
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  modalContent: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    width: '350px',
    maxHeight: '500px',
    overflowY: 'auto',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
  },
  closeBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999',
  },
  uploadSection: {
    display: 'flex',
    gap: '10px',
    marginBottom: '15px',
  },
  uploadBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '8px',
    background: '#667eea',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  urlBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
    padding: '8px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  urlInputContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '15px',
  },
  urlInput: {
    flex: 1,
    padding: '8px',
    border: '2px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '12px',
  },
  urlSubmitBtn: {
    padding: '8px 15px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '15px',
  },
  categoryCard: {
    textAlign: 'center',
    padding: '15px',
    borderRadius: '15px',
    background: '#f8f9ff',
    cursor: 'pointer',
  },
  customSection: {
    marginTop: '10px',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
  },
  customTitle: {
    fontSize: '13px',
    marginBottom: '10px',
    color: '#666',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    marginBottom: '15px',
    fontSize: '13px',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '10px',
    marginBottom: '15px',
  },
  avatarOption: {
    textAlign: 'center',
    padding: '8px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  avatarOptionImage: {
    width: '60px',
    height: '60px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
};

export default Login;
