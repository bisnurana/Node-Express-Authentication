const UserController = require('../controllers/users');
const router = require('express-promise-router')();
const { validateSignup } = require('../helpers/user_route_helpers');

router.route('/signup')
  .post(validateSignup, UserController.signUp);
router.route('/signin')
  .post(UserController.signIn);
router.route('/authKey')
  .post(UserController.authKey);
module.exports = router;
