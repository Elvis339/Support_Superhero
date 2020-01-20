const 
  controller = require('../../controllers/app/Users/UserController'),
  auth = require('../../middleware/auth');

module.exports = (router) => {
  // Register
  router.route('/users')
    .post(controller.addUser)
    .get(auth, controller.validate) // user

  // Login
  router.route('/login')
    .post(controller.login)

  // Edit my profile
  router.route('/me')
    .patch(auth, controller.editMe)
};