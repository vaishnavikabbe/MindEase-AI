import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { FaHeartbeat } from 'react-icons/fa';

function Burnout() {
  const navigate = useNavigate();
  const [assessment, setAssessment] = useState({
    exhaustion: '',
    cynicism: '',
    efficiency: '',
    stressLevel: ''
  });
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleChange = (field, value) => {
    setAssessment({ ...assessment, [field]: value });
  };

  const calculateBurnout = () => {
    let score = 0;
    if (assessment.exhaustion === 'high') score += 3;
    if (assessment.exhaustion === 'medium') score += 2;
    if (assessment.exhaustion === 'low') score += 1;
    
    if (assessment.cynicism === 'high') score += 3;
    if (assessment.cynicism === 'medium') score += 2;
    if (assessment.cynicism === 'low') score += 1;
    
    if (assessment.efficiency === 'low') score += 3;
    if (assessment.efficiency === 'medium') score += 2;
    if (assessment.efficiency === 'high') score += 1;
    
    if (assessment.stressLevel === 'high') score += 3;
    if (assessment.stressLevel === 'medium') score += 2;
    if (assessment.stressLevel === 'low') score += 1;
    
    let level = '';
    let advice = '';
    let color = '';
    
    if (score <= 6) {
      level = 'Low Risk';
      advice = 'Doing well! Keep it up.';
      color = '#2ecc71';
    } else if (score <= 10) {
      level = 'Moderate Risk';
      advice = 'Take time to recharge.';
      color = '#f39c12';
    } else {
      level = 'High Risk';
      advice = 'Consider reaching out for support.';
      color = '#e74c3c';
    }
    
    setResult({ score, level, advice, color });
    setShowResult(true);
  };

  const resetAssessment = () => {
    setAssessment({ exhaustion: '', cynicism: '', efficiency: '', stressLevel: '' });
    setShowResult(false);
    setResult(null);
  };

  const options = [
    { value: 'low', label: 'Low', color: '#2ecc71' },
    { value: 'medium', label: 'Medium', color: '#f39c12' },
    { value: 'high', label: 'High', color: '#e74c3c' }
  ];

  const efficiencyOptions = [
    { value: 'high', label: 'High', color: '#2ecc71' },
    { value: 'medium', label: 'Medium', color: '#f39c12' },
    { value: 'low', label: 'Low', color: '#e74c3c' }
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>🔥 Academic Burnout</h1>
          <p style={styles.subtitle}>Quick check - 2 min</p>
        </div>

        <div style={styles.card}>
          {!showResult ? (
            <>
              {/* Question 1 */}
              <div style={styles.qItem}>
                <div style={styles.qHead}>
                  <span style={styles.qNum}>1</span>
                  <span style={styles.qText}>Exhausted after studying?</span>
                </div>
                <div style={styles.qOptions}>
                  {options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange('exhaustion', opt.value)}
                      style={{...styles.optBtn, background: assessment.exhaustion === opt.value ? opt.color : '#f0f0f0', color: assessment.exhaustion === opt.value ? 'white' : '#555'}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2 */}
              <div style={styles.qItem}>
                <div style={styles.qHead}>
                  <span style={styles.qNum}>2</span>
                  <span style={styles.qText}>Feel detached from studies?</span>
                </div>
                <div style={styles.qOptions}>
                  {options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange('cynicism', opt.value)}
                      style={{...styles.optBtn, background: assessment.cynicism === opt.value ? opt.color : '#f0f0f0', color: assessment.cynicism === opt.value ? 'white' : '#555'}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 3 */}
              <div style={styles.qItem}>
                <div style={styles.qHead}>
                  <span style={styles.qNum}>3</span>
                  <span style={styles.qText}>Academic efficiency?</span>
                </div>
                <div style={styles.qOptions}>
                  {efficiencyOptions.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange('efficiency', opt.value)}
                      style={{...styles.optBtn, background: assessment.efficiency === opt.value ? opt.color : '#f0f0f0', color: assessment.efficiency === opt.value ? 'white' : '#555'}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 4 */}
              <div style={styles.qItem}>
                <div style={styles.qHead}>
                  <span style={styles.qNum}>4</span>
                  <span style={styles.qText}>Stress level?</span>
                </div>
                <div style={styles.qOptions}>
                  {options.map(opt => (
                    <button
                      key={opt.value}
                      onClick={() => handleChange('stressLevel', opt.value)}
                      style={{...styles.optBtn, background: assessment.stressLevel === opt.value ? opt.color : '#f0f0f0', color: assessment.stressLevel === opt.value ? 'white' : '#555'}}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <button onClick={calculateBurnout} style={styles.assessBtn}>
                See Result →
              </button>
            </>
          ) : (
            <div style={styles.resultBox}>
              <div style={{...styles.resultCard, borderTopColor: result.color}}>
                <div style={styles.resultScore}>
                  <span style={{fontSize: '32px', fontWeight: 'bold', color: result.color}}>{result.score}</span>
                  <span>/12</span>
                </div>
                <div style={{...styles.resultLevel, background: `${result.color}15`, color: result.color}}>
                  {result.level}
                </div>
                <p style={styles.resultAdvice}>{result.advice}</p>
                {result.level === 'High Risk' && (
                  <div style={styles.emergencyTip}>
                    <FaHeartbeat size={10} /> Need support? Reach out.
                  </div>
                )}
              </div>
              <button onClick={resetAssessment} style={styles.resetBtn}>
                Take Again
              </button>
            </div>
          )}
        </div>

        <div style={styles.tipBar}>
          <span>💡</span>
          <span>Take breaks • Sleep well • Hydrate</span>
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
    height: '48px',
  },
  content: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '0 16px 20px 16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '20px',
    marginBottom: '4px',
    color: '#333',
  },
  subtitle: {
    fontSize: '11px',
    color: '#999',
  },
  card: {
    background: 'white',
    borderRadius: '14px',
    padding: '16px',
    marginBottom: '12px',
    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
  },
  qItem: {
    marginBottom: '16px',
    paddingBottom: '12px',
    borderBottom: '1px solid #eee',
  },
  qHead: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },
  qNum: {
    width: '20px',
    height: '20px',
    background: '#667eea',
    color: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '10px',
    fontWeight: 'bold',
  },
  qText: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#333',
  },
  qOptions: {
    display: 'flex',
    gap: '8px',
    marginLeft: '28px',
  },
  optBtn: {
    flex: 1,
    padding: '5px 0',
    borderRadius: '18px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    fontWeight: '500',
  },
  assessBtn: {
    width: '100%',
    padding: '8px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '12px',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '8px',
  },
  resultBox: {
    textAlign: 'center',
  },
  resultCard: {
    padding: '16px',
    background: '#f8f9ff',
    borderRadius: '12px',
    marginBottom: '12px',
    borderTop: '3px solid',
  },
  resultScore: {
    marginBottom: '8px',
  },
  resultLevel: {
    display: 'inline-block',
    padding: '3px 12px',
    borderRadius: '18px',
    fontSize: '11px',
    fontWeight: '600',
    marginBottom: '10px',
  },
  resultAdvice: {
    fontSize: '12px',
    color: '#555',
    marginBottom: '8px',
  },
  emergencyTip: {
    padding: '6px',
    background: '#ffeaa7',
    borderRadius: '8px',
    fontSize: '10px',
    color: '#d63031',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '5px',
  },
  resetBtn: {
    width: '100%',
    padding: '7px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    fontSize: '11px',
    cursor: 'pointer',
  },
  tipBar: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px 12px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    fontSize: '10px',
    color: '#888',
  },
};

export default Burnout;