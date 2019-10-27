const 
  controller = require('../controllers/UserController'),
  auth = require('../middleware/auth');

module.exports = (router) => {
  router.route('/users')
    .post(controller.add)
    .get(auth, controller.getHome);

  router.route('/login')
    .post(controller.login)
};