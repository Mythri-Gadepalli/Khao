import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import '../styles/Page.css';

function EditMember() {
  const { id } = useParams();
  const nav = useNavigate();

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

  useEffect(() => {
    axios.get(`http://localhost:5001/api/members/${id}`)
      .then(res => {
        const member = res.data;
        setForm({
          ...member,
          profilePicture: null // file input needs to be manually changed if needed
        });
      })
      .catch(err => {
        console.error('Error loading member:', err);
        setError('Failed to load member data.');
      });
  }, [id]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setForm(prev => ({
      ...prev,
      [name]: name === 'age' ? Number(value) : files ? files[0] : value, // Convert age to a number on change
    }));
  };
  

  const handleSubmit = async e => {
    e.preventDefault();
  
    // Check if all required fields are filled
    if (!form.name || !form.fullName || !form.registrationNumber || !form.degree || !form.specialization || !form.age || !form.gmail || !form.gender || !form.hobbies || !form.certificates || !form.internships || !form.projectTitle || !form.projectDescription) {
      setError('All fields are required.');
      return;
    }
  
    // Validate the Gmail address format
    if (!/\S+@\S+\.\S+/.test(form.gmail)) {
      setError('Enter a valid Gmail address.');
      return;
    }
  
    // Debug: Check the value and type of the age field
    console.log('Age being sent:', form.age, typeof form.age);
  
    // Convert the age to a number before sending
    const updatedForm = {
      ...form,
      age: Number(form.age),  // Convert age to a number
    };
  
    try {
      const data = new FormData();
  
      // Iterate over the form data and append to FormData
      Object.entries(updatedForm).forEach(([key, value]) => {
        if (key === 'profilePicture') {
          if (value) data.append(key, value); // Append the profile picture only if it's provided
        } else {
          data.append(key, value);
        }
      });
  
      // Send the PUT request to update the member details
      await axios.put(`http://localhost:5001/api/members/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      // Navigate to the members list page after successful update
      nav(`/members/${id}`);
    } catch (err) {
      console.error(err);
      setError('Failed to update member. Try again.');
    }
  };
  

  const colors = {
    primary: '#FFDAC1',
    secondary: '#B5EAD7',
    accent1: '#FF9AA2',
    accent2: '#C7CEEA',
    accent3: '#FFB7B2'
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
        <h1 className="title" style={{ color: colors.accent1 }}>Edit Member</h1>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <form onSubmit={handleSubmit} className="form">
          <input type="text" name="name" placeholder="Name" value={form.name} onChange={handleChange} style={inputStyle} />
          <input type="text" name="fullName" placeholder="Full Name" value={form.fullName} onChange={handleChange} style={inputStyle} />
          <input type="text" name="registrationNumber" placeholder="Registration Number" value={form.registrationNumber} onChange={handleChange} style={inputStyle} />
          <input type="text" name="degree" placeholder="Degree" value={form.degree} onChange={handleChange} style={inputStyle} />
          <input type="text" name="specialization" placeholder="Specialization" value={form.specialization} onChange={handleChange} style={inputStyle} />
          <input type="number" name="age" placeholder="Age" value={form.age} onChange={handleChange} style={inputStyle} />
          <input type="email" name="gmail" placeholder="Gmail" value={form.gmail} onChange={handleChange} style={inputStyle} />
          <select name="gender" value={form.gender} onChange={handleChange} style={inputStyle}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
          <textarea name="hobbies" placeholder="Hobbies" value={form.hobbies} onChange={handleChange} style={inputStyle} />
          <textarea name="certificates" placeholder="Certificates" value={form.certificates} onChange={handleChange} style={inputStyle} />
          <textarea name="internships" placeholder="Internships" value={form.internships} onChange={handleChange} style={inputStyle} />
          <input type="text" name="projectTitle" placeholder="Project Title" value={form.projectTitle} onChange={handleChange} style={inputStyle} />
          <textarea name="projectDescription" placeholder="Project Description" value={form.projectDescription} onChange={handleChange} style={inputStyle} />
          <input type="file" name="profilePicture" accept="image/*" onChange={handleChange} style={inputStyle} />
          <button type="submit" style={buttonStyle}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default EditMember;
