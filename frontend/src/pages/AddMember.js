import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/Page.css';

function AddMember() {
  const [form, setForm] = useState({
    name: '',
    fullName: '',
    registrationNumber: '',
    degree: '',
    specialization: '',
    age: '',
    gmail: '',
    gender: '',
    hobbies: '',
    certificates: '',
    internships: '',
    projectTitle: '',
    projectDescription: '',
    profilePicture: null,
  });

  const [error, setError] = useState('');
  const nav = useNavigate();

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    // basic validation
    if (!form.name || !form.fullName || !form.registrationNumber || !form.degree || !form.specialization || !form.age || !form.gmail || !form.gender || !form.hobbies || !form.certificates || !form.internships || !form.projectTitle || !form.projectDescription || !form.profilePicture) {
      setError('All fields are required.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(form.gmail)) {
      setError('Enter a valid Gmail address.');
      return;
    }

    try {
      const data = new FormData();
      data.append('name', form.name);
      data.append('fullName', form.fullName);
      data.append('registrationNumber', form.registrationNumber);
      data.append('degree', form.degree);
      data.append('specialization', form.specialization);
      data.append('age', form.age);
      data.append('gmail', form.gmail);
      data.append('gender', form.gender);
      data.append('hobbies', form.hobbies);
      data.append('certificates', form.certificates);
      data.append('internships', form.internships);
      data.append('projectTitle', form.projectTitle);
      data.append('projectDescription', form.projectDescription);
      data.append('profilePicture', form.profilePicture);

      await axios.post('http://localhost:5001/api/members', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      // on success → redirect to view members
      nav('/members');
    } catch (err) {
      console.error(err);
      setError('Failed to add member. Try again.');
    }
  };

  const colors = {
    primary: '#FFDAC1',   // Soft Peach
    secondary: '#B5EAD7', // Mint Green
    accent1: '#FF9AA2',   // Light Pink
    accent2: '#C7CEEA',   // Light Lavender-Blue
    accent3: '#FFB7B2'    // Muted Pink
  };

  const inputStyle = {
    backgroundColor: colors.accent2,
    borderColor: colors.accent1,
    padding: '10px',
    margin: '10px 0',
    borderRadius: '5px',
    width: '100%',
    fontSize: '16px'
  };

  const buttonStyle = {
    backgroundColor: colors.secondary,
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    transition: 'background-color 0.3s ease'
  };

  return (
    <div className="page" style={{ backgroundColor: colors.primary, minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', width: '100%', maxWidth: '600px' }}>
        <h1 className="title" style={{ color: colors.accent1 }}>Add New Member</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={form.fullName}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="registrationNumber"
            placeholder="Registration Number"
            value={form.registrationNumber}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="degree"
            placeholder="Degree"
            value={form.degree}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="specialization"
            placeholder="Specialization"
            value={form.specialization}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            value={form.age}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="email"
            name="gmail"
            placeholder="Gmail"
            value={form.gmail}
            onChange={handleChange}
            style={inputStyle}
          />
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            style={inputStyle}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea
            name="hobbies"
            placeholder="Hobbies (separated by commas)"
            value={form.hobbies}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="certificates"
            placeholder="Certificates (separated by commas)"
            value={form.certificates}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="internships"
            placeholder="Internships (separated by commas)"
            value={form.internships}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="text"
            name="projectTitle"
            placeholder="Project Title"
            value={form.projectTitle}
            onChange={handleChange}
            style={inputStyle}
          />
          <textarea
            name="projectDescription"
            placeholder="Project Description"
            value={form.projectDescription}
            onChange={handleChange}
            style={inputStyle}
          />
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleChange}
            style={inputStyle}
          />
          <button type="submit" style={buttonStyle}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddMember;
