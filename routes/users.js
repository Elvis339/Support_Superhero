const 
  controller = require('../controllers/UserController'),
  auth = require('../middleware/auth');

module.exports = (router) => {
  // Register
  router.route('/users')
    .post(controller.add)
    .get(auth, controller.getHome)

  // Login
  router.route('/login')
    .post(controller.login)

  // Edit my profile
  router.route('/me')
    .get(auth)
    .patch(auth, controller.editMe)
};