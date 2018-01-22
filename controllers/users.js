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
    const existingUser = await User.findOne({ 'local.email': email });
    if (existingUser) {
      res.status(403).send({ error: 'User with this email already exists' });
    } else {
      const newUser = new User({ method: 'local', local: { email, password } });
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
  googleAuth: async (req, res, next) => {
    const token = issueToken(req.user);
    res.status(200).json({ token });
  },
  facebookAuth: async (req, res, next) => {
    const token = issueToken(req.user);
    res.status(200).json({ token });
  },
  authKey: async (req, res, next) => {
    res.status(200).json({ Success: 'Now you can access protected contents' });
  },
};
