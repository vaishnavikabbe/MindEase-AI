import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaPhone, FaHeart, FaHandsHelping, FaAmbulance, FaComment, FaArrowLeft } from 'react-icons/fa';

function Emergency() {
  const navigate = useNavigate();

  const emergencyContacts = [
    { name: 'AASRA Suicide Prevention Lifeline', number: '	98204 66726', color: '#e74c3c' },
    { name: 'KIRAN Mental Health Helpline', number: '1800-599-0019', color: '#3498db' },
    { name: 'Fortis Stress Helpline', number: '83768 04102', color: '#2ecc71' },
    { name: 'eMbrace Community', number: '99715 76800', color: '#f39c12' },
  ];

  const selfCareTips = [
    "Take 3 deep breaths",
    "Drink a glass of water",
    "Step outside for 5 minutes",
    "Call a trusted friend",
    "Listen to calming music",
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      
      <div style={styles.content}>
        <button onClick={() => navigate(-1)} style={styles.backBtn}>
          <FaArrowLeft /> Back
        </button>

        <div style={styles.header}>
          <div style={styles.emergencyIcon}>🚨</div>
          <h1 style={styles.title}>Emergency Support</h1>
          <p style={styles.subtitle}>You're not alone. Help is available 24/7.</p>
        </div>

        <div style={styles.helplineCard}>
          <h2 style={styles.helplineTitle}>📞 24/7 Crisis Helplines</h2>
          {emergencyContacts.map((contact, index) => (
            <a key={index} href={`tel:${contact.number}`} style={styles.contactCard}>
              <div style={{...styles.contactIcon, background: contact.color}}>
                <FaPhone color="white" />
              </div>
              <div style={styles.contactInfo}>
                <h4>{contact.name}</h4>
                <p style={styles.contactNumber}>{contact.number}</p>
              </div>
            </a>
          ))}
        </div>

        <div style={styles.selfCareCard}>
          <h2 style={styles.selfCareTitle}>💚 Try These Right Now</h2>
          <div style={styles.tipsGrid}>
            {selfCareTips.map((tip, index) => (
              <div key={index} style={styles.tipItem}>
                <span>✨ {tip}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={styles.supportCard}>
          <FaHeart size={40} color="#e74c3c" />
          <h3>Remember</h3>
          <p>Asking for help is a sign of strength, not weakness.</p>
          <p style={styles.supportNote}>You matter. Your feelings are valid.</p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%)',
  },
  content: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    paddingTop: '80px',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '50px',
    color: 'white',
    cursor: 'pointer',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '30px',
    color: 'white',
  },
  emergencyIcon: {
    fontSize: '60px',
    marginBottom: '10px',
  },
  title: {
    fontSize: '32px',
    marginBottom: '10px',
  },
  subtitle: {
    fontSize: '14px',
    opacity: 0.9,
  },
  helplineCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
  },
  helplineTitle: {
    marginBottom: '15px',
    color: '#333',
  },
  contactCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '12px',
    marginBottom: '10px',
    background: '#f8f9ff',
    borderRadius: '12px',
    textDecoration: 'none',
    color: '#333',
  },
  contactIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactInfo: {
    flex: 1,
  },
  contactNumber: {
    color: '#666',
    fontSize: '14px',
  },
  selfCareCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '20px',
    marginBottom: '20px',
  },
  selfCareTitle: {
    marginBottom: '15px',
    color: '#333',
  },
  tipsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '10px',
  },
  tipItem: {
    padding: '10px',
    background: '#f0f0f0',
    borderRadius: '10px',
    fontSize: '14px',
  },
  supportCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '30px',
    textAlign: 'center',
  },
  supportNote: {
    marginTop: '10px',
    fontStyle: 'italic',
    color: '#666',
  },
};

export default Emergency;