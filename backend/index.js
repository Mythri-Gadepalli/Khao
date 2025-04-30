const express = require('express');
const mongoose = require('mongoose');
const memberRoutes = require('./routes/members');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ✅ Connect the route
app.use('/api/members', memberRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/student_team_db')
  .then(() => {
    app.listen(PORT, () => {
      console.log(`✅ Server is running on http://localhost:${PORT}`);
      console.log('✅ MongoDB connected');
    });
  })
  .catch(err => console.error('❌ MongoDB connection error:', err));
