const UserController = require('../controllers/users');
const router = require('express-promise-router')();
const passport = require('passport');
const passportConfig = require('../passport');
const { validateFields } = require('../helpers/user_route_helpers');

router.route('/signup')
  .post(validateFields, UserController.signUp);
router.route('/signin')
  .post(validateFields, passport.authenticate('local', { session: false }), UserController.signIn);
router.route('/authKey')
  .post(passport.authenticate('jwt', { session: false }), UserController.authKey);
router.route('/oauth/google')
  .post(passport.authenticate('googleToken', { session: false }), UserController.googleAuth);
router.route('/oauth/facebook')
  .post(passport.authenticate('facebookToken', { session: false }), UserController.facebookAuth);
module.exports = router;
