import React, { useState } from 'react';
import { FaPaperPlane, FaRobot, FaUser } from 'react-icons/fa';

function ChatBot() {
  const [messages, setMessages] = useState([
    { type: 'ai', text: "Hi! I'm your AI mental wellness companion. How are you feeling today? 💙" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const getAIResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('sad') || msg.includes('depressed')) {
      return "I'm sorry you're feeling sad. Remember that it's okay to feel this way. Would you like to try a breathing exercise together? 🌸";
    }
    if (msg.includes('stress') || msg.includes('overwhelm')) {
      return "Take a deep breath. Let's break down what's stressing you. You're not alone in this. Would you like to talk about it? 🧘";
    }
    if (msg.includes('anxious') || msg.includes('worry')) {
      return "I hear you. Let's try grounding together: Name 3 things you can see right now. Take your time... 💫";
    }
    if (msg.includes('happy') || msg.includes('good')) {
      return "That's wonderful to hear! Remember this feeling. You deserve happiness and peace. 🌟";
    }
    if (msg.includes('tired') || msg.includes('exhausted')) {
      return "Rest is productive too. Maybe take a 5-minute break? Your well-being comes first. 💤";
    }
    if (msg.includes('study') || msg.includes('exam')) {
      return "Break your study into 25-minute chunks using our focus timer. You've got this! 📚";
    }
    if (msg.includes('breath')) {
      return "Let's breathe together: Inhale for 4 seconds... Hold for 4... Exhale for 4... Feel better? 🌬️";
    }
    
    return "Thank you for sharing. I'm here to listen. Would you like to try a quick mindfulness exercise or talk more about how you're feeling? 💙";
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = { type: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    setTimeout(() => {
      const aiResponse = getAIResponse(input);
      setMessages(prev => [...prev, { type: 'ai', text: aiResponse }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatArea}>
        {messages.map((msg, index) => (
          <div key={index} style={msg.type === 'user' ? styles.userMsg : styles.aiMsg}>
            <div style={styles.messageContent}>
              {msg.type === 'ai' && <FaRobot style={styles.avatar} />}
              <div style={msg.type === 'user' ? styles.userBubble : styles.aiBubble}>
                {msg.text}
              </div>
              {msg.type === 'user' && <FaUser style={styles.avatar} />}
            </div>
          </div>
        ))}
        {isTyping && (
          <div style={styles.aiMsg}>
            <div style={styles.messageContent}>
              <FaRobot style={styles.avatar} />
              <div style={styles.aiBubble}>
                <span style={styles.typing}>...</span>
              </div>
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
          placeholder="Type your message here..."
          style={styles.input}
        />
        <button onClick={sendMessage} style={styles.sendBtn}>
          <FaPaperPlane />
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    background: 'white',
    borderRadius: '20px',
    height: '500px',
    display: 'flex',
    flexDirection: 'column',
    overflow: 'hidden',
  },
  chatArea: {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  userMsg: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  aiMsg: {
    display: 'flex',
    justifyContent: 'flex-start',
  },
  messageContent: {
    display: 'flex',
    gap: '10px',
    alignItems: 'flex-start',
    maxWidth: '70%',
  },
  userBubble: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '10px 15px',
    borderRadius: '20px',
    borderTopRightRadius: '5px',
    fontSize: '14px',
  },
  aiBubble: {
    background: '#f0f0f0',
    color: '#333',
    padding: '10px 15px',
    borderRadius: '20px',
    borderTopLeftRadius: '5px',
    fontSize: '14px',
  },
  avatar: {
    fontSize: '24px',
    color: '#667eea',
  },
  typing: {
    animation: 'pulse 1s infinite',
  },
  inputArea: {
    display: 'flex',
    padding: '20px',
    gap: '10px',
    borderTop: '1px solid #e0e0e0',
  },
  input: {
    flex: 1,
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '25px',
    outline: 'none',
    fontSize: '14px',
  },
  sendBtn: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};

export default ChatBot;