const JWT = require('jsonwebtoken');
const User = require('../models/user');
const keys = require('../config/keys');

function issueToken(user) {
  return JWT.sign({
    iss: 'authtest',
    sub: user._id,
    iat: new Date().getTime(),
    exp: new Date().setDate(new Date().getDate() + 1),
  }, keys.JWT_SECRET);
}


module.exports = {
  signUp: async (req, res, next) => {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(403).send({ error: 'User with this email already exists' });
    } else {
      const newUser = new User({ email, password });
      await newUser.save();
      const jwtToken = issueToken(newUser);
      res.status(200).json({ token: jwtToken });
      // res.json({ user: 'New user succesfully created' });
    }
  },
  signIn: async (req, res, next) => {
    const token = issueToken(req.user);
    res.status(200).json({ token });
    // console.log('signIn controller called');
  },
  authKey: async (req, res, next) => {
    console.log('authKey controller called');
  },
};
