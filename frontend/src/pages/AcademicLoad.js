import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { 
  FaPlus, FaTrash, FaCalendarAlt, FaClock, FaBrain, 
  FaChartLine, FaCheckCircle, FaCircle, FaBook, FaClipboardList,
  FaBriefcase, FaUsers, FaFire, FaSmile, FaMeh, FaFrown
} from 'react-icons/fa';

function AcademicLoad() {
  const [items, setItems] = useState([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [aiInsight, setAiInsight] = useState('');
  const [completionRate, setCompletionRate] = useState(0);
  const [stressLevel, setStressLevel] = useState('medium');
  const [newItem, setNewItem] = useState({
    title: '',
    type: 'exam',
    dueDate: '',
    dueTime: '',
    priority: 'medium',
    completed: false
  });

  useEffect(() => {
    const saved = localStorage.getItem('academicLoad');
    if (saved) {
      const loadedItems = JSON.parse(saved);
      setItems(loadedItems);
      calculateStats(loadedItems);
      generateAIInsight(loadedItems);
    }
  }, []);

  const calculateStats = (taskList) => {
    const completed = taskList.filter(i => i.completed).length;
    const rate = taskList.length > 0 ? Math.round((completed / taskList.length) * 100) : 0;
    setCompletionRate(rate);
    
    const pendingHigh = taskList.filter(i => !i.completed && i.priority === 'high').length;
    if (pendingHigh >= 3) setStressLevel('high');
    else if (pendingHigh >= 1) setStressLevel('medium');
    else setStressLevel('low');
  };

  const generateAIInsight = (taskList) => {
    const pending = taskList.filter(i => !i.completed);
    const highPriority = pending.filter(i => i.priority === 'high');
    const dueSoon = pending.filter(i => {
      if (!i.dueDate) return false;
      const dueDate = new Date(i.dueDate);
      const today = new Date();
      const diffTime = dueDate - today;
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      return diffDays <= 3 && diffDays >= 0;
    });
    
    let insight = '';
    if (pending.length === 0) {
      insight = '🎉 All tasks completed! Take a break.';
    } else if (highPriority.length >= 2) {
      insight = `🧠 ${highPriority.length} high-priority tasks. Stay focused!`;
    } else if (dueSoon.length > 0) {
      insight = `📅 ${dueSoon.length} task(s) due soon.`;
    } else if (pending.length >= 5) {
      insight = `📚 Heavy workload. Take breaks.`;
    } else {
      insight = `💡 You're making progress!`;
    }
    setAiInsight(insight);
  };

  const saveToLocal = (newItems) => {
    setItems(newItems);
    localStorage.setItem('academicLoad', JSON.stringify(newItems));
    calculateStats(newItems);
    generateAIInsight(newItems);
  };

  const addItem = () => {
    if (newItem.title && newItem.dueDate) {
      const newItems = [...items, { ...newItem, id: Date.now() }];
      saveToLocal(newItems);
      setNewItem({ title: '', type: 'exam', dueDate: '', dueTime: '', priority: 'medium', completed: false });
      setShowAddForm(false);
    }
  };

  const toggleComplete = (id) => {
    const newItems = items.map(item => item.id === id ? { ...item, completed: !item.completed } : item);
    saveToLocal(newItems);
  };

  const deleteItem = (id) => {
    const newItems = items.filter(item => item.id !== id);
    saveToLocal(newItems);
  };

  const getTypeIcon = (type) => {
    switch(type) {
      case 'exam': return <FaBook size={12} color="#e74c3c" />;
      case 'assignment': return <FaClipboardList size={12} color="#f39c12" />;
      case 'club': return <FaUsers size={12} color="#2ecc71" />;
      case 'work': return <FaBriefcase size={12} color="#3498db" />;
      default: return <FaBriefcase size={12} />;
    }
  };

  const getTypeLabel = (type) => {
    switch(type) {
      case 'exam': return 'Exam';
      case 'assignment': return 'Assignment';
      case 'club': return 'Club';
      case 'work': return 'Work';
      default: return 'Task';
    }
  };

  const getPriorityColor = (priority) => {
    if (priority === 'high') return '#e74c3c';
    if (priority === 'medium') return '#f39c12';
    return '#2ecc71';
  };

  const getPriorityEmoji = (priority) => {
    if (priority === 'high') return '🔴';
    if (priority === 'medium') return '🟡';
    return '🟢';
  };

  const upcomingItems = items.filter(i => !i.completed).sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate));
  const completedItems = items.filter(i => i.completed);
  
  const getStressIcon = () => {
    if (stressLevel === 'high') return <FaFrown size={16} color="#e74c3c" />;
    if (stressLevel === 'medium') return <FaMeh size={16} color="#f39c12" />;
    return <FaSmile size={16} color="#2ecc71" />;
  };

  const types = [
    { value: 'exam', label: '📚', name: 'Exam', color: '#e74c3c' },
    { value: 'assignment', label: '📝', name: 'Assignment', color: '#f39c12' },
    { value: 'club', label: '👥', name: 'Club', color: '#2ecc71' },
    { value: 'work', label: '💼', name: 'Work', color: '#3498db' },
  ];

  return (
    <div style={styles.container}>
      <Navbar />
      <div style={styles.navSpacer} />
      
      <div style={styles.content}>
        <div style={styles.header}>
          <h1 style={styles.title}>📚 Academic Load</h1>
        </div>

        <div style={styles.aiCard}>
          <FaBrain size={14} color="#667eea" />
          <span style={styles.aiText}>{aiInsight || "Loading..."}</span>
        </div>

        <div style={styles.statsRow}>
          <div style={styles.statCard}>
            <FaFire size={14} color="#e74c3c" />
            <div style={styles.statNumber}>{items.filter(i => !i.completed).length}</div>
            <div style={styles.statLabel}>Pending</div>
          </div>
          <div style={styles.statCard}>
            <FaCheckCircle size={14} color="#2ecc71" />
            <div style={styles.statNumber}>{completedItems.length}</div>
            <div style={styles.statLabel}>Done</div>
          </div>
          <div style={styles.statCard}>
            <FaChartLine size={14} color="#3498db" />
            <div style={styles.statNumber}>{items.length}</div>
            <div style={styles.statLabel}>Total</div>
          </div>
          <div style={styles.statCard}>
            {getStressIcon()}
            <div style={styles.statNumber}>{completionRate}%</div>
            <div style={styles.statLabel}>Progress</div>
          </div>
        </div>

        <div style={styles.progressCard}>
          <div style={styles.progressBarBg}>
            <div style={{...styles.progressBarFill, width: `${completionRate}%`}} />
          </div>
        </div>

        <button onClick={() => setShowAddForm(true)} style={styles.addBtn}>
          <FaPlus size={12} /> Add Task
        </button>

        <div style={styles.taskSection}>
          <h3 style={styles.sectionTitle}>⏰ Upcoming</h3>
          {upcomingItems.length === 0 && <div style={styles.emptyState}>✨ No pending tasks</div>}
          {upcomingItems.map(item => (
            <div key={item.id} style={{...styles.taskItem, borderLeft: `3px solid ${getPriorityColor(item.priority)}`}}>
              <div style={styles.taskLeft}>
                <div onClick={() => toggleComplete(item.id)} style={styles.checkbox}>
                  {item.completed ? <FaCheckCircle color="#2ecc71" size={14} /> : <FaCircle color="#ccc" size={14} />}
                </div>
                <div style={styles.taskIcon}>{getTypeIcon(item.type)}</div>
                <div style={styles.taskInfo}>
                  <div style={styles.taskTitle}>
                    <span style={styles.taskName}>{getTypeLabel(item.type)}: {item.title}</span>
                    <span style={styles.taskPriority}>{getPriorityEmoji(item.priority)}</span>
                  </div>
                  <div style={styles.taskDate}>
                    <FaCalendarAlt size={8} color="#999" />
                    <span>{new Date(item.dueDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}><FaTrash size={12} /></button>
            </div>
          ))}
        </div>

        {completedItems.length > 0 && (
          <div style={styles.taskSection}>
            <h3 style={styles.sectionTitle}>✅ Completed ({completedItems.length})</h3>
            {completedItems.slice(0, 3).map(item => (
              <div key={item.id} style={{...styles.taskItem, opacity: 0.6, background: '#f0fff0'}}>
                <div style={styles.taskLeft}>
                  <div onClick={() => toggleComplete(item.id)} style={styles.checkbox}>
                    <FaCheckCircle color="#2ecc71" size={14} />
                  </div>
                  <div style={styles.taskIcon}>{getTypeIcon(item.type)}</div>
                  <div style={styles.taskInfo}>
                    <span style={{...styles.taskName, textDecoration: 'line-through'}}>{item.title}</span>
                  </div>
                </div>
                <button onClick={() => deleteItem(item.id)} style={styles.deleteBtn}><FaTrash size={12} /></button>
              </div>
            ))}
          </div>
        )}

        {/* COMPACT SMALL MODAL */}
        {showAddForm && (
          <div style={styles.modal} onClick={() => setShowAddForm(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <h3 style={styles.modalTitle}>New Task</h3>
              
              <input 
                type="text" 
                placeholder="Task name" 
                value={newItem.title} 
                onChange={(e) => setNewItem({...newItem, title: e.target.value})} 
                style={styles.modalInput} 
              />
              
              <div style={styles.typeRow}>
                {types.map(t => (
                  <button 
                    key={t.value} 
                    onClick={() => setNewItem({...newItem, type: t.value})} 
                    style={{...styles.typeBtn, background: newItem.type === t.value ? t.color : '#f0f0f0', color: newItem.type === t.value ? 'white' : '#555'}}
                  >
                    {t.label} {t.name}
                  </button>
                ))}
              </div>
              
              <input 
                type="date" 
                value={newItem.dueDate} 
                onChange={(e) => setNewItem({...newItem, dueDate: e.target.value})} 
                style={styles.modalInput} 
              />
              
              <div style={styles.priorityRow}>
                <button onClick={() => setNewItem({...newItem, priority: 'low'})} style={{...styles.priorityBtn, background: newItem.priority === 'low' ? '#2ecc71' : '#f0f0f0', color: newItem.priority === 'low' ? 'white' : '#555'}}>Low</button>
                <button onClick={() => setNewItem({...newItem, priority: 'medium'})} style={{...styles.priorityBtn, background: newItem.priority === 'medium' ? '#f39c12' : '#f0f0f0', color: newItem.priority === 'medium' ? 'white' : '#555'}}>Medium</button>
                <button onClick={() => setNewItem({...newItem, priority: 'high'})} style={{...styles.priorityBtn, background: newItem.priority === 'high' ? '#e74c3c' : '#f0f0f0', color: newItem.priority === 'high' ? 'white' : '#555'}}>High</button>
              </div>
              
              <div style={styles.modalActions}>
                <button onClick={addItem} style={styles.saveBtn}>Save</button>
                <button onClick={() => setShowAddForm(false)} style={styles.cancelBtn}>Cancel</button>
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
    background: '#f5f7fa',
  },
  navSpacer: {
    height: '52px',
  },
  content: {
    maxWidth: '550px',
    margin: '0 auto',
    padding: '0 16px 20px 16px',
  },
  
  header: {
    textAlign: 'center',
    marginBottom: '16px',
  },
  title: {
    fontSize: '22px',
    fontWeight: '700',
    color: '#333',
  },
  
  aiCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px 12px',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  aiText: {
    fontSize: '11px',
    color: '#555',
    flex: 1,
  },
  
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '8px',
    marginBottom: '12px',
  },
  statCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px 4px',
    textAlign: 'center',
  },
  statNumber: {
    fontSize: '18px',
    fontWeight: 'bold',
    color: '#333',
    margin: '4px 0 2px 0',
  },
  statLabel: {
    fontSize: '9px',
    color: '#888',
  },
  
  progressCard: {
    background: 'white',
    borderRadius: '10px',
    padding: '8px',
    marginBottom: '16px',
  },
  progressBarBg: {
    height: '6px',
    background: '#e0e0e0',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #667eea, #764ba2)',
    borderRadius: '10px',
    transition: 'width 0.3s ease',
  },
  
  addBtn: {
    width: '100%',
    padding: '10px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '25px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '6px',
    marginBottom: '16px',
  },
  
  taskSection: {
    background: 'white',
    borderRadius: '14px',
    padding: '12px',
    marginBottom: '12px',
  },
  sectionTitle: {
    fontSize: '13px',
    fontWeight: '600',
    color: '#333',
    marginBottom: '10px',
  },
  taskItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '8px',
    marginBottom: '6px',
    background: '#fafafa',
    borderRadius: '8px',
  },
  taskLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flex: 1,
  },
  checkbox: {
    cursor: 'pointer',
  },
  taskIcon: {
    width: '20px',
  },
  taskInfo: {
    flex: 1,
  },
  taskTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    marginBottom: '2px',
  },
  taskName: {
    fontSize: '12px',
    fontWeight: '500',
    color: '#333',
  },
  taskPriority: {
    fontSize: '9px',
  },
  taskDate: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    fontSize: '9px',
    color: '#999',
  },
  deleteBtn: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    opacity: 0.4,
  },
  emptyState: {
    textAlign: 'center',
    padding: '16px',
    color: '#999',
    fontSize: '11px',
  },
  
  // COMPACT MODAL
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
    borderRadius: '16px',
    padding: '16px',
    width: '280px',
  },
  modalTitle: {
    fontSize: '16px',
    fontWeight: '600',
    marginBottom: '12px',
    textAlign: 'center',
  },
  modalInput: {
    width: '100%',
    padding: '8px',
    marginBottom: '10px',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    outline: 'none',
    fontSize: '12px',
  },
  typeRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '6px',
    marginBottom: '10px',
  },
  typeBtn: {
    padding: '6px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '10px',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '4px',
  },
  priorityRow: {
    display: 'flex',
    gap: '6px',
    marginBottom: '15px',
  },
  priorityBtn: {
    flex: 1,
    padding: '6px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '10px',
    border: 'none',
  },
  modalActions: {
    display: 'flex',
    gap: '8px',
  },
  saveBtn: {
    flex: 1,
    padding: '8px',
    background: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
  cancelBtn: {
    flex: 1,
    padding: '8px',
    background: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '12px',
    fontWeight: '600',
  },
};

export default AcademicLoad;