const User = require('../models/user');

module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(403).send({ error: 'User with this email already exists' });
    } else {
      const newUser = new User({ email, password });
      await newUser.save();
      res.json({ user: 'New user succesfully created' });
    }
  },
  signIn: async (req, res, next) => {
    console.log('signIn controller called');
  },
  authKey: async (req, res, next) => {
    console.log('authKey controller called');
  },
};
