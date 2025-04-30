const express = require('express');
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');
const Member = require('../models/Member');
const upload = require('../middleware/upload'); // Ensure you're using the correct upload middleware
const fs = require('fs');  // Import the fs module


const router = express.Router();

// GET all members
router.get('/', async (req, res) => {
    try {
      const members = await Member.find();
      res.status(200).json(members);
    } catch (err) {
      console.error('Error fetching members:', err);
      res.status(500).json({ message: 'Failed to fetch members.' });
    }
  });
  
  
router.post(
  '/',
  upload.single('profilePicture'),  // Handling image upload using multer
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('fullName').notEmpty().withMessage('Full name is required'),
    body('registrationNumber').notEmpty().withMessage('Registration number is required'),
    body('gmail').isEmail().withMessage('Valid Gmail is required'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newMember = new Member({
        name: req.body.name,
        fullName: req.body.fullName,
        registrationNumber: req.body.registrationNumber,
        degree: req.body.degree,
        specialization: req.body.specialization,
        age: req.body.age,
        gmail: req.body.gmail,
        gender: req.body.gender,
        hobbies: req.body.hobbies,
        certificates: req.body.certificates,
        internships: req.body.internships,
        projectTitle: req.body.projectTitle,
        projectDescription: req.body.projectDescription,
        profilePicture: req.file ? req.file.path : '',  // Save the file path
      });

      await newMember.save();
      res.status(201).json(newMember);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to add member.' });
    }
  }
);

// DELETE request to remove a member
router.delete('/:id', async (req, res) => {
    try {
      const memberId = req.params.id;
      console.log(`Deleting member with ID: ${memberId}`);
      const member = await Member.findByIdAndDelete(memberId);
      if (!member) {
        return res.status(404).send('Member not found');
      }
      // Deleting associated files if any
      if (member.profilePicture) {
        fs.unlinkSync(path.join(__dirname, '../uploads', member.profilePicture)); // Adjust path
      }
      res.status(200).send('Member deleted successfully');
    } catch (error) {
      console.error('Error deleting member:', error);
      res.status(500).send('Error deleting member');
    }
  });

  
// GET a single member by ID (MUST be above `module.exports`)
router.get('/:id', async (req, res) => {
    try {
      const member = await Member.findById(req.params.id);
      if (!member) return res.status(404).json({ message: 'Member not found' });
      res.json(member);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error' });
    }
  });
  
// PUT request to update a member
router.put(
    '/:id',
    upload.single('profilePicture'),
    async (req, res) => {
        const { id } = req.params;
        console.log('Received data:', req.body); // Log everything, or focus on age specifically
        console.log("Age sent from client:", req.body.age);
      try {
        const member = await Member.findById(req.params.id);
        if (!member) return res.status(404).json({ message: 'Member not found' });
  
        // If a new profile picture is uploaded, delete the old one
        if (req.file) {
          if (member.profilePicture) {
            const oldPath = path.join(__dirname, '../', member.profilePicture);
            if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
          }
          member.profilePicture = req.file.path;
        }
  
        // Update fields
        const fields = [
          'name', 'fullName', 'registrationNumber', 'degree', 'specialization',
          'age', 'gmail', 'gender', 'hobbies', 'certificates', 'internships',
          'projectTitle', 'projectDescription'
        ];
  
        fields.forEach(field => {
            if (req.body[field] !== undefined) {
              // Convert age to a number
              if (field === 'age') {
                member[field] = Number(req.body[field]);
              } else {
                member[field] = req.body[field];
              }
            }
          });
          
  
        await member.save();
        res.status(200).json(member);
      } catch (err) {
        console.error('Update failed:', err);
        res.status(500).json({ message: 'Failed to update member.' });
      }
    }
  );
  

module.exports = router;


  
