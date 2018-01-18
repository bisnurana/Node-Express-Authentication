const UserController = require('../controllers/users');
const router = require('express-promise-router')();
const passport = require('passport');
const passportCongfig = require('../passport');
const { validateSignup } = require('../helpers/user_route_helpers');

router.route('/signup')
  .post(validateSignup, UserController.signUp);
router.route('/signin')
  .post(UserController.signIn);
router.route('/authKey')
  .post(passport.authenticate('jwt', { session: false }), UserController.authKey);
module.exports = router;
