import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaUser, FaEnvelope, FaCalendar, FaTrophy, FaFire, FaClock, 
  FaSignOutAlt, FaCamera, FaHeart, FaTrash, FaMars, FaVenus, 
  FaUpload, FaImage, FaEdit, FaSave, FaTimes, FaVenusMars, 
  FaBirthdayCake, FaRuler, FaWeight 
} from 'react-icons/fa';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: '',
    email: '',
    joined: '',
    avatar: null,
    avatarCategory: null
  });
  
  // Personal Information State (Only essential fields)
  const [personalInfo, setPersonalInfo] = useState({
    age: '',
    gender: '',
    height: '',
    weight: ''
  });
  const [isEditingPersonal, setIsEditingPersonal] = useState(false);
  const [tempPersonal, setTempPersonal] = useState({});
  
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState('');

  // Avatar arrays
  const boyAvatars = [
    { id: 1, url: 'https://i1-c.pinimg.com/1200x/d3/2e/38/d32e380d73a5a7aa85c0c8e0fbbd5821.jpg' },
    { id: 2, url: 'https://i1-c.pinimg.com/736x/6f/29/ba/6f29ba6e45aae8b4d2fd50ab19923e44.jpg' },
    { id: 3, url: 'https://i.pinimg.com/736x/1b/27/94/1b2794ea582fc2a82d2af8a8f8f0578d.jpg' },
    { id: 4, url: 'https://i.pinimg.com/736x/55/5e/5e/555e5e6a40392d3e277b898b3ced7e70.jpg' },
    { id: 5, url: 'https://i1-c.pinimg.com/736x/87/d2/39/87d239c65732f941a8f2d9cce9f245f9.jpg' },
    { id: 6, url: 'https://i.pinimg.com/736x/9f/17/44/9f17441035139b25b3d18221926609ce.jpg' },
  ];

  const girlAvatars = [
    { id: 1, url: 'https://i.pinimg.com/736x/38/db/88/38db88648a2be82fc1f1064facab7c53.jpg' },
    { id: 2, url: 'https://i.pinimg.com/736x/27/b3/a2/27b3a20243c6f8dd82e89193fb41edd7.jpg' },
    { id: 3, url: 'https://i.pinimg.com/736x/70/fa/1a/70fa1a3de7daf45216c8ed8ecbd68eba.jpg' },
    { id: 4, url: 'https://i.pinimg.com/736x/d9/24/b5/d924b552555b0ea624d6f39c63dcd6b6.jpg'},
    { id: 5, url: 'https://i.pinimg.com/736x/e7/65/c4/e765c44861620cd48501aee4603bd313.jpg'},
    { id: 6, url: 'https://i.pinimg.com/736x/08/42/1a/08421a72d235bf60dd81077a64e72d2a.jpg'},
  ];

  const customAvatars = [
    { id: 1, url: 'https://i.pinimg.com/736x/a1/27/73/a1277303ec49ee936b2ba11bb3a98a18.jpg', name: 'cartoon avatar', category: 'cartoon' },
    { id: 2, url: 'https://i1-c.pinimg.com/1200x/67/ef/9d/67ef9d9bb1b009281379840a737c811f.jpg', name: 'cartoon avatar', category: 'cartoon' },
  ];

  useEffect(() => {
    const savedAvatar = localStorage.getItem('userAvatar');
    const savedCategory = localStorage.getItem('userAvatarCategory');
    const savedName = localStorage.getItem('userName');
    const savedPersonal = localStorage.getItem('personalInfo');
    
    setUser({
      name: savedName || 'User',
      email: localStorage.getItem('userEmail') || 'user@example.com',
      joined: new Date().toLocaleDateString(),
      avatar: savedAvatar,
      avatarCategory: savedCategory
    });
    setNewName(savedName || 'User');
    
    if (savedPersonal) {
      setPersonalInfo(JSON.parse(savedPersonal));
    }
  }, []);

  const stats = [
    { icon: <FaFire color="#e74c3c" />, value: '12', label: 'Day Streak' },
    { icon: <FaTrophy color="#f39c12" />, value: '8', label: 'Badges' },
    { icon: <FaClock color="#3498db" />, value: '245', label: 'Focus Min' },
    { icon: <FaHeart color="#e84393" />, value: '156', label: 'Moods' },
  ];

  // Handle name edit
  const handleEditName = () => {
    setIsEditingName(true);
    setNewName(user.name);
  };

  const handleSaveName = () => {
    if (newName.trim()) {
      setUser({ ...user, name: newName.trim() });
      localStorage.setItem('userName', newName.trim());
      setIsEditingName(false);
    }
  };

  const handleCancelEdit = () => {
    setIsEditingName(false);
    setNewName(user.name);
  };

  // Handle Personal Info Edit
  const handleEditPersonal = () => {
    setTempPersonal({ ...personalInfo });
    setIsEditingPersonal(true);
  };

  const handleSavePersonal = () => {
    setPersonalInfo(tempPersonal);
    localStorage.setItem('personalInfo', JSON.stringify(tempPersonal));
    setIsEditingPersonal(false);
  };

  const handleCancelPersonal = () => {
    setIsEditingPersonal(false);
  };

  const handlePersonalChange = (field, value) => {
    setTempPersonal({ ...tempPersonal, [field]: value });
  };

  // Avatar handlers
  const handleUrlSubmit = () => {
    if (customImageUrl.trim()) {
      setUser({ ...user, avatar: customImageUrl, avatarCategory: 'custom' });
      localStorage.setItem('userAvatar', customImageUrl);
      localStorage.setItem('userAvatarCategory', 'custom');
      setShowAvatarPicker(false);
      setCustomImageUrl('');
      setShowUrlInput(false);
    }
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result;
        setUser({ ...user, avatar: imageData, avatarCategory: 'uploaded' });
        localStorage.setItem('userAvatar', imageData);
        localStorage.setItem('userAvatarCategory', 'uploaded');
        setShowAvatarPicker(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarSelect = (avatarUrl, category) => {
    setUser({ ...user, avatar: avatarUrl, avatarCategory: category });
    localStorage.setItem('userAvatar', avatarUrl);
    localStorage.setItem('userAvatarCategory', category);
    setShowAvatarPicker(false);
    setSelectedCategory(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar');
    localStorage.removeItem('userAvatarCategory');
    localStorage.removeItem('personalInfo');
    navigate('/');
  };

  // Render field helper
  const renderPersonalField = (label, field, type = 'text', options = null) => {
    const value = isEditingPersonal ? tempPersonal[field] : personalInfo[field];
    
    if (!isEditingPersonal) {
      return <p style={styles.fieldValue}>{value || '—'}</p>;
    }
    
    if (options) {
      return (
        <select
          value={value || ''}
          onChange={(e) => handlePersonalChange(field, e.target.value)}
          style={styles.select}
        >
          <option value="">Select</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      );
    }
    
    return (
      <input
        type={type}
        value={value || ''}
        onChange={(e) => handlePersonalChange(field, e.target.value)}
        placeholder={label}
        style={styles.input}
      />
    );
  };

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>👤 Profile</h1>
          <p style={styles.subtitle}>Manage your account</p>
        </div>

        {/* Avatar Card */}
        <div style={styles.avatarCard}>
          <div style={styles.avatarContainer}>
            <div style={styles.avatarWrapper}>
              {user.avatar ? (
                <img src={user.avatar} alt="Avatar" style={styles.avatarImage} />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <FaUser size={50} color="#ccc" />
                </div>
              )}
              <button 
                style={styles.editAvatarBtn}
                onClick={() => setShowAvatarPicker(!showAvatarPicker)}
              >
                <FaCamera size={16} />
              </button>
            </div>

            {/* Name with Edit Option */}
            <div style={styles.nameContainer}>
              {isEditingName ? (
                <div style={styles.editNameContainer}>
                  <input
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    style={styles.nameInput}
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handleSaveName()}
                  />
                  <button onClick={handleSaveName} style={styles.saveNameBtn}>
                    <FaSave />
                  </button>
                  <button onClick={handleCancelEdit} style={styles.cancelNameBtn}>
                    <FaTimes />
                  </button>
                </div>
              ) : (
                <div style={styles.nameDisplay}>
                  <h2 style={styles.userName}>{user.name}</h2>
                  <button onClick={handleEditName} style={styles.editNameBtn}>
                    <FaEdit size={16} />
                  </button>
                </div>
              )}
            </div>

            <div style={styles.userInfo}>
              <div style={styles.infoRow}><FaEnvelope /> {user.email}</div>
              <div style={styles.infoRow}><FaCalendar /> Joined {user.joined}</div>
            </div>
          </div>

          {/* Avatar Picker Popup */}
          {showAvatarPicker && (
            <div style={styles.avatarPicker}>
              <div style={styles.pickerHeader}>
                <h4>Choose Your Avatar</h4>
                <button onClick={() => setShowAvatarPicker(false)} style={styles.closeBtn}>✕</button>
              </div>
              
              <div style={styles.uploadSection}>
                <label style={styles.uploadBtn}>
                  <FaUpload /> Upload Photo
                  <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} />
                </label>
                <button style={styles.urlBtn} onClick={() => setShowUrlInput(!showUrlInput)}>
                  <FaImage /> Use URL
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
                      <div style={styles.categoryIcon}><FaMars size={40} color="#3498db" /></div>
                      <h4>Boys</h4>
                    </div>
                    <div style={styles.categoryCard} onClick={() => setSelectedCategory('girls')}>
                      <div style={styles.categoryIcon}><FaVenus size={40} color="#e84393" /></div>
                      <h4>Girls</h4>
                    </div>
                  </div>
                  <div style={styles.customSection}>
                    <h4 style={styles.customTitle}>🎨 More Avatars</h4>
                    <div style={styles.avatarGrid}>
                      {customAvatars.map((avatar) => (
                        <div key={avatar.id} style={styles.avatarOption} onClick={() => handleAvatarSelect(avatar.url, avatar.category)}>
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
                      <div key={avatar.id} style={styles.avatarOption} onClick={() => handleAvatarSelect(avatar.url, selectedCategory)}>
                        <img src={avatar.url} alt={avatar.name} style={styles.avatarOptionImage} />
                      </div>
                    ))}
                  </div>
                </>
              )}

              {user.avatar && (
                <button onClick={() => {
                  setUser({ ...user, avatar: null, avatarCategory: null });
                  localStorage.removeItem('userAvatar');
                  localStorage.removeItem('userAvatarCategory');
                  setShowAvatarPicker(false);
                }} style={styles.removeBtn}>
                  <FaTrash /> Remove
                </button>
              )}
            </div>
          )}
        </div>

        {/* Personal Information Card - Only Essential Fields */}
        <div style={styles.personalCard}>
          <div style={styles.cardHeader}>
            <h3 style={styles.cardTitle}><FaUser /> Personal Information</h3>
            {!isEditingPersonal ? (
              <button onClick={handleEditPersonal} style={styles.editBtn}>
                <FaEdit /> Edit
              </button>
            ) : (
              <div style={styles.actionBtns}>
                <button onClick={handleSavePersonal} style={styles.saveBtn}>
                  <FaSave /> Save
                </button>
                <button onClick={handleCancelPersonal} style={styles.cancelBtn}>
                  <FaTimes /> Cancel
                </button>
              </div>
            )}
          </div>
          
          <div style={styles.personalGrid}>
            <div style={styles.personalField}>
              <label><FaBirthdayCake /> Age</label>
              {renderPersonalField('Age', 'age', 'number')}
            </div>
            <div style={styles.personalField}>
              <label><FaVenusMars /> Gender</label>
              {renderPersonalField('Gender', 'gender', 'select', ['Male', 'Female', 'Non-binary', 'Prefer not to say'])}
            </div>
            <div style={styles.personalField}>
              <label><FaRuler /> Height (cm)</label>
              {renderPersonalField('Height', 'height', 'number')}
            </div>
            <div style={styles.personalField}>
              <label><FaWeight /> Weight (kg)</label>
              {renderPersonalField('Weight', 'weight', 'number')}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div style={styles.statsGrid}>
          {stats.map((stat, index) => (
            <div key={index} style={styles.statCard}>
              <div style={styles.statIcon}>{stat.icon}</div>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statLabel}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Logout Button */}
        <div style={styles.menuCard}>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            <FaSignOutAlt /> Logout
          </button>
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
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingTop: '80px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '14px',
    opacity: 0.9,
  },
  
  // Avatar Card Styles
  avatarCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    marginBottom: '20px',
    position: 'relative',
  },
  avatarContainer: {
    textAlign: 'center',
  },
  avatarWrapper: {
    position: 'relative',
    display: 'inline-block',
    marginBottom: '15px',
  },
  avatarImage: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    objectFit: 'cover',
    border: '3px solid #667eea',
  },
  avatarPlaceholder: {
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    background: '#f0f0f0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '3px solid #ccc',
  },
  editAvatarBtn: {
    position: 'absolute',
    bottom: '5px',
    right: '5px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameContainer: {
    marginBottom: '15px',
  },
  nameDisplay: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  userName: {
    fontSize: '24px',
    color: '#333',
    margin: 0,
  },
  editNameBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    padding: '5px',
    display: 'flex',
    alignItems: 'center',
  },
  editNameContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  nameInput: {
    fontSize: '20px',
    padding: '8px 12px',
    border: '2px solid #667eea',
    borderRadius: '10px',
    outline: 'none',
    textAlign: 'center',
    width: '200px',
  },
  saveNameBtn: {
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelNameBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    width: '36px',
    height: '36px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  userInfo: {
    color: '#666',
    fontSize: '14px',
  },
  infoRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '5px',
  },

  // Personal Information Card Styles
  personalCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '15px',
    borderBottom: '2px solid #f0f0f0',
    paddingBottom: '10px',
  },
  cardTitle: {
    fontSize: '18px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  editBtn: {
    background: '#667eea',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  actionBtns: {
    display: 'flex',
    gap: '8px',
  },
  saveBtn: {
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  cancelBtn: {
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  },
  personalGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
  },
  personalField: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  input: {
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
  },
  select: {
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    fontSize: '14px',
    outline: 'none',
    background: 'white',
  },
  fieldValue: {
    padding: '10px',
    background: '#f8f9ff',
    borderRadius: '10px',
    color: '#333',
    fontSize: '14px',
  },

  // Stats Grid Styles
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '15px',
    marginBottom: '20px',
  },
  statCard: {
    background: 'white',
    borderRadius: '15px',
    padding: '20px',
    textAlign: 'center',
  },
  statIcon: {
    fontSize: '28px',
    marginBottom: '10px',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#333',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
  },
  
  // Menu Card Styles
  menuCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
  },
  logoutBtn: {
    width: '100%',
    padding: '12px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
    fontSize: '16px',
  },

  // Avatar Picker Styles
  avatarPicker: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    width: '380px',
    maxHeight: '550px',
    overflowY: 'auto',
    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
    zIndex: 1000,
  },
  pickerHeader: {
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
    marginBottom: '20px',
  },
  uploadBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    background: '#667eea',
    color: 'white',
    borderRadius: '10px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '14px',
  },
  urlBtn: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    padding: '10px',
    background: '#2ecc71',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontSize: '14px',
  },
  urlInputContainer: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
  },
  urlInput: {
    flex: 1,
    padding: '10px',
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    outline: 'none',
  },
  urlSubmitBtn: {
    padding: '10px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  categoryGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '15px',
    marginBottom: '20px',
  },
  categoryCard: {
    textAlign: 'center',
    padding: '20px',
    borderRadius: '15px',
    background: '#f8f9ff',
    cursor: 'pointer',
  },
  categoryIcon: {
    marginBottom: '10px',
  },
  customSection: {
    marginTop: '10px',
    borderTop: '1px solid #eee',
    paddingTop: '15px',
  },
  customTitle: {
    fontSize: '14px',
    marginBottom: '10px',
    color: '#666',
  },
  backBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    cursor: 'pointer',
    marginBottom: '15px',
    fontSize: '14px',
  },
  avatarGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '15px',
    marginBottom: '20px',
  },
  avatarOption: {
    textAlign: 'center',
    padding: '10px',
    borderRadius: '10px',
    cursor: 'pointer',
  },
  avatarOptionImage: {
    width: '70px',
    height: '70px',
    borderRadius: '50%',
    objectFit: 'cover',
  },
  removeBtn: {
    width: '100%',
    padding: '10px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
};

export default Profile;