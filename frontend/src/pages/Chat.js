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
          <h1 style={styles.title}><FaBrain size={12} /> MindEase</h1>
        </div>

        <div style={styles.chatContainer}>
          <div style={styles.messagesArea}>
            {messages.map(msg => (
              <div key={msg.id} style={{...styles.message, justifyContent: msg.isUser ? 'flex-end' : 'flex-start'}}>
                <div style={styles.messageWrapper}>
                  {!msg.isUser && <FaRobot size={8} style={styles.avatarIcon} />}
                  <div style={{...styles.messageBubble, background: msg.isUser ? '#667eea' : '#f0f0f0', color: msg.isUser ? 'white' : '#333'}}>
                    <p style={styles.messageText}>{msg.text}</p>
                    <span style={styles.messageTime}>{msg.time}</span>
                  </div>
                  {msg.isUser && <FaUser size={8} style={styles.avatarIcon} />}
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
              placeholder="Message..."
              style={styles.input}
            />
            <button onClick={sendMessage} style={styles.sendBtn}>
              <FaPaperPlane size={9} />
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
    marginBottom: '0', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center', 
    gap: '5px' 
  },
  chatContainer: { 
    background: 'white', 
    borderRadius: '12px', 
    height: '320px', 
    display: 'flex', 
    flexDirection: 'column', 
    overflow: 'hidden',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  messagesArea: { 
    flex: 1, 
    overflowY: 'auto', 
    padding: '10px', 
    display: 'flex', 
    flexDirection: 'column', 
    gap: '6px' 
  },
  message: { 
    display: 'flex' 
  },
  messageWrapper: {
    display: 'flex',
    alignItems: 'flex-end',
    gap: '3px',
    maxWidth: '85%'
  },
  avatarIcon: {
    color: '#667eea',
    marginBottom: '2px'
  },
  messageBubble: { 
    padding: '5px 8px', 
    borderRadius: '12px',
    maxWidth: '100%'
  },
  messageText: { 
    margin: 0, 
    fontSize: '10px', 
    lineHeight: 1.3,
    whiteSpace: 'pre-wrap'
  },
  messageTime: { 
    fontSize: '7px', 
    opacity: 0.4, 
    display: 'block', 
    marginTop: '3px' 
  },
  typingContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: '4px 8px',
    background: '#f0f0f0',
    borderRadius: '12px',
    width: '35px'
  },
  typingIndicator: { 
    display: 'flex', 
    gap: '2px', 
    alignItems: 'center'
  },
  typingDot: { 
    width: '4px', 
    height: '4px', 
    background: '#999', 
    borderRadius: '50%', 
    animation: 'bounce 0.8s infinite' 
  },
  inputArea: { 
    display: 'flex', 
    padding: '8px', 
    gap: '6px', 
    borderTop: '1px solid #eef2f7',
    background: 'white'
  },
  input: { 
    flex: 1, 
    padding: '6px 10px', 
    border: '1px solid #e0e0e0', 
    borderRadius: '18px', 
    outline: 'none', 
    fontSize: '10px',
    transition: 'border 0.2s'
  },
  sendBtn: { 
    background: '#667eea', 
    color: 'white', 
    border: 'none', 
    width: '26px', 
    height: '26px', 
    borderRadius: '50%', 
    cursor: 'pointer', 
    display: 'flex', 
    alignItems: 'center', 
    justifyContent: 'center',
    transition: 'transform 0.2s'
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
  }
  
  button:hover {
    transform: scale(1.05);
  }
`;
document.head.appendChild(styleSheet);

export default Chat;