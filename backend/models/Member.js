const mongoose = require('mongoose');

const memberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  fullName: { type: String, required: true },
  registrationNumber: { type: String, required: true },
  degree: { type: String, required: true },
  specialization: { type: String, required: true },
  age: { type: Number, required: true },
  gmail: { type: String, required: true },
  gender: { type: String, required: true },
  hobbies: { type: String, required: true },
  certificates: { type: String, required: true },
  internships: { type: String, required: true },
  projectTitle: { type: String, required: true },
  projectDescription: { type: String, required: true },
  profilePicture: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Member', memberSchema);
