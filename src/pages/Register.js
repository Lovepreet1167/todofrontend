import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter a username and password.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/register/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        alert('Registration successful! You can now login.');
        navigate('/');
      } else {
        alert(data.error || 'Registration failed!');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <h2 style={styles.title}>📝 Register</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleRegister} style={styles.button}>Register</button>
        <p style={styles.text}>
          Already have an account?{' '}
          <span style={styles.link} onClick={() => navigate('/')}>
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    height: '100vh',
    background: 'linear-gradient(to right, #fbc2eb, #a6c1ee)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    backgroundColor: '#fff',
    padding: '2.5rem',
    borderRadius: '12px',
    boxShadow: '0 15px 30px rgba(0,0,0,0.1)',
    width: '320px',
    textAlign: 'center'
  },
  title: {
    marginBottom: '1.5rem',
    color: '#333'
  },
  input: {
    width: '100%',
    padding: '0.8rem',
    margin: '0.5rem 0',
    borderRadius: '8px',
    border: '1px solid #ccc',
    fontSize: '1rem'
  },
  button: {
    width: '100%',
    padding: '0.8rem',
    marginTop: '1rem',
    backgroundColor: '#673ab7',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  text: {
    marginTop: '1rem',
    fontSize: '0.9rem',
    color: '#666'
  },
  link: {
    color: '#2196f3',
    cursor: 'pointer',
    textDecoration: 'underline'
  }
};

export default Register;
