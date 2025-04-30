import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  const colors = {
    primary: '#FFDAC1',
    secondary: '#B5EAD7',
    accent1: '#FF9AA2',
    accent2: '#C7CEEA',
    accent3: '#FFB7B2'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease',
    margin: '10px'
  };

  return (
    <div
      style={{
        backgroundColor: colors.primary,
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        transform: 'translateY(-2cm)',
        boxSizing: 'border-box',
        flexDirection: 'column',  // Added to align everything vertically
        textAlign: 'center'       // Centers the text
      }}
    >
      <h1 style={{ color: colors.accent1, marginBottom: '20px' }}>Welcome to ClassMate</h1>

      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          padding: '40px',
          borderRadius: '15px',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
          maxWidth: '500px',
          width: '100%'
        }}
      >
        <p style={{ marginBottom: '30px', color: '#333', fontSize: '18px' }}>
          Welcome to the dashboard! Manage your team effortlessly with a few simple steps. Here, you can add team members, view the existing list. Let’s get started!
        </p>

        <div>
          <Link to="/add">
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = colors.accent2)}
              onMouseOut={(e) => (e.target.style.backgroundColor = colors.secondary)}
            >
              Add Member
            </button>
          </Link>

          <Link to="/members">
            <button
              style={buttonStyle}
              onMouseOver={(e) => (e.target.style.backgroundColor = colors.accent2)}
              onMouseOut={(e) => (e.target.style.backgroundColor = colors.secondary)}
            >
              View Members
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
