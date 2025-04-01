import React, { useState, useEffect } from 'react';

const API_BASE = 'http://localhost:8000/api/todos/';

const Home = ({ onLogout }) => {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const username = localStorage.getItem('username') || 'User';
  const token = localStorage.getItem('token');

  const fetchTodos = async () => {
    const res = await fetch(API_BASE, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setTodos(data);
  };

  const addTodo = async () => {
    if (!task.trim()) return;
    const res = await fetch(API_BASE, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: task }),
    });
    if (res.ok) {
      setTask('');
      fetchTodos();
    }
  };

  const toggleStatus = async (id, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'done' : 'pending';
    await fetch(`${API_BASE}${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await fetch(`${API_BASE}${id}/`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchTodos();
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    await fetch(`${API_BASE}${id}/`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ title: editText }),
    });
    setEditId(null);
    setEditText('');
    fetchTodos();
  };

  const logoutHandler = () => {
    localStorage.clear();
    onLogout();
  };

  useEffect(() => {
    fetchTodos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={styles.wrapper}>
      <div style={styles.header}>
        <h2 style={styles.title}>📝 To-Do List</h2>
        <span style={styles.username}>Welcome, {username}</span>
        <button onClick={logoutHandler} style={styles.logoutBtn}>Logout</button>
      </div>

      <div style={styles.inputArea}>
        <input
          type="text"
          placeholder="Add a new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addBtn}>Add</button>
      </div>

      {todos.map((todo) => (
        <div key={todo.id} style={styles.todoCard}>
          {editId === todo.id ? (
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              style={styles.input}
            />
          ) : (
            <h4 style={{
              textDecoration: todo.status === 'done' ? 'line-through' : 'none',
              color: todo.status === 'done' ? '#4caf50' : '#000'
            }}>
              {todo.title}
            </h4>
          )}
          <p>Status: {todo.status}</p>
          <div style={styles.cardActions}>
            <button
              onClick={() => toggleStatus(todo.id, todo.status)}
              style={styles.toggleBtn}
            >
              Toggle Status
            </button>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteBtn}
            >
              Delete
            </button>
            {editId === todo.id ? (
              <button
                onClick={() => updateTodo(todo.id)}
                style={styles.editBtn}
              >
                Save
              </button>
            ) : (
              <button
                onClick={() => {
                  setEditId(todo.id);
                  setEditText(todo.title);
                }}
                style={styles.editBtn}
              >
                Edit
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh',
    background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
  },
  header: {
    width: '100%',
    maxWidth: '800px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    color: 'white',
  },
  title: {
    fontSize: '2rem',
    margin: 0,
  },
  username: {
    fontSize: '1.1rem',
    color: '#fff',
  },
  logoutBtn: {
    padding: '0.5rem 1rem',
    backgroundColor: '#ff4d4d',
    color: '#fff',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  inputArea: {
    display: 'flex',
    marginBottom: '2rem',
    maxWidth: '800px',
    width: '100%',
    justifyContent: 'space-between',
  },
  input: {
    flex: 1,
    padding: '0.8rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem',
  },
  addBtn: {
    marginLeft: '1rem',
    padding: '0.8rem 1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
  todoCard: {
    background: '#fff',
    padding: '1rem',
    marginBottom: '1rem',
    borderRadius: '10px',
    boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
    width: '100%',
    maxWidth: '800px',
  },
  cardActions: {
    marginTop: '0.5rem',
    display: 'flex',
    gap: '1rem',
  },
  toggleBtn: {
    backgroundColor: '#2196f3',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  deleteBtn: {
    backgroundColor: '#e53935',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  editBtn: {
    backgroundColor: '#ffa000',
    color: '#fff',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
};

export default Home;
