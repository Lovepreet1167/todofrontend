import React, { useState } from 'react';

const TodoCard = ({ todo, onStatusChange, onDelete, onEdit }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(todo.text);

  const handleSave = () => {
    if (editedText.trim()) {
      onEdit(todo.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div style={styles.card}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedText}
            onChange={(e) => setEditedText(e.target.value)}
            style={styles.editInput}
          />
          <div style={styles.buttons}>
            <button onClick={handleSave} style={styles.saveBtn}>Save</button>
            <button onClick={() => setIsEditing(false)} style={styles.cancelBtn}>Cancel</button>
          </div>
        </>
      ) : (
        <>
          <h4 style={{
            textDecoration: todo.status === 'done' ? 'line-through' : 'none',
            color: todo.status === 'done' ? '#4caf50' : '#333'
          }}>
            {todo.text}
          </h4>
          <p>Status: {todo.status}</p>
          <div style={styles.buttons}>
            <button onClick={() => onStatusChange(todo.id)} style={styles.toggleBtn}>
              {todo.status === 'pending' ? 'Mark as Done' : 'Mark as Pending'}
            </button>
            <button onClick={() => setIsEditing(true)} style={styles.editBtn}>
              Edit
            </button>
            <button onClick={() => onDelete(todo.id)} style={styles.deleteBtn}>
              Delete
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const styles = {
  card: {
    padding: '1rem',
    backgroundColor: '#fff',
    marginTop: '1rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  },
  buttons: {
    marginTop: '0.5rem',
    display: 'flex',
    gap: '0.5rem',
    flexWrap: 'wrap'
  },
  toggleBtn: {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  editBtn: {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#f0ad4e',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  deleteBtn: {
    padding: '0.3rem 0.7rem',
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  editInput: {
    width: '100%',
    padding: '0.5rem',
    border: '1px solid #ccc',
    borderRadius: '4px'
  },
  saveBtn: {
    backgroundColor: '#4caf50',
    color: '#fff',
    border: 'none',
    padding: '0.3rem 0.7rem',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  cancelBtn: {
    backgroundColor: '#9e9e9e',
    color: '#fff',
    border: 'none',
    padding: '0.3rem 0.7rem',
    borderRadius: '4px',
    cursor: 'pointer'
  }
};

export default TodoCard;
