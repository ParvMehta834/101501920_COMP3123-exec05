const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();  

/*
- Return all details from user.json file to client as JSON format
*/
router.get('/profile', (req, res) => {
  try {
    const userData = fs.readFileSync(path.join(__dirname, '../user.json'), 'utf8');
    const user = JSON.parse(userData);
    
    res.json(user);
  } catch (error) {
    console.error('Error reading user.json:', error);
    res.status(500).json({ 
      error: 'Unable to read user data',
      message: error.message 
    });
  }
});

/*
- Modify /login router to accept username and password as JSON body parameter
- Read data from user.json file
- If username and password is valid then send response as below 
    {
        status: true,
        message: "User Is valid"
    }
- If username is invalid then send response as below 
    {
        status: false,
        message: "User Name is invalid"
    }
- If password is invalid then send response as below 
    {
        status: false,
        message: "Password is invalid"
    }
*/
router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({
        status: false,
        message: "Username and password are required"
      });
    }
    
    const userData = fs.readFileSync(path.join(__dirname, '../user.json'), 'utf8');
    const user = JSON.parse(userData);
    
    if (user.username !== username) {
      return res.json({
        status: false,
        message: "User Name is invalid"
      });
    }
    
    if (user.password !== password) {
      return res.json({
        status: false,
        message: "Password is invalid"
      });
    }
    
    res.json({
      status: true,
      message: "User Is valid"
    });
    
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ 
      error: 'Server error during login',
      message: error.message 
    });
  }
});

/*
- Modify /logout route to accept username as parameter and display message
    in HTML format like <b>${username} successfully logout.<b>
*/
router.get('/logout/:username', (req, res) => {
  const { username } = req.params;
  
  res.send(`<b>${username} successfully logged out.</b>`);
});


router.get('/', (req, res) => {
  res.json({ 
    message: 'User API is working',
    endpoints: {
      'GET /profile': 'Get user profile data',
      'POST /login': 'User login with username and password',
      'GET /logout/:username': 'User logout with username parameter'
    }
  });
});

module.exports = router; 