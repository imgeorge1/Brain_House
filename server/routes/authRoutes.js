const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');

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
const JWT_SECRET = 'your_jwt_secret_key'; // Replace with your own secret key

// Passport JS
// auth with google

authRoutes.get('/login/success', authMiddleware, (req, res) => {
  try {
    const { user } = req; // Assuming the authenticated user is available in req object
    if (user) {
      // If user is authenticated, create a JWT token
      const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '4h', // Token expires in 4 hours
      });
      console.log('token', token);
      // Set the JWT token as a cookie with maxAge 4 hours
      res.cookie('jwt', token, { maxAge: 4 * 60 * 60 * 1000, httpOnly: true });
      // Send the user data along with the token
      res.status(200).json({ user });
    } else {
      // If user is not authenticated, send an error message
      res.status(400).json({ message: 'Not Authorized' });
    }
  } catch (error) {
    // Handle any errors that might occur
    console.error('Error in login:', error);
    res.status(500).json({ message: 'Internal Server Error' });
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

authRoutes.get(
  '/auth/google',
  googleStrategy.authenticate('google', { scope: ['profile', 'email'] })
);

authRoutes.get(
  '/auth/google/callback',
  googleStrategy.authenticate('google', {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: '/login/failed',
  })
);

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

////////////End Passport JS

authRoutes.post('/signup', signup);

authRoutes.post('/lessons', lessons);
authRoutes.get('/lessonsAll', lessonsGET);

authRoutes.get('/users', users);
authRoutes.get('/users/:userId', getUserById);
authRoutes.put('/users/:userId', updateUserPaidStatus);

authRoutes.get('/tickets/:id', ticket);

module.exports = authRoutes;
