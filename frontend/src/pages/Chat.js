import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { FaPaperPlane, FaRobot, FaUser, FaBrain } from 'react-icons/fa';

function Chat() {
  const [messages, setMessages] = useState([
    { 
      id: 1, 
      text: "Hi 💙 What's on your mind?", 
      isUser: false, 
      time: new Date().toLocaleTimeString() 
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const generateResponse = (userInput) => {
    const msg = userInput.toLowerCase().trim();
    
    if (msg.includes('math') || msg.includes('maths')) {
      return "📐 Maths troubles? Tell me what topic.";
    }
    if (msg.includes('exam') || msg.includes('test')) {
      return "📝 Exams are stressful. When is it?";
    }
    if (msg.includes('study')) {
      return "📚 Try 25 min focus, 5 min break.";
    }
    if (msg.includes('stress') || msg.includes('stressed')) {
      return "🧠 Take a deep breath. What's one thing?";
    }
    if (msg.includes('anxious') || msg.includes('anxiety')) {
      return "🌬️ Name 3 things you see right now.";
    }
    if (msg.includes('sad') || msg.includes('depressed')) {
      return "💙 I'm here. Want to talk about it?";
    }
    if (msg.includes('tired')) {
      return "😴 Rest is important. Take a break.";
    }
    if (msg.includes('sleep')) {
      return "💤 How many hours are you getting?";
    }
    if (msg.includes('friend')) {
      return "👥 Want to share what's happening?";
    }
    if (msg.includes('procrastinate')) {
      return "⏰ Try just 2 minutes of the task.";
    }
    if (msg.match(/^(hi|hello|hey|sup)/)) {
      return "Hey! 👋 What's on your mind?";
    }
    if (msg.includes('thank') || msg.includes('thanks')) {
      return "You're welcome! 💙";
    }
    if (msg.includes('bye')) {
      return "Take care! 💫 Come back anytime.";
    }
    
    return "💙 Tell me more. I'm listening.";
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    
    const userMessage = { 
      id: Date.now(), 
      text: input, 
      isUser: true, 
      time: new Date().toLocaleTimeString() 
    };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const response = generateResponse(userInput);
      const aiMessage = { 
        id: Date.now() + 1, 
        text: response, 
        isUser: false, 
        time: new Date().toLocaleTimeString() 
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}><FaBrain size={14} /> MindEase AI</h1>
          <p style={styles.subtitle}>Your thoughtful companion</p>
        </div>

        <div style={styles.chatContainer}>
          <div style={styles.messagesArea}>
            {messages.map(msg => (
              <div key={msg.id} style={{...styles.message, justifyContent: msg.isUser ? 'flex-end' : 'flex-start'}}>
                <div style={styles.messageWrapper}>
                  {!msg.isUser && <FaRobot size={10} style={styles.avatarIcon} />}
                  <div style={{...styles.messageBubble, background: msg.isUser ? '#667eea' : '#f0f0f0', color: msg.isUser ? 'white' : '#333'}}>
                    <p style={styles.messageText}>{msg.text}</p>
                    <span style={styles.messageTime}>{msg.time}</span>
                  </div>
                  {msg.isUser && <FaUser size={10} style={styles.avatarIcon} />}
                </div>
              </div>
            ))}
            {isTyping && (
              <div style={styles.typingContainer}>
                <div style={styles.typingIndicator}>
                  <div style={styles.typingDot}></div>
                  <div style={styles.typingDot}></div>
                  <div style={styles.typingDot}></div>
                </div>
              </div>
            )}
          </div>
          
          <div style={styles.inputArea}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type your message..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>
              <FaPaperPlane size={11} />
            </button>
          </div>
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
    maxWidth: '550px', 
    margin: '0 auto', 
    padding: '0 16px 20px 16px' 
  },
  header: { 
    textAlign: 'center', 
    marginBottom: '16px', 
    color: 'white' 
  },
  title: { 
    fontSize: '20px', 
    marginBottom: '4px', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '6px' 
  },
  subtitle: {
    fontSize: '11px',
    opacity: 0.8,
  },
  chatContainer: { 
    background: 'white', 
    borderRadius: '20px', 
    height: '480px', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden',
    boxShadow: '0 10px 30px rgba(0,0,0,0.2), 0 0 0 1px rgba(255,255,255,0.1) inset',
    transform: 'translateZ(0)',
  },
  messagesArea: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '16px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '10px' 
  },
  message: { 
    display: 'flex' 
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '5px',
    maxWidth: '85%'
  },
  avatarIcon: {
    color: '#667eea',
    marginBottom: '3px'
  },
  messageBubble: { 
    padding: '8px 12px', 
    borderRadius: '16px',
    maxWidth: '100%',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  },
  messageText: { 
    margin: 0, 
    fontSize: '12px', 
    lineHeight: 1.4,
    whiteSpace: 'pre-wrap'
  },
  messageTime: { 
    fontSize: '8px', 
    opacity: 0.4, 
    display: 'block', 
    marginTop: '5px' 
  },
  typingContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '6px 10px',
    background: '#f0f0f0',
    borderRadius: '16px',
    width: '45px'
  },
  typingIndicator: { 
    display: 'flex', 
    gap: '3px', 
    alignItems: 'center'
  },
  typingDot: { 
    width: '5px', 
    height: '5px', 
    background: '#999', 
    borderRadius: '50%', 
    animation: 'bounce 0.8s infinite' 
  },
  inputArea: { 
    display: 'flex', 
    padding: '12px', 
    gap: '10px', 
    borderTop: '1px solid #eef2f7',
    background: 'white',
    boxShadow: '0 -2px 10px rgba(0,0,0,0.05)',
  },
  input: { 
    flex: 1, 
    padding: '10px 14px', 
    border: '1px solid #e0e0e0', 
    borderRadius: '25px', 
    outline: 'none', 
    fontSize: '12px',
    transition: 'border 0.2s, box-shadow 0.2s',
  },
  sendBtn: { 
    background: '#667eea', 
    color: 'white', 
    border: 'none', 
    width: '34px', 
    height: '34px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: 'transform 0.2s, box-shadow 0.2s',
    boxShadow: '0 2px 8px rgba(102,126,234,0.3)',
  },
};

// Add animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes bounce {
    0%, 60%, 100% { transform: translateY(0); }
    30% { transform: translateY(-2px); }
  }
  
  input:focus {
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102,126,234,0.1);
  }
  
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(102,126,234,0.4);
  }
`;
document.head.appendChild(styleSheet);

export default Chat;