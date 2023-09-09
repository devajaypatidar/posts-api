// server/routes/users.js
const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/auth');
const { getUser,editUser,deleteUser } = require('../controllers/userController');
const { check, validationResult } = require('express-validator');
const {registerUser,loginUser} = require('../controllers/authController')



// Route to register a user
// POST /api/users/register
router.post(
    '/register',
    [
      check('name', 'Name is required').not().isEmpty(),
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Please enter a password with 6 or more characters').isLength({
        min: 6,
      }),
    ],
    registerUser
  );
  
  // Route to login
  // POST   @route /api/users/login
  
  router.post(
    '/login',
    [
      check('email', 'Please include a valid email').isEmail(),
      check('password', 'Password is required').exists(),
    ],
    loginUser
  );
  


// Protected route to get user details
router.get('/', verifyToken,getUser);

// Protected route to update user details
router.put('/', verifyToken,editUser );

// Protected route to delete user
router.delete('/', verifyToken, deleteUser);

module.exports = router;
