const express = require('express');
const signup = require('../controllers/authController');
const { lessons, lessonsGET } = require('../controllers/lessonController');
const ticket = require('../controllers/ticketController');
const User = require('../models/userSchema'); // Adjust the path as per your project structure

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

// Passport JS
// auth with google

authRoutes.get('/login/success', (req, res) => {
  async (req, res) => {
    try {
      const newUser = {
        displayName: res.req.user.displayName,
        profileId: res.req.user.id,
      };
      const existingUser = await User.findOne({
        where: { profileId: newUser.profileId },
      });

      if (existingUser) {
        const userId = existingUser.id;
        newUser.id = userId;
      } else if (!existingUser) {
        const createdUser = await User.create(newUser);
        const userId = createdUser.id;
        newUser.id = userId;
      }

      const jwtToken = jwt.sign(newUser, jwtSecret, { expiresIn: '4h' });
      res.cookie('jwtToken', jwtToken, {
        httpOnly: false,
        maxAge: 1000 * 60 * 60 * 4,
      });
      const encodedJwtToken = encodeURIComponent(jwtToken);
      res.redirect(
        `${process.env.CLIENT_URL}/?message=Login%20successful&jwtToken=${encodedJwtToken}`
      );
    } catch (error) {
      console.log('logging in error: ', error);
    }
  };
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
