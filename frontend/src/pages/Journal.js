import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { 
  FaSave, FaTrash, FaEdit, FaHeart, FaBrain, FaSmile, 
  FaMoon, FaSun, FaCalendarAlt, FaQuoteRight, FaTags,
  FaSearch, FaFilter, FaTimes, FaStar, FaRegStar,
  FaBookOpen, FaPenFancy, FaSpinner, FaCheckCircle, FaArrowLeft
} from 'react-icons/fa';

function Journal() {
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [showEditor, setShowEditor] = useState(false);
  const [currentEntry, setCurrentEntry] = useState({
    id: null,
    title: '',
    content: '',
    mood: '',
    tags: [],
    date: new Date().toISOString().split('T')[0],
    favorite: false
  });
  const [tagInput, setTagInput] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterMood, setFilterMood] = useState('all');
  const [viewingEntry, setViewingEntry] = useState(null);
  const [quote, setQuote] = useState('');

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Happy', color: '#f1c40f', bg: '#f1c40f15' },
    { value: 'calm', emoji: '😌', label: 'Calm', color: '#2ecc71', bg: '#2ecc7115' },
    { value: 'sad', emoji: '😔', label: 'Sad', color: '#3498db', bg: '#3498db15' },
    { value: 'anxious', emoji: '😰', label: 'Anxious', color: '#e67e22', bg: '#e67e2215' },
    { value: 'angry', emoji: '😤', label: 'Angry', color: '#e74c3c', bg: '#e74c3c15' },
    { value: 'grateful', emoji: '🙏', label: 'Grateful', color: '#9b59b6', bg: '#9b59b615' },
    { value: 'hopeful', emoji: '🌟', label: 'Hopeful', color: '#1abc9c', bg: '#1abc9c15' },
    { value: 'tired', emoji: '😴', label: 'Tired', color: '#95a5a6', bg: '#95a5a615' },
  ];

  const quotes = [
    "The darkest night is often the bridge to the brightest tomorrow.",
    "You are enough. You have always been enough.",
    "This too shall pass.",
    "Small steps every day lead to big changes.",
    "Your feelings are valid. All of them.",
    "Healing is not linear, but you're moving forward.",
    "Be kind to yourself. You're doing the best you can.",
    "Every day is a new beginning."
  ];

  useEffect(() => {
    const saved = localStorage.getItem('journalEntries');
    if (saved) {
      setEntries(JSON.parse(saved));
    }
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  const saveEntries = (newEntries) => {
    setEntries(newEntries);
    localStorage.setItem('journalEntries', JSON.stringify(newEntries));
  };

  const saveEntry = () => {
    if (!currentEntry.title || !currentEntry.content) {
      alert('Please add a title and content');
      return;
    }

    let newEntries;
    if (currentEntry.id) {
      newEntries = entries.map(entry => 
        entry.id === currentEntry.id ? { ...currentEntry, updatedAt: new Date().toISOString() } : entry
      );
    } else {
      newEntries = [{ ...currentEntry, id: Date.now(), createdAt: new Date().toISOString() }, ...entries];
    }
    
    saveEntries(newEntries);
    setShowEditor(false);
    setCurrentEntry({
      id: null,
      title: '',
      content: '',
      mood: '',
      tags: [],
      date: new Date().toISOString().split('T')[0],
      favorite: false
    });
  };

  const deleteEntry = (id) => {
    if (window.confirm('Are you sure you want to delete this entry?')) {
      const newEntries = entries.filter(entry => entry.id !== id);
      saveEntries(newEntries);
      setViewingEntry(null);
    }
  };

  const toggleFavorite = (id) => {
    const newEntries = entries.map(entry => 
      entry.id === id ? { ...entry, favorite: !entry.favorite } : entry
    );
    saveEntries(newEntries);
  };

  const addTag = () => {
    if (tagInput.trim() && !currentEntry.tags.includes(tagInput.trim())) {
      setCurrentEntry({ ...currentEntry, tags: [...currentEntry.tags, tagInput.trim()] });
      setTagInput('');
    }
  };

  const removeTag = (tag) => {
    setCurrentEntry({ ...currentEntry, tags: currentEntry.tags.filter(t => t !== tag) });
  };

  const getMoodEmoji = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.emoji : '📝';
  };

  const getMoodColor = (moodValue) => {
    const mood = moods.find(m => m.value === moodValue);
    return mood ? mood.color : '#999';
  };

  const filteredEntries = entries
    .filter(entry => {
      if (filterMood !== 'all' && entry.mood !== filterMood) return false;
      if (searchTerm) {
        return entry.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
               entry.content.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return true;
    })
    .sort((a, b) => {
      if (a.favorite && !b.favorite) return -1;
      if (!a.favorite && b.favorite) return 1;
      return new Date(b.date) - new Date(a.date);
    });

  const stats = {
    total: entries.length,
    thisMonth: entries.filter(e => {
      const entryDate = new Date(e.date);
      const now = new Date();
      return entryDate.getMonth() === now.getMonth() && entryDate.getFullYear() === now.getFullYear();
    }).length,
    favorite: entries.filter(e => e.favorite).length
  };

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <button onClick={() => navigate('/dashboard')} style={styles.backBtn}>
          <FaArrowLeft size={12} /> Back to Home
        </button>
        
        <div style={styles.header}>
          <h1 style={styles.title}><FaBookOpen size={24} /> Journal</h1>
          <p style={styles.subtitle}>Write your thoughts, track your feelings</p>
        </div>

        {/* Stats Row */}
        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.total}</div>
            <div style={styles.statLabel}>Total Entries</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.thisMonth}</div>
            <div style={styles.statLabel}>This Month</div>
          </div>
          <div style={styles.statCard}>
            <div style={styles.statValue}>{stats.favorite}</div>
            <div style={styles.statLabel}>Favorites</div>
          </div>
        </div>

        {/* Quote of the Day */}
        <div style={styles.quoteCard}>
          <FaQuoteRight size={16} color="#667eea" />
          <p style={styles.quoteText}>"{quote}"</p>
        </div>

        {/* Search & Filter Bar */}
        <div style={styles.searchBar}>
          <div style={styles.searchInputWrapper}>
            <FaSearch size={12} color="#999" />
            <input
              type="text"
              placeholder="Search journal..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={styles.searchInput}
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} style={styles.clearSearchBtn}>
                <FaTimes size={10} />
              </button>
            )}
          </div>
          <select value={filterMood} onChange={(e) => setFilterMood(e.target.value)} style={styles.filterSelect}>
            <option value="all">All moods</option>
            {moods.map(m => (
              <option key={m.value} value={m.value}>{m.emoji} {m.label}</option>
            ))}
          </select>
        </div>

        {/* New Entry Button */}
        <button onClick={() => { setShowEditor(true); setViewingEntry(null); }} style={styles.newEntryBtn}>
          <FaPenFancy size={14} /> Write New Entry
        </button>

        {/* Journal Entries Grid */}
        <div style={styles.entriesGrid}>
          {filteredEntries.length === 0 && (
            <div style={styles.emptyState}>
              <div style={styles.emptyIcon}>📖</div>
              <p>No entries yet. Start writing your first journal!</p>
              <button onClick={() => setShowEditor(true)} style={styles.emptyBtn}>Create First Entry</button>
            </div>
          )}
          
          {filteredEntries.map(entry => (
            <div key={entry.id} style={styles.entryCard}>
              <div style={styles.entryHeader}>
                <div style={styles.entryDate}>
                  <FaCalendarAlt size={10} color="#999" />
                  <span>{new Date(entry.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div style={styles.entryActions}>
                  <button onClick={() => toggleFavorite(entry.id)} style={styles.favBtn}>
                    {entry.favorite ? <FaStar color="#f1c40f" size={14} /> : <FaRegStar color="#ccc" size={14} />}
                  </button>
                  <button onClick={() => deleteEntry(entry.id)} style={styles.deleteEntryBtn}>
                    <FaTrash size={12} />
                  </button>
                </div>
              </div>
              <div style={styles.entryMood}>
                <span style={{...styles.moodBadge, background: getMoodColor(entry.mood) + '15', color: getMoodColor(entry.mood)}}>
                  {getMoodEmoji(entry.mood)} {entry.mood}
                </span>
              </div>
              <h3 style={styles.entryTitle}>{entry.title}</h3>
              <p style={styles.entryPreview}>{entry.content.substring(0, 120)}...</p>
              {entry.tags.length > 0 && (
                <div style={styles.entryTags}>
                  {entry.tags.slice(0, 3).map(tag => (
                    <span key={tag} style={styles.entryTag}>#{tag}</span>
                  ))}
                  {entry.tags.length > 3 && <span style={styles.entryTag}>+{entry.tags.length - 3}</span>}
                </div>
              )}
              <button onClick={() => setViewingEntry(entry)} style={styles.readMoreBtn}>
                Read More →
              </button>
            </div>
          ))}
        </div>

        {/* Journal Editor Modal */}
        {showEditor && (
          <div style={styles.modal} onClick={() => setShowEditor(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3>{currentEntry.id ? <FaEdit /> : <FaPenFancy />} {currentEntry.id ? 'Edit Entry' : 'New Journal Entry'}</h3>
                <button onClick={() => setShowEditor(false)} style={styles.closeModalBtn}>✕</button>
              </div>
              
              <input
                type="text"
                placeholder="Entry title..."
                value={currentEntry.title}
                onChange={(e) => setCurrentEntry({ ...currentEntry, title: e.target.value })}
                style={styles.modalInput}
              />
              
              <div style={styles.moodSelector}>
                <span style={styles.moodLabel}>How are you feeling?</span>
                <div style={styles.moodGrid}>
                  {moods.map(m => (
                    <button
                      key={m.value}
                      onClick={() => setCurrentEntry({ ...currentEntry, mood: m.value })}
                      style={{...styles.moodOption, background: currentEntry.mood === m.value ? m.color : '#f5f5f5', color: currentEntry.mood === m.value ? 'white' : '#555'}}
                    >
                      {m.emoji} {m.label}
                    </button>
                  ))}
                </div>
              </div>
              
              <textarea
                placeholder="Write your thoughts here... What happened today? How are you feeling? What are you grateful for?"
                value={currentEntry.content}
                onChange={(e) => setCurrentEntry({ ...currentEntry, content: e.target.value })}
                style={styles.modalTextarea}
                rows="8"
              />
              
              <div style={styles.tagSection}>
                <div style={styles.tagInputWrapper}>
                  <FaTags size={12} color="#999" />
                  <input
                    type="text"
                    placeholder="Add tags (e.g., gratitude, stress, happy)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && addTag()}
                    style={styles.tagInput}
                  />
                  <button onClick={addTag} style={styles.addTagBtn}>Add</button>
                </div>
                <div style={styles.tagsList}>
                  {currentEntry.tags.map(tag => (
                    <span key={tag} style={styles.tag}>
                      #{tag}
                      <button onClick={() => removeTag(tag)} style={styles.removeTagBtn}>✕</button>
                    </span>
                  ))}
                </div>
              </div>
              
              <div style={styles.modalActions}>
                <button onClick={saveEntry} style={styles.saveEntryBtn}>
                  <FaSave size={12} /> Save Entry
                </button>
              </div>
            </div>
          </div>
        )}

        {/* View Entry Modal */}
        {viewingEntry && (
          <div style={styles.modal} onClick={() => setViewingEntry(null)}>
            <div style={styles.viewModalContent} onClick={(e) => e.stopPropagation()}>
              <div style={styles.modalHeader}>
                <h3>{viewingEntry.title}</h3>
                <button onClick={() => setViewingEntry(null)} style={styles.closeModalBtn}>✕</button>
              </div>
              <div style={styles.viewMeta}>
                <span><FaCalendarAlt size={10} /> {new Date(viewingEntry.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                <span style={{...styles.viewMood, background: getMoodColor(viewingEntry.mood) + '15', color: getMoodColor(viewingEntry.mood)}}>
                  {getMoodEmoji(viewingEntry.mood)} {viewingEntry.mood}
                </span>
              </div>
              <div style={styles.viewContent}>
                <p>{viewingEntry.content}</p>
              </div>
              {viewingEntry.tags.length > 0 && (
                <div style={styles.viewTags}>
                  {viewingEntry.tags.map(tag => (
                    <span key={tag} style={styles.viewTag}>#{tag}</span>
                  ))}
                </div>
              )}
              <div style={styles.viewActions}>
                <button onClick={() => {
                  setCurrentEntry(viewingEntry);
                  setShowEditor(true);
                  setViewingEntry(null);
                }} style={styles.editViewBtn}>
                  <FaEdit /> Edit
                </button>
                <button onClick={() => deleteEntry(viewingEntry.id)} style={styles.deleteViewBtn}>
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
  navSpacer: {
    height: '52px',
  },
  content: {
    maxWidth: '700px',
    margin: '0 auto',
    padding: '0 16px 24px 16px',
  },
  backBtn: {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '20px',
    cursor: 'pointer',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '12px',
    marginBottom: '16px',
  },
  header: {
    textAlign: 'center',
    marginBottom: '24px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    marginBottom: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '10px',
  },
  subtitle: {
    fontSize: '12px',
    opacity: 0.8,
  },
  
  // Stats Row
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(3, 1fr)',
    gap: '12px',
    marginBottom: '20px',
  },
  statCard: {
    background: 'rgba(255,255,255,0.95)',
    borderRadius: '16px',
    padding: '12px',
    textAlign: 'center',
  },
  statValue: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#667eea',
  },
  statLabel: {
    fontSize: '10px',
    color: '#888',
    marginTop: '4px',
  },
  
  // Quote Card
  quoteCard: {
    background: 'rgba(255,255,255,0.9)',
    borderRadius: '16px',
    padding: '12px 16px',
    marginBottom: '20px',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },
  quoteText: {
    fontSize: '12px',
    color: '#555',
    fontStyle: 'italic',
    margin: 0,
  },
  
  // Search Bar
  searchBar: {
    display: 'flex',
    gap: '10px',
    marginBottom: '16px',
  },
  searchInputWrapper: {
    flex: 2,
    display: 'flex',
    alignItems: 'center',
    background: 'white',
    borderRadius: '30px',
    padding: '8px 14px',
    gap: '8px',
  },
  searchInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '12px',
  },
  clearSearchBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#999',
  },
  filterSelect: {
    flex: 1,
    padding: '8px 12px',
    borderRadius: '30px',
    border: 'none',
    fontSize: '11px',
    background: 'white',
    cursor: 'pointer',
  },
  
  // New Entry Button
  newEntryBtn: {
    width: '100%',
    padding: '14px',
    background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '40px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    marginBottom: '24px',
    boxShadow: '0 4px 15px rgba(245,87,108,0.3)',
    transition: 'transform 0.2s',
  },
  
  // Entries Grid
  entriesGrid: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  entryCard: {
    background: 'white',
    borderRadius: '20px',
    padding: '18px',
    transition: 'transform 0.2s, box-shadow 0.2s',
    cursor: 'pointer',
  },
  entryHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '10px',
  },
  entryDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    fontSize: '10px',
    color: '#999',
  },
  entryActions: {
    display: 'flex',
    gap: '10px',
  },
  favBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
  },
  deleteEntryBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.4,
    transition: 'opacity 0.2s',
  },
  entryMood: {
    marginBottom: '10px',
  },
  moodBadge: {
    padding: '4px 12px',
    borderRadius: '20px',
    fontSize: '11px',
    display: 'inline-block',
  },
  entryTitle: {
    fontSize: '17px',
    fontWeight: '600',
    marginBottom: '8px',
    color: '#333',
  },
  entryPreview: {
    fontSize: '12px',
    color: '#666',
    lineHeight: 1.4,
    marginBottom: '10px',
  },
  entryTags: {
    display: 'flex',
    gap: '6px',
    flexWrap: 'wrap',
    marginBottom: '12px',
  },
  entryTag: {
    fontSize: '9px',
    color: '#667eea',
    background: '#f0f0ff',
    padding: '2px 8px',
    borderRadius: '12px',
  },
  readMoreBtn: {
    background: 'none',
    border: 'none',
    color: '#667eea',
    fontSize: '11px',
    cursor: 'pointer',
    padding: 0,
    fontWeight: '500',
  },
  
  // Empty State
  emptyState: {
    textAlign: 'center',
    padding: '50px 20px',
    background: 'white',
    borderRadius: '20px',
  },
  emptyIcon: {
    fontSize: '48px',
    marginBottom: '16px',
  },
  emptyBtn: {
    marginTop: '16px',
    padding: '8px 20px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    cursor: 'pointer',
    fontSize: '12px',
  },
  
  // Modal
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
    borderRadius: '24px',
    padding: '24px',
    width: '550px',
    maxWidth: '90%',
    maxHeight: '85vh',
    overflowY: 'auto',
  },
  viewModalContent: {
    background: 'white',
    borderRadius: '24px',
    padding: '24px',
    width: '550px',
    maxWidth: '90%',
  },
  modalHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  closeModalBtn: {
    background: 'none',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    color: '#999',
  },
  modalInput: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '14px',
    marginBottom: '16px',
  },
  moodSelector: {
    marginBottom: '16px',
  },
  moodLabel: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#666',
    marginBottom: '8px',
    display: 'block',
  },
  moodGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
  },
  moodOption: {
    padding: '6px',
    borderRadius: '20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '11px',
    transition: 'all 0.2s',
  },
  modalTextarea: {
    width: '100%',
    padding: '12px',
    border: '2px solid #e0e0e0',
    borderRadius: '12px',
    outline: 'none',
    fontSize: '13px',
    fontFamily: 'inherit',
    resize: 'vertical',
    marginBottom: '16px',
  },
  tagSection: {
    marginBottom: '20px',
  },
  tagInputWrapper: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '10px',
    padding: '6px 12px',
    border: '2px solid #e0e0e0',
    borderRadius: '30px',
  },
  tagInput: {
    flex: 1,
    border: 'none',
    outline: 'none',
    fontSize: '12px',
  },
  addTagBtn: {
    padding: '4px 12px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '11px',
  },
  tagsList: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  tag: {
    background: '#f0f0ff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  },
  removeTagBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    fontSize: '10px',
    color: '#999',
  },
  modalActions: {
    display: 'flex',
    gap: '12px',
  },
  saveEntryBtn: {
    flex: 1,
    padding: '12px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '12px',
    cursor: 'pointer',
    fontWeight: '600',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
  },
  viewMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
    paddingBottom: '12px',
    borderBottom: '1px solid #f0f0f0',
  },
  viewMood: {
    padding: '4px 10px',
    borderRadius: '20px',
    fontSize: '11px',
  },
  viewContent: {
    marginBottom: '20px',
    lineHeight: 1.6,
    fontSize: '14px',
    color: '#333',
    whiteSpace: 'pre-wrap',
  },
  viewTags: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
    marginBottom: '20px',
  },
  viewTag: {
    background: '#f0f0ff',
    padding: '4px 8px',
    borderRadius: '12px',
    fontSize: '11px',
    color: '#667eea',
  },
  viewActions: {
    display: 'flex',
    gap: '12px',
  },
  editViewBtn: {
    flex: 1,
    padding: '10px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '12px',
  },
  deleteViewBtn: {
    flex: 1,
    padding: '10px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    fontSize: '12px',
  },
};

export default Journal;