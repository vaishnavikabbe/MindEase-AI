import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPaperPlane, FaUserSecret, FaLock, FaHeart } from 'react-icons/fa';

function AnonymousChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome to Anonymous Support Space. Your identity is completely hidden.", isUser: false, time: new Date().toLocaleTimeString() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (message) => {
    const msg = message.toLowerCase();
    if (msg.includes('sad') || msg.includes('depressed')) {
      return "I hear you. You're not alone. 💙";
    }
    if (msg.includes('hit') || msg.includes('hurt')) {
      return "Please don't hurt yourself. Reach out to a crisis helpline: 988. You matter. 💙";
    }
    if (msg.includes('stress') || msg.includes('overwhelm')) {
      return "Take a deep breath. One step at a time. 🧘";
    }
    if (msg.includes('exam') || msg.includes('study')) {
      return "Break study into chunks. You've got this! 📚";
    }
    return "Thank you for sharing. I'm here to listen. 💙";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { id: Date.now(), text: input, isUser: true, time: new Date().toLocaleTimeString() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = { id: Date.now() + 1, text: getAIResponse(input), isUser: false, time: new Date().toLocaleTimeString() };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}><FaUserSecret size={14} /> Anonymous</h1>
          <p style={styles.subtitle}>Share freely. Identity hidden.</p>
        </div>

        <div style={styles.privacyCard}>
          <FaLock size={8} color="#2ecc71" />
          <span>🔒 100% Anonymous</span>
        </div>

        <div style={styles.chatContainer}>
          <div style={styles.messagesArea}>
            {messages.map(msg => (
              <div key={msg.id} style={{...styles.message, justifyContent: msg.isUser ? 'flex-end' : 'flex-start'}}>
                <div style={{...styles.messageBubble, background: msg.isUser ? '#667eea' : '#f0f0f0', color: msg.isUser ? 'white' : '#333'}}>
                  <p style={styles.messageText}>{msg.text}</p>
                  <span style={styles.messageTime}>{msg.time}</span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={styles.typingIndicator}>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
                <div style={styles.typingDot}></div>
              </div>
            )}
          </div>
          
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Message..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>
              <FaPaperPlane size={10} />
            </button>
          </div>
        </div>

        <div style={styles.resourcesCard}>
          <FaHeart size={9} color="#e84393" />
          <span>Crisis: 988 | Text 741741</span>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: { 
    minHeight: '100vh', 
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
  },
  navSpacer: { 
    height: '52px' 
  },
  content: { 
    maxWidth: '420px', 
    margin: '0 auto', 
    padding: '0 12px 16px 12px' 
  },
  header: { 
    textAlign: 'center', 
    marginBottom: '8px', 
    color: 'white' 
  },
  title: { 
    fontSize: '16px', 
    marginBottom: '2px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '5px' 
  },
  subtitle: { 
    fontSize: '9px', 
    opacity: 0.8 
  },
  privacyCard: { 
    background: 'rgba(255,255,255,0.95)', 
    borderRadius: '6px', 
    padding: '4px 8px', 
    marginBottom: '10px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    gap: '4px', 
    fontSize: '9px', 
    fontWeight: '500' 
  },
  chatContainer: { 
    background: 'white', 
    borderRadius: '12px', 
    height: '320px', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden' 
  },
  messagesArea: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '8px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '6px' 
  },
  message: { 
    display: 'flex' 
  },
  messageBubble: { 
    maxWidth: '85%', 
    padding: '4px 8px', 
    borderRadius: '12px' 
  },
  messageText: { 
    margin: 0, 
    fontSize: '10px', 
    lineHeight: 1.3 
  },
  messageTime: { 
    fontSize: '7px', 
    opacity: 0.5, 
    display: 'block', 
    marginTop: '2px' 
  },
  typingIndicator: { 
    display: 'flex', 
    gap: '2px', 
    padding: '4px 8px', 
    background: '#f0f0f0', 
    borderRadius: '12px', 
    width: '28px' 
  },
  typingDot: { 
    width: '4px', 
    height: '4px', 
    background: '#999', 
    borderRadius: '50%', 
    animation: 'bounce 1s infinite' 
  },
  inputArea: { 
    display: 'flex', 
    padding: '6px 8px', 
    gap: '6px', 
    borderTop: '1px solid #e0e0e0' 
  },
  input: { 
    flex: 1, 
    padding: '5px 8px', 
    border: '1px solid #e0e0e0', 
    borderRadius: '14px', 
    outline: 'none', 
    fontSize: '10px' 
  },
  sendBtn: { 
    background: '#667eea', 
    color: 'white', 
    border: 'none', 
    width: '24px', 
    height: '24px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center' 
  },
  resourcesCard: { 
    marginTop: '10px', 
    background: 'rgba(255,255,255,0.95)', 
    borderRadius: '6px', 
    padding: '5px 8px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '5px', 
    fontSize: '8px',
    color: '#555'
  },
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-2px); }
  }
`;
document.head.appendChild(styleSheet);

export default AnonymousChat;