import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../styles/Page.css';

function ViewMembers() {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5001/api/members')
      .then(res => {
        setMembers(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching members:', err);
        setLoading(false);
      });
  }, []);

  const handleDelete = async (id) => {
    try {
      console.log(`Attempting to delete member with ID: ${id}`);
      const response = await axios.delete(`http://localhost:5001/api/members/${id}`);
      console.log('Delete Response:', response); // Log response from the server
      if (response.status === 200) {
        setMembers(prevMembers => prevMembers.filter(member => member._id !== id));
        alert('Member deleted successfully');
        window.location.reload();
      }
    } catch (err) {
      console.error('Error deleting member:', err);
      window.location.reload();
    }
  };
  

  if (loading) return <p style={{ textAlign: 'center' }}>Loading...</p>;

  return (
    <div className="page" style={{ backgroundColor: '#FFDAC1', minHeight: '100vh', padding: '30px' }}>
      <h1 className="title" style={{ textAlign: 'center', color: '#FF9AA2' }}>All Team Members</h1>
      {members.length === 0 ? (
        <p style={{ textAlign: 'center' }}>No members found.</p>
      ) : (
        <div className="member-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
          {members.map(member => (
            <div key={member._id} className="member-card" style={{ backgroundColor: '#ffffff', borderRadius: '8px', padding: '20px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <img
                src={`http://localhost:5001/${member.profilePicture}`}
                alt={member.name}
                className="member-photo"
                style={{ width: '100%', height: 'auto', borderRadius: '50%' }}
              />
              <h3 style={{ color: '#264653' }}>{member.name}</h3>
              <p><strong>Reg No:</strong> {member.registrationNumber}</p>
              <p><strong>Specialization:</strong> {member.specialization}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Link to={`/members/${member._id}`} className="details-link" style={{ color: '#2a9D8F', textDecoration: 'none' }}>View Details</Link>
                <button
                  onClick={() => handleDelete(member._id)}
                  style={{
                    backgroundColor: '#FF9AA2',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                    fontSize: '14px',
                    transition: 'background-color 0.3s ease'
                  }}
                  onMouseOver={(e) => (e.target.style.backgroundColor = '#FFB7B2')}
                  onMouseOut={(e) => (e.target.style.backgroundColor = '#FF9AA2')}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewMembers;
