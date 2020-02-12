const controller = require('../../controllers/app/Users/UserController');
const auth = require('../../middleware/auth');

module.exports = (router) => {
  // Register
  router.route('/users')
    .post(controller.addUser)
    .get(auth, controller.validate) // user

  // Login
  router.route('/login')
    .post(controller.login)

  // Log out
  router.route('/logout')
    .post(auth, controller.logOut)

  // Edit my profile
  router.route('/me')
    .patch(auth, controller.editMe)
};