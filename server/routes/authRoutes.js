const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');
const User = require('../models/userSchema'); // Adjust the path as per your project structure
const jwt = require('jsonwebtoken');
const {
  auth,
  callbackAuth,
  fbCallbackAuth,
  fbAuth,
  redirect,
} = require('../config/auth/passportAuth');
const { login, logout } = require('../config/loginLogout/loginLogout');
const {
  users,
  getUserById,
  updateUserPaidStatus,
} = require('../controllers/showUsers');
const googleStrategy = require('../config/passport/google');
const facebookStrategy = require('../config/passport/facebook');

const authRoutes = express.Router();

const jwtSecret = process.env.JWT_SECRET;
// Passport JS
// auth with google

authRoutes.get(
  '/auth/google/callback',
  googleStrategy.authenticate('google', {
    failureRedirect: '/login/failed',
  }),
  async (req, res) => {
    try {
      const { firstName, lastName, email } = req.user;
      console.log('req.uuuuuuuu', req.user);
      console.log('req uuser firstaName', req.user.firstName);

      // Create JWT token with user information
      const jwtToken = jwt.sign({ firstName, lastName, email }, jwtSecret, {
        expiresIn: '4h',
      });

      // Redirect user with JWT token as URL parameter
      res.redirect(
        `${process.env.CLIENT_URL}/?message=Login%20successful&jwtToken=${jwtToken}`
      );
    } catch (error) {
      console.log('Logging in error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  }
);

// Endpoint to check if user is logged in
authRoutes.get('/user', (req, res) => {
  console.log('req.user', req.user);

  const { firstName, lastName, email } = req.user;
  console.log('user json', req.user);
  res.json({ firstName, lastName, email });

  console.log('????userrr', req.user);
  if (!req.user) {
    return res
      .status(401)
      .json({ success: false, message: 'User not authenticated' });
  }

  // Extract user information from req.user
});

// auth with facebook
authRoutes.get(
  '/auth/facebook',
  facebookStrategy.authenticate('facebook', { scope: ['email'] })
);

authRoutes.get(
  '/auth/facebook/callback',
  facebookStrategy.authenticate('facebook', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

authRoutes.get('/login/success', (req, res) => {
  if (req.user) {
    console.log('successUser', req.user);
    res.status(200).json({
      success: true,
      message: 'successfull',
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

authRoutes.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: 'failure',
  });
});

authRoutes.get('/logout', (req, res) => {
  req.logout();
  res.redirect(process.env.CLIENT_URL);
});

////////////End Passport JS

authRoutes.post('/signup', signup);

authRoutes.post('/lessons', lessons);
authRoutes.get('/lessonsAll', lessonsGET);

authRoutes.get('/users', users);
authRoutes.get('/users/:userId', getUserById);
authRoutes.put('/users/:userId', updateUserPaidStatus);

authRoutes.get('/tickets/:id', ticket);

module.exports = authRoutes;
