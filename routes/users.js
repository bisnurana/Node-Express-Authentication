const UserController = require('../controllers/users');
const router = require('express-promise-router')();

router.route('/signup')
  .post(UserController.signUp);
router.route('/signin')
  .post(UserController.signIn);
router.route('/authKey')
  .post(UserController.authKey);
module.exports = router;
