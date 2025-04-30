import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function MemberDetails() {
  const { id } = useParams();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:5001/api/members`)
      .then(res => {
        const found = res.data.find(m => m._id === id);
        setMember(found);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching member details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!member) return <p>Member not found.</p>;

  return (
    <div className="page">
      <h1 className="title">{member.fullName}</h1>
      <img
        src={`http://localhost:5001/${member.profilePicture}`}
        alt={member.name}
        className="member-photo"
      />
      
      <div className="info-container">
        <p><strong>Name:</strong> {member.name}</p>
        <p><strong>Registration No:</strong> {member.registrationNumber}</p>
        <p><strong>Degree:</strong> {member.degree}</p>
        <p><strong>Specialization:</strong> {member.specialization}</p>
        <p><strong>Age:</strong> {member.age}</p>
        <p><strong>Email:</strong> {member.gmail}</p>
        <p><strong>Gender:</strong> {member.gender}</p>
        <p><strong>Hobbies:</strong> {member.hobbies}</p>
        <p><strong>Certificates:</strong> {member.certificates}</p>
        <p><strong>Internships:</strong> {member.internships}</p>
        <p><strong>Project Title:</strong> {member.projectTitle}</p>
        <p><strong>Description:</strong> {member.projectDescription}</p>
        <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
  <Link to="/members" className="btn">← Back to Members</Link>
  <Link to={`/edit-member/${id}`} className="btn">✎ Edit Member</Link>
</div>

      </div>

      <style jsx>{`
        :root {
          --primary-color: #FFDAC1;  /* Peach background */
          --glass-bg: rgba(255, 255, 255, 0.5);
          --text-color: #3B3B3B;
          --accent: #6C5CE7;
        }

        .page {
          background-color: var(--primary-color);
          min-height: 100vh;
          padding: 60px 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          color: var(--text-color);
        }

        .title {
          font-size: 3rem;
          color: var(--accent);
          margin-bottom: 30px;
        }

        .member-photo {
          width: 160px;
          height: 160px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid var(--accent);
          margin-bottom: 30px;
        }

        .info-container {
          background: var(--glass-bg);
          backdrop-filter: blur(10px);
          padding: 30px 40px;
          border-radius: 20px;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          max-width: 700px;
          width: 100%;
        }

        .info-container p {
          font-size: 1.1rem;
          margin-bottom: 12px;
          line-height: 1.6;
        }

        strong {
          color: var(--accent);
        }

        .btn {
          margin-top: 30px;
          display: inline-block;
          background-color: var(--accent);
          color: white;
          padding: 8px 18px;  /* Reduced padding */
          border-radius: 25px;
          text-decoration: none;
          font-weight: bold;
          font-size: 1rem;  /* Reduced font size */
          transition: all 0.3s ease;
        }

        .btn:hover {
          background-color: #A29BFE;
          transform: scale(1.05);
        }

        @media (max-width: 768px) {
          .title {
            font-size: 2.2rem;
          }

          .member-photo {
            width: 120px;
            height: 120px;
          }

          .info-container {
            padding: 20px;
          }

          .info-container p {
            font-size: 1rem;
          }
        }
      `}</style>
    </div>
  );
}

export default MemberDetails;
